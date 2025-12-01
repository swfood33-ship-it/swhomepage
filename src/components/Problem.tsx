'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const problems = [
    {
        icon: '📉',
        title: '불안한 단가 변동',
        desc: '매일 바뀌는 식자재 가격 때문에 원가 관리가 어려우신가요? 투명한 매입가 공개로 믿을 수 있는 가격을 제안합니다.',
    },
    {
        icon: '🥬',
        title: '들쑥날쑥한 신선도',
        desc: '받아볼 때마다 다른 품질에 실망하셨나요? 가락시장 직매입과 철저한 검수로 최상의 신선도를 약속합니다.',
    },
    {
        icon: '🚚',
        title: '답답한 배송/응답',
        desc: '늦은 배송과 연락 두절로 영업에 지장이 있으셨나요? 주 6회 정시 새벽배송과 전담 매니저의 빠른 응답을 경험하세요.',
    },
    {
        icon: '📝',
        title: '복잡한 발주/정산',
        desc: '수기 발주와 불투명한 영수증으로 정산이 힘드셨나요? 간편한 앱 주문과 투명한 거래명세서로 업무 시간을 줄여드립니다.',
    },
    {
        icon: '📦',
        title: '재고 관리의 어려움',
        desc: '대량 구매 강요로 재고가 쌓이시나요? 필요한 만큼만 주문하는 소량/대량 유연한 주문 시스템을 지원합니다.',
    },
    {
        icon: '🤝',
        title: '소통의 부재',
        desc: '문제가 생겨도 해결해 줄 사람이 없었나요? 사장님 전담 매니저가 1:1로 배정되어 신속하게 문제를 해결해 드립니다.',
    },
];

export default function Problem() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const headlineRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text Reveal Animation
            gsap.to(headlineRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
            });

            // Cards Stagger Animation
            gsap.to(cardsRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="problem" className="py-32 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="overflow-hidden mb-4">
                        <h2 ref={headlineRef} className="text-3xl md:text-4xl font-bold text-brand-gray-900 transform translate-y-full opacity-0">
                            사장님의 고민, <br className="md:hidden" />
                            <span className="text-brand-emerald-700">성원식자재</span>가 해결해드립니다.
                        </h2>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        기존 식자재 유통의 불투명함과 비효율, 이제는 바뀌어야 합니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {problems.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardsRef.current[index] = el }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 transform translate-y-12 opacity-0"
                        >
                            <div className="text-4xl mb-6">{item.icon}</div>
                            <h3 className="text-xl font-bold text-brand-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
