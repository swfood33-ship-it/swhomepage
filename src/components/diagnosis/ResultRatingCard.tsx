import React from 'react';
import { Check, AlertCircle, AlertTriangle, TrendingDown } from 'lucide-react';

interface ResultRatingCardProps {
    rating: 'very_good' | 'average' | 'expensive' | 'critical';
    priceDifference: number;
}

export default function ResultRatingCard({ rating, priceDifference }: ResultRatingCardProps) {
    const getCardStyle = () => {
        switch (rating) {
            case 'very_good':
                return {
                    bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
                    icon: <Check size={24} />,
                    label: '훌륭합니다!',
                    desc: '이미 최저가로 구매 중이시네요.',
                    shadow: 'shadow-emerald-500/30'
                };
            case 'average':
                return {
                    bg: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
                    icon: <Check size={24} />,
                    label: '보통입니다',
                    desc: '평균적인 가격으로 구매하고 계십니다.',
                    shadow: 'shadow-yellow-500/30'
                };
            case 'expensive':
                return {
                    bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
                    icon: <AlertTriangle size={24} />,
                    label: '조금 비싸요',
                    desc: '조금 더 저렴하게 구매할 수 있습니다.',
                    shadow: 'shadow-orange-500/30'
                };
            case 'critical':
                return {
                    bg: 'bg-gradient-to-br from-red-500 to-red-600',
                    icon: <AlertCircle size={24} />,
                    label: '매우 심각',
                    desc: '당장 거래처 변경을 고려하세요!',
                    shadow: 'shadow-red-500/30'
                };
        }
    };

    const style = getCardStyle();

    return (
        <div className={`relative overflow-hidden rounded-[32px] p-8 md:p-10 text-white shadow-xl transition-all hover:scale-[1.02] duration-300 ${style.bg} ${style.shadow}`}>

            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-sm font-bold mb-6 tracking-wide text-white/90">
                    다른 식당에 비해
                </span>

                <div className="flex items-baseline justify-center gap-2 mb-8">
                    <span className="text-6xl md:text-8xl font-black tracking-tighter drop-shadow-sm">
                        {Math.abs(priceDifference)}%
                    </span>
                    <span className="text-2xl md:text-3xl font-bold opacity-90">
                        {priceDifference > 0 ? '더 비싸요' : '더 저렴해요'}
                    </span>
                </div>

                <div className="w-full h-1.5 bg-black/10 rounded-full mb-8 overflow-hidden relative max-w-xs mx-auto">
                    {/* Gauge Bar Background */}
                    <div className="absolute top-0 left-0 h-full w-full bg-white/30"></div>
                    {/* Indicator - simple positioning based on rating for visual logic */}
                    <div className={`absolute top-0 h-full bg-white transition-all duration-1000 ease-out rounded-full 
                        ${rating === 'very_good' ? 'left-0 w-[25%]' :
                            rating === 'average' ? 'left-[25%] w-[25%]' :
                                rating === 'expensive' ? 'left-[50%] w-[25%]' :
                                    'left-[75%] w-[25%]'}`}
                    />
                </div>

                <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 shadow-lg">
                    <div className="bg-white text-gray-900 p-2 rounded-full shadow-sm">
                        {style.icon}
                    </div>
                    <div className="text-left">
                        <div className="font-extrabold text-lg leading-tight">{style.label}</div>
                        <div className="text-sm text-white/90 font-medium">{style.desc}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
