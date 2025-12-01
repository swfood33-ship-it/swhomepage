'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const partners = [
    { name: 'CJ 제일제당', logo: '/images/partners/cj_cheiljedang.png' },
    { name: 'CJ 프레시웨이', logo: '/images/partners/cj_freshway.png' },
    { name: '샘표', logo: '/images/partners/sempio.png' },
    { name: '대상', logo: '/images/partners/daesang.png' },
    { name: '움트리', logo: '/images/partners/woomtree.png' },
    { name: '오뚜기', logo: '/images/partners/ottogi.png' },
    { name: '동원F&B', logo: '/images/partners/dongwon.png' },
];

export default function PartnerMarquee() {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        // GSAP Infinite Scroll
        // We have 4 sets of partners. We want to move by the width of 1 set, then reset.
        // 1 set = 25% of the total width (since there are 4 sets).
        gsap.to(marquee, {
            xPercent: -25,
            ease: 'none',
            duration: 30, // Slower for better visibility
            repeat: -1,
        });
    }, []);

    // Create a list with 4 repetitions to ensure seamless scrolling even on wide screens
    const repeatedPartners = [...partners, ...partners, ...partners, ...partners];

    return (
        <section className="py-12 bg-white overflow-hidden border-y border-gray-100">
            <div className="container mx-auto px-4 mb-8 text-center">
                <p className="text-brand-emerald-600 text-sm font-bold tracking-widest uppercase">
                    TRUSTED SOURCING PARTNERS
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                    검증된 브랜드 식자재를 <span className="text-brand-yellow">직매입</span>합니다
                </h3>
            </div>

            <div className="relative w-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

                <div ref={marqueeRef} className="flex gap-16 w-max px-4 items-center">
                    {repeatedPartners.map((partner, index) => (
                        <div key={index} className="relative w-32 h-16 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
