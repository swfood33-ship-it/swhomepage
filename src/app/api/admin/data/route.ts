import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET() {
    try {
        const data = await readDB();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching admin data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
