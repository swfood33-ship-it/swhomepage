import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

export interface QuoteInquiry {
    id: string;
    name: string;
    phone: string;
    message: string;
    createdAt: string;
}

export interface PricingRequest {
    id: string;
    name: string;
    phone: string;
    businessName: string;
    createdAt: string;
}

export interface DiagnosisResult {
    id: string;
    answers: Record<string, any>;
    score?: number;
    createdAt: string;
}

export interface Database {
    quotes: QuoteInquiry[];
    pricingRequests: PricingRequest[];
    diagnosisResults: DiagnosisResult[];
}

async function ensureDB() {
    try {
        await fs.access(DB_PATH);
    } catch {
        const initialData: Database = { quotes: [], pricingRequests: [], diagnosisResults: [] };
        await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
        await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
    }
}

export async function readDB(): Promise<Database> {
    await ensureDB();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

export async function writeDB(data: Database): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function addQuote(quote: Omit<QuoteInquiry, 'id' | 'createdAt'>) {
    const db = await readDB();
    const newQuote: QuoteInquiry = {
        ...quote,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    db.quotes.push(newQuote);
    await writeDB(db);
    return newQuote;
}

export async function addPricingRequest(request: Omit<PricingRequest, 'id' | 'createdAt'>) {
    const db = await readDB();
    const newRequest: PricingRequest = {
        ...request,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    db.pricingRequests.push(newRequest);
    await writeDB(db);
    return newRequest;
}

export async function addDiagnosisResult(result: Omit<DiagnosisResult, 'id' | 'createdAt'>) {
    const db = await readDB();
    const newResult: DiagnosisResult = {
        ...result,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    db.diagnosisResults.push(newResult);
    await writeDB(db);
    return newResult;
}
