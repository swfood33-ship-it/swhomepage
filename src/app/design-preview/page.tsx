import React from 'react';
import ResultRatingCard from '@/components/diagnosis/ResultRatingCard';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export default function DesignPreviewPage() {
    return (
        <div className="min-h-screen bg-white">
            <SiteHeader />
            <main className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-4">Design Preview</h1>
                    <p className="text-center text-gray-500 mb-16">Showing all 4 rating states for the diagnosis result.</p>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

                        {/* Very Good */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-emerald-600">Level 1: Very Good (≤ 7%)</h3>
                            <ResultRatingCard rating="very_good" priceDifference={-5} />
                        </div>

                        {/* Average */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-yellow-500">Level 2: Average (7~12%)</h3>
                            <ResultRatingCard rating="average" priceDifference={10} />
                        </div>

                        {/* Expensive */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-orange-500">Level 3: Expensive (12~15%)</h3>
                            <ResultRatingCard rating="expensive" priceDifference={14} />
                        </div>

                        {/* Critical */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-red-600">Level 4: Critical (&gt; 15%)</h3>
                            <ResultRatingCard rating="critical" priceDifference={22} />
                        </div>

                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
