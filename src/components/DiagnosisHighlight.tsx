'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function DiagnosisHighlight() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(contentRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 bg-gradient-to-br from-brand-emerald-900 to-brand-emerald-800 text-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-brand-yellow blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div ref={contentRef} className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <span className="inline-block px-4 py-1 rounded-full bg-brand-yellow text-brand-emerald-900 font-bold text-sm mb-6">
                            무료 서비스
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                            우리 가게 식자재 비용,<br />
                            <span className="text-brand-yellow">적정가</span>인지 궁금하신가요?
                        </h2>
                        <p className="text-lg text-gray-200 mb-8 max-w-xl">
                            영수증 3장만 있으면 AI가 즉시 분석해드립니다.<br />
                            성원식자재와 비교하여 얼마나 절약할 수 있는지 확인해보세요.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                href="/diagnosis"
                                className="px-8 py-4 bg-white text-brand-emerald-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-white/20 hover:-translate-y-1"
                            >
                                무료 단가 진단하기
                            </Link>
                        </div>
                    </div>

                    {/* Visual Element */}
                    <div className="flex-1 relative w-full max-w-md">
                        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-brand-emerald-900 font-bold">
                                        %
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-300">예상 절감액</p>
                                        <p className="text-xl font-bold">월 1,200,000원</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-brand-yellow font-bold text-2xl">-15%</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-yellow w-[85%]"></div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-300">
                                    <span>현재 매입가</span>
                                    <span>성원식자재</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
