'use client';

import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';

export default function CalculatorTeaser() {
    return (
        <section className="py-24 bg-brand-emerald-900 text-white overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-emerald-800/50 skew-x-12 transform translate-x-20" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center">
                                <Calculator className="text-brand-emerald-900" size={24} />
                            </div>
                            <span className="text-brand-yellow font-bold tracking-wider text-sm uppercase">AI Smart Analysis</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            식자재 비용 분석,<br />
                            <span className="text-brand-yellow">AI로 더 정확하게</span>
                        </h2>
                        <p className="text-gray-200 text-lg leading-relaxed mb-10 max-w-lg">
                            영수증 사진만 있으면 AI가 숨은 이익을 찾아드립니다.
                            월 매입액에 따른 예상 절감액까지 한 번에 확인하세요.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/diagnosis"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-yellow text-brand-emerald-900 font-bold rounded-xl hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                무료 비용 분석하기
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-brand-yellow/20 rounded-3xl blur-xl" />
                            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative border border-white/10">
                                <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-100">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium mb-1">월 평균 매입액</p>
                                        <p className="text-3xl font-bold text-gray-900">500만원</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-block px-3 py-1 bg-brand-emerald-100 text-brand-emerald-700 rounded-full text-xs font-bold mb-1">
                                            예상 절감율 15%
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-600">월 예상 절감액</p>
                                        <p className="text-4xl font-bold text-brand-emerald-600">+75만원</p>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <p className="text-gray-900 font-bold">연간 예상 절감액</p>
                                        <p className="text-2xl font-bold text-gray-900">+900만원</p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                                    <p className="text-sm text-gray-400">
                                        * 영수증 분석 시 더 정확한 결과를 확인할 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
