'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ContactForm() {
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const hintRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(hintRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
            });

            gsap.from(formRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.2,
                ease: 'power2.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="contact" className="py-24 bg-brand-emerald-900 text-white">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="text-center mb-12">
                    <p ref={hintRef} className="text-brand-yellow font-medium mb-4">30초면 충분합니다</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        무료 견적 상담 신청
                    </h2>
                    <p className="text-gray-300">
                        현재 사용 중인 식자재 품목을 알려주시면, <br className="md:hidden" />
                        더 합리적인 가격을 제안해드립니다.
                    </p>
                </div>

                <form
                    ref={formRef}
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const data = {
                            name: formData.get('name'),
                            phone: formData.get('phone'),
                            message: formData.get('message'),
                        };

                        try {
                            const res = await fetch('/api/inquiry/quote', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(data),
                            });

                            if (res.ok) {
                                alert('견적 상담 신청이 완료되었습니다. 담당자가 곧 연락드리겠습니다.');
                                (e.target as HTMLFormElement).reset();
                            } else {
                                alert('신청 중 오류가 발생했습니다. 다시 시도해 주세요.');
                            }
                        } catch (error) {
                            console.error('Error:', error);
                            alert('신청 중 오류가 발생했습니다.');
                        }
                    }}
                    className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl text-brand-gray-900"
                >
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">업체명 / 담당자님 성함</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-emerald-500 focus:ring-2 focus:ring-brand-emerald-200 outline-none transition-all"
                                placeholder="예: 성원식당 홍길동"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">연락처</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-emerald-500 focus:ring-2 focus:ring-brand-emerald-200 outline-none transition-all"
                                placeholder="010-0000-0000"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">문의 내용 (주요 품목)</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-emerald-500 focus:ring-2 focus:ring-brand-emerald-200 outline-none transition-all resize-none"
                                placeholder="예: 쌀, 김치, 양파 등 주요 사용 품목을 적어주세요."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-brand-emerald text-white font-bold rounded-lg hover:bg-brand-emerald-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            견적 상담 신청하기
                        </button>

                        <p className="text-center text-xs text-gray-500 mt-4">
                            보내주신 정보는 상담 목적으로만 사용되며 안전하게 보호됩니다.
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}
