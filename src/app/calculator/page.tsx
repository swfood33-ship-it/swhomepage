'use client';

import SiteHeader from '@/components/SiteHeader';
import FloatingCTA from '@/components/FloatingCTA';
import SavingsCalculator from '@/components/SavingsCalculator';
import Link from 'next/link';

export default function CalculatorPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-brand-emerald-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/hero_slide_2.jpg')] bg-cover bg-center opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        우리 매장 식자재 비용,<br />
                        얼마나 <span className="text-brand-yellow">절감</span>할 수 있을까요?
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        간단한 정보 입력만으로 예상 절감액을 확인해보세요.<br />
                        성원식자재의 투명한 가격 정책이 사장님의 수익을 높여드립니다.
                    </p>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-6xl mx-auto">

                        {/* Left: Calculator */}
                        <div className="w-full lg:w-1/2">
                            <SavingsCalculator />
                        </div>

                        {/* Right: Explanation */}
                        <div className="w-full lg:w-1/2 pt-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                왜 이렇게 저렴한가요?
                            </h2>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-brand-emerald-100 rounded-full flex items-center justify-center shrink-0 text-2xl">
                                        📢
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">100% 원가 공개 시스템</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            매주 월요일, 가락시장 실세 경매가와 운송비가 포함된 매입 원가를 투명하게 공개합니다.
                                            깜깜이 마진 없이 정해진 수수료만 받습니다.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-brand-emerald-100 rounded-full flex items-center justify-center shrink-0 text-2xl">
                                        📉
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">유통 단계 최소화</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            산지/경매장 → 도매상 → 소매상 → 식당으로 이어지는 복잡한 구조를
                                            '경매장 → 성원 → 식당'으로 단순화하여 중간 마진을 없앴습니다.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-brand-emerald-100 rounded-full flex items-center justify-center shrink-0 text-2xl">
                                        📦
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">대량 매입의 힘</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            경기 북부 500여 개 매장의 물량을 통합 구매하여
                                            개별 구매보다 훨씬 낮은 단가로 공급받을 수 있습니다.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-6 bg-brand-yellow/10 rounded-2xl border border-brand-yellow/20">
                                <p className="font-bold text-brand-gray-900 mb-2">💡 실제 사례</p>
                                <p className="text-gray-700">
                                    "기존 거래처 대비 월 150만원 정도 절약하고 있습니다.
                                    1년이면 1,800만원인데, 아르바이트생 한 명 인건비가 빠지는 셈이죠."
                                    <br />
                                    <span className="text-sm text-gray-500 mt-2 block">- 의정부 H 돈까스 전문점 사장님</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FloatingCTA />
        </main>
    );
}
