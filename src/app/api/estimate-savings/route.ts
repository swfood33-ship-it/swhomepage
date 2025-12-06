import { NextRequest, NextResponse } from 'next/server';
import { addDiagnosisResult, findProductPrice } from '@/lib/db';

type IndustryType = 'restaurant' | 'franchise' | 'school';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { items, imagePaths, monthlyAmount, businessType, currentSupplier } = body;

        // Map legacy 'industry' to new 'businessType'
        const industry = body.industry || businessType;

        if (!items || !Array.isArray(items)) {
            return NextResponse.json({ error: 'Invalid items data' }, { status: 400 });
        }

        // Discount rates per industry
        const discountRates = {
            restaurant: 0.85, // 15% discount
            franchise: 0.82,  // 18% discount
            school: 0.88      // 12% discount
        };
        const rate = discountRates[industry as IndustryType] || 0.85;

        // Calculate Sungwon Price for each item
        // Calculate Sungwon Price for each item
        const processedItems = await Promise.all(items.map(async (item: any) => {
            // Try to find real price from DB
            const realPrice = await findProductPrice(item.name);

            let sungwonPrice;
            if (realPrice && realPrice < item.price) {
                // If we have a real price and it's cheaper (or even if stricter, use real price)
                // Assuming unit match for now (User just inputs unit price)
                sungwonPrice = realPrice;
            } else {
                // Fallback to estimation logic
                sungwonPrice = Math.floor(item.price * (rate + (Math.random() * 0.04 - 0.02)));
            }

            return {
                ...item,
                sungwonPrice,
                isRealPrice: !!realPrice // Flag to show in UI if needed
            };
        }));

        const totalOriginal = processedItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
        const totalSungwon = processedItems.reduce((sum: number, item: any) => sum + (item.sungwonPrice * item.quantity), 0);
        const savings = totalOriginal - totalSungwon;
        const savingsRate = totalOriginal > 0 ? (savings / totalOriginal) : 0;

        // New Logic: Benchmark is Sungwon Price + 5%
        // "Compare to other restaurants"
        const totalBenchmark = totalSungwon * 1.05;
        const priceDifference = totalBenchmark > 0 ? ((totalOriginal - totalBenchmark) / totalBenchmark) * 100 : 0;

        // Calculate PROJECTED monthly savings based on the savings RATE found in receipt
        const projectedSavings = monthlyAmount ? Math.round(monthlyAmount * savingsRate) : 0;

        let rating: 'very_good' | 'average' | 'expensive' | 'critical' = 'average';
        let ratingLabel = '보통';

        // Thresholds based on Benchmark (+5%)
        if (priceDifference <= 2) {
            rating = 'very_good';
            ratingLabel = '매우 좋음';
        } else if (priceDifference <= 7) {
            rating = 'average';
            ratingLabel = '보통';
        } else if (priceDifference <= 10) {
            rating = 'expensive';
            ratingLabel = '조금 비쌈';
        } else {
            rating = 'critical';
            ratingLabel = '매우 심각';
        }

        const analysisData = {
            items: processedItems,
            summary: {
                totalOriginal,
                totalSungwon,
                savings,
                savingsRate: Math.round(savingsRate * 100),
                projectedSavings,
                priceDifference: Math.round(priceDifference),
                rating,
                ratingLabel,
                businessType,
                currentSupplier,
                monthlyAmount
            }
        };

        // Combine image paths into a single string if multiple
        const finalImagePath = Array.isArray(imagePaths) ? imagePaths.join(',') : (imagePaths || '');

        // Save result to DB (as final diagnosis)
        await addDiagnosisResult({
            answers: {
                fileCount: items.length,
                industry: industry,
                rating: rating
            },
            score: Math.round(priceDifference), // Storing difference as score for now
            analysisData: analysisData,
            imagePath: finalImagePath
        });

        return NextResponse.json({ success: true, data: analysisData });

    } catch (error) {
        console.error('Error estimating savings:', error);
        return NextResponse.json({ error: 'Failed to estimate savings' }, { status: 500 });
    }
}
