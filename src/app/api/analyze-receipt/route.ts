import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // 1. Read File (No saving to disk for Vercel compatibility)
        const buffer = Buffer.from(await file.arrayBuffer());

        // 2. Call OpenAI Vision API
        const apiKey = process.env.OPENAI_API_KEY;

        // DEBUG LOGGING (Console only for serverless)
        console.log(`[API] Key present: ${!!apiKey}`);

        if (!apiKey) {
            console.warn('OPENAI_API_KEY is missing. Using mock data for fallback.');
            return mockAnalysis();
        }

        const openai = new OpenAI({ apiKey });
        const base64Image = buffer.toString('base64');
        const dataUrl = `data:${file.type};base64,${base64Image}`;

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: `You are an expert receipt analyzer.
                        Analyze the provided receipt image and extract the following information in JSON format:
                        1. items: An array of objects with 'name' (string), 'quantity' (number), 'price' (number, unit price).
                        
                        Return ONLY the JSON object. No markdown formatting.`
                    },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "Analyze this receipt." },
                            { type: "image_url", image_url: { url: dataUrl } }
                        ]
                    }
                ],
                response_format: { type: "json_object" },
                max_tokens: 1000,
            });

            const content = response.choices[0].message.content;
            if (!content) throw new Error('No content from OpenAI');

            const aiResult = JSON.parse(content);
            const items = aiResult.items.map((item: any) => ({
                id: crypto.randomUUID(),
                name: item.name,
                quantity: item.quantity || 1,
                price: item.price,
                originalPrice: item.price // Keep track of original
            }));

            return NextResponse.json({ success: true, data: { items, imagePath: null } });

        } catch (apiError: any) {
            console.error('------- OPENAI API ERROR -------');
            console.error('Message:', apiError.message);
            if (apiError.response) {
                console.error('Status:', apiError.response.status);
                console.error('Data:', JSON.stringify(apiError.response.data));
            }
            console.error('--------------------------------');

            return mockAnalysis({
                message: apiError.message,
                code: apiError.code,
                type: apiError.type,
                response: apiError.response?.data
            });
        }

    } catch (error: any) {
        console.error('Error analyzing receipt:', error);
        return NextResponse.json({ error: 'Failed to analyze receipt' }, { status: 500 });
    }
}

async function mockAnalysis(debugInfo?: any) {
    // Simulate a short delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Instead of returning random items, we return an empty list 
    // and a signal that manual input is required.
    return NextResponse.json({
        success: true,
        data: {
            items: [],
            imagePath: null,
            manualRequired: true,
            debug: debugInfo
        }
    });
}

