import { NextRequest, NextResponse } from 'next/server';
import { readProducts, addProduct, updateProduct, deleteProduct, Product } from '@/lib/db';

export async function GET() {
    try {
        const db = await readProducts();
        return NextResponse.json({ success: true, products: db.products });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { products, product } = body;

        // Bulk insert (for Excel upload)
        if (products && Array.isArray(products)) {
            let count = 0;
            for (const p of products) {
                if (p.name && p.price) {
                    await addProduct({
                        name: String(p.name),
                        price: Number(p.price),
                        unit: p.unit ? String(p.unit) : undefined
                    });
                    count++;
                }
            }
            return NextResponse.json({ success: true, message: `${count} products added` });
        }

        // Single insert
        if (product && product.name && product.price) {
            const newProduct = await addProduct({
                name: product.name,
                price: Number(product.price),
                unit: product.unit
            });
            return NextResponse.json({ success: true, product: newProduct });
        }

        return NextResponse.json({ error: 'Invalid data' }, { status: 400 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, updates } = body;

        if (!id || !updates) {
            return NextResponse.json({ error: 'Missing id or updates' }, { status: 400 });
        }

        const updated = await updateProduct(id, updates);
        if (!updated) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, product: updated });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 });
        }

        await deleteProduct(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
