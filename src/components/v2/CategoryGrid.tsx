'use client';

import { ArrowRight } from 'lucide-react';

const categories = [
    { name: '농산물·야채', icon: '🥬', desc: '매일 새벽 가락시장 직매입' },
    { name: '쌀·잡곡', icon: '🌾', desc: '도정일 7일 이내 프리미엄 쌀' },
    { name: '공산품', icon: '📦', desc: '대형 제조사 직거래 공급' },
    { name: '냉동/냉장', icon: '❄️', desc: '철저한 콜드체인 관리' },
    { name: '김치·절임류', icon: '🍚', desc: 'HACCP 인증 국산 김치' },
    { name: '장류/소스류', icon: '🥘', desc: '업소용 대용량 최저가' },
    { name: '용기·포장재', icon: '🧴', desc: '배달 용기 및 소모품 일체' },
];

export default function CategoryGrid() {
    return (
        <section id="categories" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        취급 품목 카테고리
                    </h2>
                    <p className="text-gray-500">
                        3,000여 가지 식자재를 원스톱으로 공급합니다.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className="group cursor-pointer"
                        >
                            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 text-center border border-gray-100 hover:border-brand-emerald-200 transition-all hover:bg-brand-emerald-50/30 h-full flex flex-col items-center justify-center">
                                <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {cat.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                                    {cat.name}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4 hidden md:block">
                                    {cat.desc}
                                </p>
                                <span className="text-brand-emerald-600 text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    상담 요청 <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Last card for CTA */}
                    <div className="bg-brand-emerald-600 rounded-2xl p-6 md:p-8 text-center flex flex-col items-center justify-center text-white cursor-pointer hover:bg-brand-emerald-700 transition-colors">
                        <h3 className="text-xl font-bold mb-2">
                            찾으시는 품목이<br />없으신가요?
                        </h3>
                        <p className="text-brand-emerald-100 text-sm mb-4">
                            전체 품목 리스트를<br />보내드립니다.
                        </p>
                        <span className="inline-block px-4 py-2 bg-white text-brand-emerald-600 rounded-full text-sm font-bold">
                            문의하기
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
