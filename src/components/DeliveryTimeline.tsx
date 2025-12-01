'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
    { time: '20:00', title: '주문 마감', desc: '앱/전화/카톡으로 간편하게 주문하세요.', icon: '📱' },
    { time: '22:00', title: '가락시장 사입', desc: '경매 직후 가장 신선한 식자재를 확보합니다.', icon: '🚚' },
    { time: '03:00', title: '소분 및 검수', desc: '성원식자재 창고에서 각 식당별로 꼼꼼하게 소분합니다.', icon: '📦' },
    { time: '05:00', title: '상차 및 배송', desc: '냉동 탑차로 신선함을 유지하며 배송을 시작합니다.', icon: '🚛' },
    { time: '10:00', title: '배송 완료', desc: '사장님 가게 앞까지 안전하게 도착합니다.', icon: '✅' },
];

export default function DeliveryTimeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the vertical line
            gsap.fromTo(lineRef.current,
                { height: '0%' },
                {
                    height: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 1,
                    }
                }
            );

            // Animate each step
            stepsRef.current.forEach((step, index) => {
                if (!step) return;

                gsap.fromTo(step,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: step,
                            start: 'top 80%', // Trigger when top of element hits 80% of viewport height
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <p className="text-brand-emerald-600 text-sm font-bold tracking-widest uppercase mb-2">
                        PROCESS
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        가장 <span className="text-brand-emerald-600">신선한 여정</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        매일 새벽, 가락시장의 신선함을 그대로 담아 고객님의 주방까지 전달합니다.
                    </p>
                </div>

                {/* Mobile: Horizontal Swipe */}
                <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 px-4 -mx-4 scrollbar-hide">
                    {steps.map((step, index) => (
                        <div key={index} className="snap-center shrink-0 w-[280px] bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-brand-emerald-50 rounded-full flex items-center justify-center text-brand-emerald-600 mb-4 text-3xl">
                                {step.icon}
                            </div>
                            <div className="text-brand-emerald-600 font-bold text-sm mb-1">{step.time}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Desktop: Vertical Timeline */}
                <div className="hidden md:block relative max-w-4xl mx-auto">
                    {/* Center Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-emerald-100 -translate-x-1/2" />

                    {/* Progress Line */}
                    <div
                        ref={lineRef}
                        className="absolute left-1/2 top-0 w-0.5 bg-brand-emerald-500 -translate-x-1/2 h-0"
                    />

                    <div className="relative z-10">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                ref={el => { stepsRef.current[index] = el }}
                                className={`flex items-center justify-between mb-24 last:mb-0 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                {/* Content */}
                                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                    <div className="text-brand-emerald-600 font-bold text-lg mb-2">{step.time}</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                                </div>

                                {/* Icon/Dot */}
                                <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-brand-emerald-50 flex items-center justify-center text-brand-emerald-600 shadow-sm z-10 text-2xl">
                                    {step.icon}
                                </div>

                                {/* Empty Space for Balance */}
                                <div className="w-5/12" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
