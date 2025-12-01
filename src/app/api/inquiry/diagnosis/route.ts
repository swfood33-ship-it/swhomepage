import { NextResponse } from 'next/server';
import { addDiagnosisResult } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { answers, score } = body;

        if (!answers) {
            return NextResponse.json({ error: 'Answers are required' }, { status: 400 });
        }

        await addDiagnosisResult({ answers, score });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving diagnosis result:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
