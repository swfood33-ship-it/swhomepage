import { NextResponse } from 'next/server';
import { addQuote } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, message } = body;

        if (!name || !phone) {
            return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
        }

        await addQuote({ name, phone, message });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving quote:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
