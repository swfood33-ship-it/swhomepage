'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
    '자반고',
    '경동대학교',
    '삼육대학교',
    '쭈꾸미아저씨',
    '그때그집',
    '스시히로미',
    '동대문엽기떡볶이',
    '만포갈비',
    '경민대학교',
    '대진대학교',
    '의정부시청구내식당',
    '의정부시 청소년 쿠킹클래스',
    '거시기닭갈비',
    '옥정동쭈꾸미',
    '연세반점',
    '봉평옹심이막국수',
    '원가네감자탕',
    '육우동',
    '장군족발'
];

export default function ClientGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        });

        // Animate Title
        tl.to(titleRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
        })
            // Animate Grid Items
            .to(gridRef.current!.children, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: {
                    amount: 0.8,
                    from: "random" // Randomize appearance order for "irregular" feel
                },
                ease: 'back.out(1.7)', // Slight bounce for fun
            }, '-=0.4');

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 bg-gray-50 border-b border-gray-200 overflow-hidden">
            <div className="container mx-auto px-4">
                <div ref={titleRef} className="text-center mb-12 opacity-0 translate-y-8">
                    <p className="text-brand-emerald-600 text-sm font-bold tracking-widest uppercase mb-2">
                        OUR VALUED CLIENTS
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        <span className="text-brand-emerald-600">500+</span> 파트너가 선택한 이유
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                        프랜차이즈부터 관공서, 대학교까지 다양한 고객사와 함께 성장하고 있습니다.
                    </p>
                </div>

                {/* Irregular Layout using Flex-Wrap and varying padding/sizes */}
                <div ref={gridRef} className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-6xl mx-auto">
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="opacity-0 translate-y-8 bg-white px-6 py-3 md:px-8 md:py-4 rounded-full shadow-sm border border-gray-100 flex items-center justify-center hover:shadow-md hover:border-brand-emerald-200 hover:-translate-y-1 hover:scale-105 transition-all duration-300 group cursor-default"
                        >
                            <span className="text-gray-600 font-bold text-base md:text-lg group-hover:text-brand-emerald-600 transition-colors whitespace-nowrap">
                                {client}
                            </span>
                        </div>
                    ))}
                    {/* "And More" Bubble */}
                    <div className="opacity-0 translate-y-8 bg-brand-emerald-50 px-6 py-3 md:px-8 md:py-4 rounded-full border border-brand-emerald-100 flex items-center justify-center">
                        <span className="text-brand-emerald-600 font-bold text-base md:text-lg">
                            + More
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
