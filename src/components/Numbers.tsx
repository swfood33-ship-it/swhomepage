'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stats = [
    { label: '업력', value: 20, suffix: '년' },
    { label: '거래처', value: 500, suffix: '+' },
    { label: '정기배송', value: 50, suffix: '+' },
    { label: '납품 정확도', value: 99, suffix: '%' },
];

export default function Numbers() {
    const sectionRef = useRef<HTMLElement>(null);
    const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            numbersRef.current.forEach((el, index) => {
                const targetValue = stats[index].value;

                gsap.from(el, {
                    textContent: 0,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    stagger: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        once: true, // Run only once
                    },
                    onUpdate: function () {
                        if (el) {
                            el.textContent = Math.ceil(this.targets()[0].textContent).toString();
                        }
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 bg-gray-900 text-white border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-4">
                            <div className="text-4xl md:text-6xl font-bold text-brand-yellow mb-2 font-mono">
                                <span
                                    ref={(el) => { numbersRef.current[index] = el }}
                                    aria-live="off" // Accessibility: prevent screen readers from announcing every number change
                                >
                                    {stat.value}
                                </span>
                                {stat.suffix}
                            </div>
                            <div className="text-gray-300 text-lg md:text-xl">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
