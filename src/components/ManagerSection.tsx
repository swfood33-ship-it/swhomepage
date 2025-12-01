'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ManagerSection() {
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
        <section ref={sectionRef} className="py-24 bg-brand-emerald-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    {/* Content Side */}
                    <div ref={contentRef} className="w-full md:w-1/2">
                        <div className="inline-block px-4 py-2 bg-brand-emerald-100 text-brand-emerald-800 rounded-full text-sm font-bold mb-6">
                            1:1 전담 매니저 배정
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-brand-gray-900 mb-6 leading-tight">
                            "사장님의 성공을 돕는<br />
                            <span className="text-brand-emerald-700">든든한 파트너</span>가 되겠습니다."
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            성원식자재는 단순한 납품 기사가 아닌, 사장님의 비즈니스를 이해하는 전담 매니저를 배정합니다.
                            <br /><br />
                            급한 추가 주문부터 메뉴 컨설팅까지, 카톡 하나로 해결하세요.
                            매일 아침 사장님의 냉장고를 책임지겠습니다.
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center text-xl font-bold">
                                📞
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">직통 문의</p>
                                <p className="text-xl font-bold text-brand-gray-900">010-8215-6737</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Side */}
                    <div ref={imageRef} className="w-full md:w-1/2 relative">
                        <div className="aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-2xl relative z-10">
                            {/* Placeholder for Manager Photo - using a professional abstract or stock-like placeholder if no real photo */}
                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                <span className="text-6xl">👨‍💼</span>
                            </div>
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                                <p className="text-white text-xl font-bold">김성원 대표 매니저</p>
                                <p className="text-gray-300 text-sm">식자재 유통 경력 15년</p>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-yellow/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-emerald-500/20 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}
