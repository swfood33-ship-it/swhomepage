'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock } from 'lucide-react';

export default function PricingPolicy() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            });

            // Title Animation
            tl.from(titleRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });

            // Steps Animation
            tl.from(stepsRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: 'back.out(1.7)',
            }, '-=0.4');

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <div className="overflow-hidden mb-4">
                        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-brand-gray-900">
                            투명해서 더 믿을 수 있는 <br className="md:hidden" />
                            <span className="text-brand-emerald-700">가격 정책</span>
                        </h2>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        성원식자재는 매입가와 마진을 100% 공개합니다. <br />
                        더 이상 가격 때문에 의심하지 마세요.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto mb-20">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative">
                        {/* Step 1: Auction Price */}
                        <div ref={el => { stepsRef.current[0] = el }} className="w-full md:w-1/4 bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center relative z-10">
                            <div className="text-4xl mb-4">🥬</div>
                            <h3 className="text-lg font-bold text-gray-700 mb-2">가락시장 경매가</h3>
                            <p className="text-sm text-gray-500">매일 아침 낙찰받은<br />실제 매입 가격</p>
                        </div>

                        {/* Plus Icon */}
                        <div ref={el => { stepsRef.current[1] = el }} className="text-2xl text-gray-400 font-bold">+</div>

                        {/* Step 2: Transport & Handling */}
                        <div ref={el => { stepsRef.current[2] = el }} className="w-full md:w-1/4 bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center relative z-10">
                            <div className="text-4xl mb-4">🚛</div>
                            <h3 className="text-lg font-bold text-gray-700 mb-2">물류/운송비</h3>
                            <p className="text-sm text-gray-500">최소한의 실비만<br />청구합니다</p>
                        </div>

                        {/* Plus Icon */}
                        <div ref={el => { stepsRef.current[3] = el }} className="text-2xl text-gray-400 font-bold">+</div>

                        {/* Step 3: Fixed Margin */}
                        <div ref={el => { stepsRef.current[4] = el }} className="w-full md:w-1/4 bg-brand-yellow/10 p-6 rounded-2xl border border-brand-yellow/30 text-center relative z-10 ring-2 ring-brand-yellow/50">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="text-lg font-bold text-brand-emerald-900 mb-2">고정 마진</h3>
                            <p className="text-sm text-brand-emerald-800">사전 협의된<br />고정 수수료</p>
                        </div>

                        {/* Equals Icon */}
                        <div ref={el => { stepsRef.current[5] = el }} className="text-2xl text-gray-400 font-bold">=</div>

                        {/* Result: Supply Price */}
                        <div ref={el => { stepsRef.current[6] = el }} className="w-full md:w-1/4 bg-brand-emerald-900 p-8 rounded-2xl text-center relative z-10 shadow-xl transform scale-105">
                            <div className="text-4xl mb-4">💰</div>
                            <h3 className="text-xl font-bold text-white mb-2">최종 납품가</h3>
                            <p className="text-sm text-brand-emerald-200">거품 없는<br />정직한 가격</p>
                        </div>
                    </div>
                </div>

                <p className="text-gray-500 max-w-2xl mx-auto mb-12 text-center">
                    성원식자재는 매주 주요 품목의 매입가를 투명하게 공개합니다.<br />
                    파트너사로 등록하시면 전체 품목의 단가표를 확인하실 수 있습니다.
                </p>

                {/* Blurred Teaser */}
                <div className="max-w-3xl mx-auto mb-12 relative overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                        <span className="font-bold text-gray-700">2024년 11월 4주차 매입가 (샘플)</span>
                        <span className="text-xs text-gray-400">단위: 원/kg</span>
                    </div>
                    <div className="p-6 bg-white relative">
                        {/* Fake Data Rows */}
                        <div className="space-y-4 filter blur-sm select-none opacity-60">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-2">
                                    <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                                    <div className="w-1/4 h-4 bg-gray-100 rounded"></div>
                                    <div className="w-1/4 h-4 bg-brand-emerald-100 rounded"></div>
                                </div>
                            ))}
                        </div>

                        {/* Overlay Lock */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/30 backdrop-blur-[2px]">
                            <div className="bg-white p-4 rounded-full shadow-lg mb-3">
                                <Lock className="w-6 h-6 text-brand-emerald-600" />
                            </div>
                            <p className="font-bold text-gray-900">로그인 후 전체 가격을 확인하세요</p>
                            <p className="text-sm text-brand-emerald-600 font-medium mt-1">평균 시장가 대비 15% 절감</p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-900 text-white font-bold rounded-lg hover:bg-emerald-800 transition-all duration-300 shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-1"
                    >
                        <span>금주 매입가표 요청하기</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                    <p className="mt-4 text-sm text-gray-400">
                        * 사업자 인증 후 전체 단가표를 보내드립니다.
                    </p>
                </div>
            </div>

            {/* Request Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-fadeIn">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">매입가표 요청</h3>
                        <p className="text-gray-500 mb-6">
                            신청해 주시면 담당자가 확인 후<br />
                            최신 단가표를 문자로 보내드립니다.
                        </p>

                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const data = {
                                    name: formData.get('name'),
                                    phone: formData.get('phone'),
                                    businessName: formData.get('businessName'),
                                };

                                try {
                                    const res = await fetch('/api/inquiry/pricing', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(data),
                                    });

                                    if (res.ok) {
                                        alert('요청이 완료되었습니다. 곧 연락드리겠습니다.');
                                        setIsModalOpen(false);
                                    } else {
                                        alert('요청 중 오류가 발생했습니다.');
                                    }
                                } catch (error) {
                                    console.error('Error:', error);
                                    alert('오류가 발생했습니다.');
                                }
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">업체명 (상호)</label>
                                <input
                                    type="text"
                                    name="businessName"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-emerald-500 outline-none"
                                    placeholder="예: 성원식당"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">담당자 성함</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-emerald-500 outline-none"
                                    placeholder="홍길동"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">연락처</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-emerald-500 outline-none"
                                    placeholder="010-0000-0000"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-brand-emerald text-white font-bold rounded-lg hover:bg-brand-emerald-700 transition-colors"
                            >
                                단가표 받기
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
