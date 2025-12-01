'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const products = [
    { name: '농산물·야채', desc: '매일 새벽 가락시장 직매입', color: 'bg-green-100', image: '/images/product_agriculture.png' },
    { name: '쌀·잡곡', desc: '도정일 7일 이내 프리미엄 쌀', color: 'bg-yellow-100', image: '/images/product_rice.png' },
    { name: '공산품', desc: '대형 제조사 직거래 공급', color: 'bg-blue-100', image: '/images/product_industrial.png' },
    { name: '냉동/냉장', desc: '철저한 콜드체인 관리', color: 'bg-sky-100', image: '/images/product_frozen_cold_chain.png' },
    { name: '김치·절임류', desc: 'HACCP 인증 국산 김치', color: 'bg-red-100', image: '/images/product_kimchi_pickled.png' },
    { name: '장류/소스류', desc: '업소용 대용량 최저가', color: 'bg-orange-100', image: '/images/product_sauces_containers.png' },
];

export default function ProductGrid() {
    const sectionRef = useRef<HTMLElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            itemsRef.current.forEach((el) => {
                if (!el) return;
                const bg = el.querySelector('.parallax-bg');

                gsap.to(bg, {
                    y: -50, // More pronounced parallax movement
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900 mb-4">
                        취급 품목 카테고리
                    </h2>
                    <p className="text-gray-600">
                        3,000여 가지 식자재를 원스톱으로 공급합니다.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 auto-rows-[200px] md:auto-rows-[300px]">
                    {products.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => { itemsRef.current[index] = el }}
                            className="group relative rounded-2xl overflow-hidden border border-transparent hover:border-brand-emerald-300 transition-all duration-500 bg-white shadow-sm hover:shadow-2xl hover:scale-[1.02]"
                        >
                            {item.image ? (
                                <div className="absolute inset-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 parallax-bg"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                </div>
                            ) : (
                                <div className={`parallax-bg absolute inset-0 ${item.color} transform scale-110`} />
                            )}

                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
                                <h3 className={`text-xl md:text-2xl font-bold mb-2 ${item.image ? 'text-white drop-shadow-md' : 'text-brand-gray-900'}`}>
                                    {item.name}
                                </h3>
                                <p className={`text-sm ${item.image ? 'text-gray-100 drop-shadow-sm' : 'text-gray-600'}`}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
