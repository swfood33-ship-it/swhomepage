'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';

const partners = [
    { name: 'CJ 프레시웨이', logo: '/images/partners/cj_freshway_new.png' },
    { name: '백설', logo: '/images/partners/bekseol_new.png' },
    { name: '오뚜기', logo: '/images/partners/ottogi_new.png' },
    { name: '사조대림', logo: '/images/partners/daerim.png' },

    { name: '움트리', logo: '/images/partners/woomtree_new.png' },
    { name: '솔표', logo: '/images/partners/solpyo.png' },
    { name: '부천몽고', logo: '/images/partners/monggo_new.png' },
    { name: '옥천식품', logo: '' }, // Need
    { name: '백미', logo: '/images/partners/baekmi.png' },
    { name: '천일', logo: '' },
    { name: '거명', logo: '' },
    { name: '새로미', logo: '' },
    { name: '하나', logo: '' },
    { name: '태종', logo: '/images/partners/taejong.png' },
    { name: '한맥', logo: '/images/partners/hanmac.png' },
    { name: '담두', logo: '' },
    { name: '초원', logo: '/images/partners/chowon.png' },
    { name: '하나떡뽁이', logo: '' },
    { name: '하우촌', logo: '' },
    { name: '해농', logo: '/images/partners/haenong.png' },
    { name: '청우', logo: '' },
    { name: '트루팜', logo: '' },
    { name: '나래식품', logo: '' },
    { name: '해찬들', logo: '' },
    { name: '한가람', logo: '' },
    { name: '곰표', logo: '/images/partners/daehan_gompyo.png' },
    { name: '오토', logo: '' },
    { name: '해표', logo: '/images/partners/haepyo.jpg' },
    { name: '이츠웰', logo: '/images/partners/itswell.png' },
    { name: '태화', logo: '' },
    { name: '대상', logo: '/images/partners/daesang_new.png' },
    { name: '하선정', logo: '' },
    { name: '영미', logo: '' },
    { name: '한식품', logo: '' },
    { name: '마포식품', logo: '' },
    { name: '광천', logo: '' },
    { name: '금성', logo: '' },
    { name: '황보', logo: '' },
    { name: '순창털보', logo: '' },
    { name: '진흥', logo: '' },
    { name: '푸드웨어', logo: '/images/partners/foodware.png' },

];

export default function PartnerMarquee() {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        // Calculate duration based on number of items to keep consistent speed
        // Base duration 30s for 7 items -> ~4s per item. 45 items -> ~180s.
        const duration = partners.length * 2.5;

        gsap.to(marquee, {
            xPercent: -50, // Move by half since we duplicate the list once
            ease: 'none',
            duration: duration,
            repeat: -1,
        });
    }, []);

    // Duplicate enough times. Since the list is long (45 items), duplicating once is enough for xPercent -50.
    const repeatedPartners = [...partners, ...partners];

    return (
        <section className="py-2 bg-white overflow-hidden border-y border-gray-100">
            <div className="container mx-auto px-4 mb-4 text-center">
                <p className="text-brand-emerald-600 text-sm font-bold tracking-widest uppercase">
                    TRUSTED SOURCING PARTNERS
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                    검증된 브랜드 식자재를 <span className="text-brand-yellow">직매입</span>합니다
                </h3>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradients removed to prevent visual clipping at edges */}
                {/* <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" /> */}
                {/* <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" /> */}

                <div ref={marqueeRef} className="flex gap-16 w-max px-4 items-center">
                    {repeatedPartners.map((partner, index) => {
                        let sizeClass = 'w-32 h-20';

                        // 1. Monggo - Increased to 2x (w-48)
                        if (partner.name === '부천몽고') {
                            sizeClass = 'w-48 h-48';
                        }
                        // 2. Bekseol
                        else if (partner.name === '백설') {
                            sizeClass = 'w-36 h-36';
                        }
                        // 3. Wide (Haepyo)
                        else if (partner.name === '해표') {
                            sizeClass = 'w-64 h-28';
                        }
                        // 4. Moderate Size Group
                        else if (['대상', '오뚜기', '푸드웨어', '움트리'].includes(partner.name)) {
                            sizeClass = 'w-44 h-28';
                        }
                        // 6. CJ Group
                        else if (partner.name.includes('CJ')) {
                            sizeClass = 'w-36 h-24';
                        }
                        // 7. Solpyo - Reduced size
                        else if (partner.name === '솔표') {
                            sizeClass = 'w-28 h-28';
                        }

                        return partner.logo ? (
                            <div
                                key={index}
                                className={`relative ${sizeClass} shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-105`}
                            >
                                <Link href="#" className="relative w-full h-full block">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        fill
                                        className="object-contain mix-blend-multiply"
                                    />
                                </Link>
                            </div>
                        ) : null;
                    })}
                </div>
            </div>
        </section>
    );
}
