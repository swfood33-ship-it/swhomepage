'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Truck, TrendingUp, ShieldCheck, BarChart3, Users, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
    {
        year: '2003',
        title: '식자재 유통의 본질에 도전하다',
        desc: '지역 식당들의 불안정한 공급 구조를 해결하기 위해 직접 도매사입 기반 모델을 도입했습니다.',
        icon: <Building2 className="w-6 h-6" />,
        tag: 'Foundation'
    },
    {
        year: '2009',
        title: '품질의 기준을 세우다',
        desc: '밤 10시부터 새벽 2시까지 이어지는 현장 사입을 표준화하여 품질 편차를 최소화하고 데이터를 확보했습니다.',
        icon: <ShieldCheck className="w-6 h-6" />,
        tag: 'Standardization'
    },
    {
        year: '2014',
        title: '신선함을 지키는 기술',
        desc: '냉장/냉동 인프라 고도화로 산지의 신선함을 주방까지 그대로 전달하는 콜드체인 시스템을 완성했습니다.',
        icon: <Truck className="w-6 h-6" />,
        tag: 'Infrastructure'
    },
    {
        year: '2018',
        title: '신뢰의 확장',
        desc: '학교·관공서·프랜차이즈로 공급을 확대하며, 전 품목 매입가 공개 모델을 도입해 가격 신뢰도를 혁신했습니다.',
        icon: <Users className="w-6 h-6" />,
        tag: 'Expansion'
    },
    {
        year: '2022',
        title: '압도적 운영 효율',
        desc: '60평 규모 센터 확장 및 물류 동선 최적화로 배송 정확도 99.8%를 달성하며 운영 역량을 증명했습니다.',
        icon: <BarChart3 className="w-6 h-6" />,
        tag: 'Optimization'
    },
    {
        year: '2024',
        title: '투명성, 업계의 표준이 되다',
        desc: '업계 최초로 매입가 완전 공개 및 고정 마진 정책을 도입하여 식자재 시장의 불투명성을 해결했습니다.',
        icon: <TrendingUp className="w-6 h-6" />,
        tag: 'Innovation'
    },
    {
        year: '2025',
        title: '미래를 향한 도약',
        desc: '데이터 기반 발주 예측 시스템 및 차세대 물류 플랫폼 구축으로 디지털 전환(DX)을 선도합니다.',
        icon: <Leaf className="w-6 h-6" />,
        tag: 'Future'
    }
];

export default function PremiumTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const items = gsap.utils.toArray<HTMLElement>('.timeline-item');

        // Central Line Animation
        gsap.fromTo(lineRef.current,
            { height: '0%' },
            {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1,
                }
            }
        );

        // Cards Animation
        items.forEach((item, i) => {
            const card = item.querySelector('.timeline-card');
            const dot = item.querySelector('.timeline-dot');
            const content = item.querySelector('.timeline-content');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.fromTo(dot,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
            )
                .fromTo(card,
                    { y: 50, opacity: 0, filter: 'blur(10px)' },
                    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' },
                    '-=0.2'
                );
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 bg-gray-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent opacity-80"></div>
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-emerald-100/30 rounded-full blur-3xl -translate-x-1/2"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl translate-x-1/2"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-emerald-100 text-brand-emerald-800 text-sm font-bold tracking-wider mb-4 border border-brand-emerald-200">
                        SINCE 2003
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
                        성장의 기록과<br className="md:hidden" /> 원칙의 증명
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        기술보다 중요한 건 ‘지속성’입니다.<br />
                        매일의 반복이 쌓여 20년의 신뢰를 만들었습니다.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Central Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-1/2">
                        <div ref={lineRef} className="w-full bg-gradient-to-b from-brand-emerald-400 to-brand-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    </div>

                    <div className="space-y-12 md:space-y-24">
                        {timelineData.map((item, idx) => (
                            <div key={idx} className={`timeline-item relative flex items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Spacer for Desktop */}
                                <div className="hidden md:block w-1/2"></div>

                                {/* Central Dot */}
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 transform -translate-x-1/2 z-20 flex items-center justify-center">
                                    <div className="timeline-dot w-4 h-4 bg-white rounded-full border-4 border-brand-emerald-500 shadow-lg"></div>
                                    <div className="absolute w-8 h-8 bg-brand-emerald-500/20 rounded-full animate-pulse"></div>
                                </div>

                                {/* Content Card */}
                                <div className="w-full pl-20 md:pl-0 md:w-1/2 md:px-12">
                                    <div className="timeline-card group bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.1)] transition-all duration-500 hover:-translate-y-1">
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald-600 to-brand-emerald-800 tracking-tighter">
                                                {item.year}
                                            </span>
                                            <div className="w-12 h-12 rounded-2xl bg-brand-emerald-50 flex items-center justify-center text-brand-emerald-600 group-hover:scale-110 transition-transform duration-500">
                                                {item.icon}
                                            </div>
                                        </div>

                                        <div className="timeline-content">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-emerald-800 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
