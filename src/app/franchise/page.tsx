'use client';

import SiteHeader from '@/components/SiteHeader';
import FloatingCTA from '@/components/FloatingCTA';
import Link from 'next/link';
import { Check, ShieldCheck, Truck, BarChart } from 'lucide-react';

export default function FranchisePage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-brand-emerald-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/hero_slide_4.jpg')] bg-cover bg-center opacity-20"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white font-bold mb-4 border border-white/20">
                        프랜차이즈 전용 솔루션
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        전 지점 <span className="text-brand-yellow">맛의 통일</span>,<br />
                        성원식자재가 책임집니다
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        본사의 레시피 그대로, 전국 어디서나 동일한 퀄리티.<br />
                        물류 고민은 덜고 브랜드 성장에만 집중하세요.
                    </p>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-6 bg-gray-50 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-12 h-12 bg-brand-emerald-100 text-brand-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">레시피 보안</h3>
                            <p className="text-gray-600">
                                본사 고유의 소스와 전처리 식자재를 철저한 보안 하에 관리 및 배송합니다.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-12 h-12 bg-brand-emerald-100 text-brand-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                <Truck size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">전 지점 새벽배송</h3>
                            <p className="text-gray-600">
                                경기 북부 전 지역 직영 물류망을 통해 신선한 식자재를 매일 아침 공급합니다.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-12 h-12 bg-brand-emerald-100 text-brand-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                <BarChart size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">통합 정산 시스템</h3>
                            <p className="text-gray-600">
                                지점별 발주 내역과 미수금을 본사에서 한눈에 파악하고 관리할 수 있습니다.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-12 h-12 bg-brand-emerald-100 text-brand-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                <Check size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">품질 표준화</h3>
                            <p className="text-gray-600">
                                엄격한 검수를 통과한 규격화된 식자재만 공급하여 맛의 편차를 없앱니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Explanation */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2">
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                                <h3 className="text-2xl font-bold mb-6">프랜차이즈 본사의 고민, <br />이렇게 해결해드립니다</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-bold">Q</div>
                                        <p className="text-gray-700">"지점마다 야채 품질이 달라서 맛이 일정하지 않아요."</p>
                                    </li>
                                    <li className="flex items-start gap-3 mb-6">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-brand-emerald-100 text-brand-emerald-600 flex items-center justify-center text-xs font-bold">A</div>
                                        <p className="text-gray-900 font-medium">가락시장 경매사가 직접 선별한 '특'등급 농산물만 일괄 공급하여 품질을 통일합니다.</p>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-bold">Q</div>
                                        <p className="text-gray-700">"물류비용이 너무 많이 들어서 가맹점주님들이 힘들어해요."</p>
                                    </li>
                                    <li className="flex items-start gap-3 mb-6">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-brand-emerald-100 text-brand-emerald-600 flex items-center justify-center text-xs font-bold">A</div>
                                        <p className="text-gray-900 font-medium">성원식자재의 공동 물류망을 이용하면 개별 배송 대비 물류비를 최대 30% 절감할 수 있습니다.</p>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-bold">Q</div>
                                        <p className="text-gray-700">"신규 오픈할 때 초도 물량 세팅이 복잡해요."</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-brand-emerald-100 text-brand-emerald-600 flex items-center justify-center text-xs font-bold">A</div>
                                        <p className="text-gray-900 font-medium">오픈 바이저가 현장에 방문하여 초도 물량 입고부터 정리까지 완벽하게 지원합니다.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                                50개 이상의 브랜드가<br />
                                선택한 파트너
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                이미 많은 프랜차이즈가 성원식자재와 함께 성장하고 있습니다.
                                안정적인 물류는 브랜드 확장의 핵심 기반입니다.
                                지금 바로 물류 컨설팅을 받아보세요.
                            </p>
                            <Link
                                href="/#contact"
                                className="inline-flex px-8 py-4 bg-brand-emerald-600 text-white font-bold rounded-xl hover:bg-brand-emerald-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                프랜차이즈 제휴 문의
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <FloatingCTA />
        </main>
    );
}
