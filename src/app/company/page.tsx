'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SiteHeader from '@/components/SiteHeader';

export default function CompanyPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.animate-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
            .from('.animate-text', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            }, '-=0.5');

    }, { scope: containerRef });

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <SiteHeader />
            <main ref={containerRef} className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="relative py-24 bg-brand-emerald-900 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src="/images/hero_warehouse.png"
                            alt="Background"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="animate-title text-4xl md:text-6xl font-bold mb-6">
                            신뢰할 수 있는<br />
                            <span className="text-brand-yellow">식자재 파트너</span>
                        </h1>
                        <p className="animate-text text-xl text-gray-200 max-w-2xl mx-auto">
                            성원식자재는 20년간 오직 사장님의 성공만을 생각하며 달려왔습니다.<br />
                            가락시장 직매입을 통한 투명한 가격과 신선함을 약속드립니다.
                        </p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="animate-text space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    우리의 미션
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    "사장님의 주방을 가장 효율적으로 만드는 것"
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    우리는 단순한 식자재 납품을 넘어, 사장님이 요리에만 집중하실 수 있는 환경을 만듭니다.
                                    매일 새벽 가장 신선한 재료를, 가장 합리적인 가격에, 가장 편리하게 전달하는 것이 우리의 사명입니다.
                                </p>
                            </div>
                            <div className="animate-text relative h-80 rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src="/images/hero_truck_loaded.png"
                                    alt="Delivery Truck"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* History (Mock) */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">걸어온 길</h2>
                        <div className="max-w-3xl mx-auto space-y-8">
                            {[
                                { year: '2024', event: '무료 단가 진단 서비스 런칭' },
                                { year: '2023', event: '가락시장 직매입 센터 확장 이전' },
                                { year: '2020', event: '새벽배송 시스템 전면 도입' },
                                { year: '2015', event: '법인 전환 및 온라인 발주 시스템 구축' },
                                { year: '2005', event: '성원유통 창립' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-8 items-start animate-text">
                                    <span className="text-2xl font-bold text-brand-emerald-700 w-24 flex-shrink-0">{item.year}</span>
                                    <div className="pt-1 text-lg text-gray-700 border-l-2 border-brand-emerald-200 pl-8 pb-8">
                                        {item.event}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
