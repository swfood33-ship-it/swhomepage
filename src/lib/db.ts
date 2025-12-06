// In-memory database for Vercel deployment compatibility
// NOTE: Data will not persist across re-deployments or cold starts.

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
    imagePath?: string;
    analysisData?: any;
    createdAt: string;
}

export interface Database {
    quotes: QuoteInquiry[];
    pricingRequests: PricingRequest[];
    diagnosisResults: DiagnosisResult[];
}

// Global in-memory storage
let memoryDB: Database = {
    quotes: [],
    pricingRequests: [],
    diagnosisResults: []
};

export async function readDB(): Promise<Database> {
    return memoryDB;
}

export async function writeDB(data: Database): Promise<void> {
    memoryDB = data;
}

export async function addQuote(quote: Omit<QuoteInquiry, 'id' | 'createdAt'>) {
    const newQuote: QuoteInquiry = {
        ...quote,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    memoryDB.quotes.push(newQuote);
    return newQuote;
}

export async function addPricingRequest(request: Omit<PricingRequest, 'id' | 'createdAt'>) {
    const newRequest: PricingRequest = {
        ...request,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    memoryDB.pricingRequests.push(newRequest);
    return newRequest;
}

export async function addDiagnosisResult(result: Omit<DiagnosisResult, 'id' | 'createdAt'>) {
    const newResult: DiagnosisResult = {
        ...result,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    memoryDB.diagnosisResults.push(newResult);
    return newResult;
}


// --- Products DB ---

export interface Product {
    id: string;
    name: string;
    price: number;
    unit?: string;
    updatedAt: string;
}

export interface ProductDatabase {
    products: Product[];
}

let memoryProductDB: ProductDatabase = {
    products: [
        // Optional: Pre-fill with some dummy data if needed, or leave empty
        { id: '1', name: '쌀(20kg)', price: 45000, updatedAt: new Date().toISOString() },
        { id: '2', name: '양파(15kg)', price: 18000, updatedAt: new Date().toISOString() },
        { id: '3', name: '계란(30구)', price: 5500, updatedAt: new Date().toISOString() },
    ]
};

export async function readProducts(): Promise<ProductDatabase> {
    return memoryProductDB;
}

export async function writeProducts(data: ProductDatabase): Promise<void> {
    memoryProductDB = data;
}

export async function addProduct(product: Omit<Product, 'id' | 'updatedAt'>) {
    const newProduct: Product = {
        ...product,
        id: crypto.randomUUID(),
        updatedAt: new Date().toISOString(),
    };
    memoryProductDB.products.push(newProduct);
    return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'updatedAt'>>) {
    const index = memoryProductDB.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    memoryProductDB.products[index] = {
        ...memoryProductDB.products[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };
    return memoryProductDB.products[index];
}

export async function deleteProduct(id: string) {
    memoryProductDB.products = memoryProductDB.products.filter(p => p.id !== id);
}

// Helper to look up price by partial name match
export async function findProductPrice(searchName: string): Promise<number | null> {
    // Simple logic: find first product where name is included in searchName OR searchName includes product name
    // Case insensitive
    const normalizedSearch = searchName.toLowerCase().replace(/\s+/g, '');

    const match = memoryProductDB.products.find(p => {
        const normalizedProduct = p.name.toLowerCase().replace(/\s+/g, '');
        return normalizedSearch.includes(normalizedProduct) || normalizedProduct.includes(normalizedSearch);
    });

    return match ? match.price : null;
}
