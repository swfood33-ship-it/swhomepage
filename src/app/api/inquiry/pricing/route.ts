import { NextResponse } from 'next/server';
import { addPricingRequest } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, businessName } = body;

        if (!name || !phone || !businessName) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        await addPricingRequest({ name, phone, businessName });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving pricing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
