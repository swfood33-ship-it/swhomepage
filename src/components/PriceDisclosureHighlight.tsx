'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

export default function PriceDisclosureHighlight() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            });

            tl.from(contentRef.current, {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            })
                .from(imageRef.current, {
                    x: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                }, '-=0.8');

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 bg-emerald-950 text-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Text Content */}
                    <div ref={contentRef} className="w-full md:w-1/2 text-center md:text-left">
                        <div className="inline-block px-4 py-2 bg-brand-yellow/20 text-brand-yellow font-bold rounded-full mb-6 text-sm md:text-base border border-brand-yellow/30">
                            업계 최초 100% 투명 공개
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
                            가격에 대한 의심,<br />
                            <span className="text-brand-yellow">데이터</span>로 증명합니다.
                        </h2>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto md:mx-0">
                            더 이상 "오늘 시세가 비싸서"라는 핑계에 속지 마세요.<br />
                            성원식자재는 매주 월요일, 가락시장 실제 경매가와<br />
                            운송비, 마진까지 포함된 최종 매입가를 엑셀로 공개합니다.
                        </p>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-yellow text-brand-gray-900 font-bold text-lg rounded-xl hover:bg-yellow-300 transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:-translate-y-1"
                        >
                            <span>금주 매입가 리포트 보기</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {/* Visual Content (Abstract Excel/Report Representation) */}
                    <div ref={imageRef} className="w-full md:w-1/2 relative">
                        <div className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            {/* Mock Table Header */}
                            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <div className="ml-auto text-sm text-gray-400">weekly_prices.xlsx</div>
                            </div>
                            {/* Mock Table Rows */}
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((_, i) => (
                                    <div key={i} className="flex items-center gap-4 opacity-80">
                                        <div className="w-1/4 h-4 bg-white/10 rounded" />
                                        <div className="w-1/4 h-4 bg-white/10 rounded" />
                                        <div className="w-1/4 h-4 bg-white/10 rounded" />
                                        <div className="w-1/4 h-4 bg-brand-yellow/20 rounded" />
                                    </div>
                                ))}
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-brand-emerald-700 text-white px-6 py-3 rounded-lg shadow-lg font-bold flex items-center gap-2 animate-bounce">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                관리자 승인 완료
                            </div>
                        </div>
                        {/* Decorative Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-emerald-500/20 blur-[100px] -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
