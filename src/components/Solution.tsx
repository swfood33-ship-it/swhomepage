'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Solution() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
            }
        });

        tl.from('.usage-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
            .from('.usage-step', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            }, '-=0.5');

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="solution" className="py-24 bg-gray-900 text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="usage-title text-3xl md:text-4xl font-bold mb-6">
                        성원식자재 <span className="text-brand-yellow">이용 방법</span>
                    </h2>
                    <p className="usage-title text-gray-300 max-w-2xl mx-auto text-lg">
                        스마트한 기능 활용부터 거래 시작까지, 사장님의 성공을 위한 가이드입니다.
                    </p>
                </div>

                {/* Part 1: Website Features */}
                <div className="mb-20">
                    <h3 className="usage-title text-2xl font-bold mb-10 text-center md:text-left border-l-4 border-brand-emerald-500 pl-4">
                        홈페이지 200% 활용하기
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="usage-step bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="text-brand-yellow font-bold text-xl mb-4">01. 매입가 공개 확인</div>
                            <p className="text-gray-300 mb-4">
                                가락시장 직매입 원가를 투명하게 공개합니다. 로그인 후 엑셀 파일로 상세 품목 단가를 확인하세요.
                            </p>
                            <a href="/pricing" className="text-brand-emerald-400 hover:text-brand-emerald-300 font-bold text-sm">매입가 보러가기 →</a>
                        </div>
                        <div className="usage-step bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="text-brand-yellow font-bold text-xl mb-4">02. 무료 자가 진단</div>
                            <p className="text-gray-300 mb-4">
                                현재 거래 명세표 사진만 있으면 AI가 적정 단가인지 분석해드립니다. 3분이면 충분합니다.
                            </p>
                            <a href="/diagnosis" className="text-brand-emerald-400 hover:text-brand-emerald-300 font-bold text-sm">진단 하러가기 →</a>
                        </div>
                    </div>
                </div>

                {/* Part 2: Trading Process */}
                <div>
                    <h3 className="usage-title text-2xl font-bold mb-10 text-center md:text-left border-l-4 border-brand-emerald-500 pl-4">
                        거래 시작하기
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10 transform -translate-y-1/2"></div>

                        {[
                            { step: '01', title: '견적 문의', desc: '홈페이지 또는 전화로 문의를 남겨주세요.' },
                            { step: '02', title: '방문 상담', desc: '전담 매니저가 매장을 방문하여 상세 상담을 진행합니다.' },
                            { step: '03', title: '계약 체결', desc: '배송 일정과 결제 조건을 협의하고 계약을 맺습니다.' },
                            { step: '04', title: '발주 시작', desc: '카카오톡이나 문자로 간편하게 첫 주문을 넣습니다.' },
                            { step: '05', title: '새벽 배송', desc: '다음 날 아침, 신선한 식자재가 매장 앞에 도착합니다.' }
                        ].map((item, index) => (
                            <div key={index} className="usage-step bg-gray-800 p-6 rounded-xl text-center relative z-10 border border-gray-700 h-full flex flex-col justify-center hover:transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                                <div className="w-10 h-10 bg-brand-emerald-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4 shadow-lg shadow-brand-emerald-900/50">
                                    {item.step}
                                </div>
                                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                <p className="text-sm text-gray-400 break-keep">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
