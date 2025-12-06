'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const cases = [
    {
        name: '강남 A 레스토랑',
        category: '이탈리안',
        desc: '매일 아침 배송되는 신선한 허브와 채소로 샐러드 매출 20% 상승',
        image: '/images/case_italian.png',
    },
    {
        name: '홍대 B 프랜차이즈',
        category: '한식 주점',
        desc: '전 지점 동일한 품질의 육류 공급으로 맛의 표준화 성공',
        image: '/images/case_korean.png',
    },
    {
        name: '성수 C 카페',
        category: '브런치',
        desc: '변동 없는 우유/버터 공급가로 원가 방어 성공',
        image: '/images/case_brunch.png',
    },
];

export default function Cases() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(cardsRef.current,
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="cases" className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="overflow-hidden mb-4">
                        <h2 ref={(el) => { if (el) cardsRef.current.push(el) }} className="text-3xl md:text-4xl font-bold text-brand-gray-900 transform translate-y-full">
                            성공하는 사장님들의 선택
                        </h2>
                    </div>
                    <p className="text-gray-600">
                        이미 500개 이상의 매장이 성원식자재와 함께 성장하고 있습니다.
                    </p>
                </div>

                {/* Desktop: Grid, Mobile: Horizontal Scroll */}
                <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {cases.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardsRef.current[index] = el }}
                            className="flex-shrink-0 w-[85vw] md:w-auto snap-center bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 group cursor-pointer"
                        >
                            <div className="h-48 relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-brand-emerald-900/10 group-hover:bg-brand-emerald-900/0 transition-colors" />
                            </div>
                            <div className="p-6">
                                <div className="text-sm text-brand-emerald-700 font-bold mb-2">{item.category}</div>
                                <h3 className="text-xl font-bold text-brand-gray-900 mb-3">{item.name}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    "{item.desc}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="/cases"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-emerald-600 text-white font-bold rounded-xl hover:bg-brand-emerald-700 transition-all shadow-lg hover:shadow-xl"
                    >
                        더 많은 성공 사례 보기
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
