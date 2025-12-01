'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Link from 'next/link';
import GuideSlider from '@/components/GuideSlider';

export default function GuidePage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.animate-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
            .from('.animate-section', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            }, '-=0.5');

    }, { scope: containerRef });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <SiteHeader />
            <main ref={containerRef} className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="animate-title text-4xl md:text-5xl font-bold mb-6">
                            성원식자재 <span className="text-brand-yellow">이용 가이드</span>
                        </h1>
                        <p className="animate-title text-xl text-gray-300 max-w-2xl mx-auto">
                            홈페이지의 스마트한 기능부터 실제 거래 절차까지,<br />
                            사장님의 성공적인 비즈니스를 위해 자세히 안내해 드립니다.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-16 space-y-24">
                    {/* Section 1: Website Features */}
                    <section className="animate-section">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                            홈페이지 200% 활용하기
                        </h2>

                        <div className="space-y-20 mb-24">
                            {/* Feature 1: Price Disclosure */}
                            <div>
                                <div className="text-center mb-8">
                                    <div className="inline-block px-4 py-1 rounded-full bg-brand-emerald-100 text-brand-emerald-700 font-bold text-sm mb-4">
                                        기능 01
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">투명한 매입가 공개</h3>
                                    <p className="text-gray-600 mt-2">
                                        가락시장 직매입 원가를 투명하게 공개합니다.
                                    </p>
                                </div>
                                <GuideSlider
                                    steps={[
                                        {
                                            title: "로그인 및 인증",
                                            description: "상단 메뉴의 '매입가 공개'를 클릭하고 사업자 번호로 로그인하세요. (초기 비밀번호: 1234)",
                                            image: "/images/guide/pricing_step_1.png",
                                            alt: "매입가 공개 로그인 화면"
                                        },
                                        {
                                            title: "단가표 확인",
                                            description: "로그인 후 일별 업데이트되는 품목별 상세 단가표(Excel)를 바로 확인하실 수 있습니다.",
                                            image: "/images/guide/pricing_step_2.png",
                                            alt: "매입가 공개 엑셀 화면"
                                        }
                                    ]}
                                />
                                <div className="text-center mt-8">
                                    <Link href="/pricing" className="inline-block px-8 py-3 bg-brand-emerald-600 text-white rounded-xl font-bold hover:bg-brand-emerald-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200">
                                        매입가 확인하러 가기 →
                                    </Link>
                                </div>
                            </div>

                            {/* Feature 2: Free Diagnosis */}
                            <div>
                                <div className="text-center mb-8">
                                    <div className="inline-block px-4 py-1 rounded-full bg-brand-yellow text-brand-emerald-900 font-bold text-sm mb-4">
                                        기능 02
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">무료 자가 진단</h3>
                                    <p className="text-gray-600 mt-2">
                                        영수증 사진만 있으면 AI가 3분 만에 분석해 드립니다.
                                    </p>
                                </div>
                                <GuideSlider
                                    steps={[
                                        {
                                            title: "영수증 업로드",
                                            description: "상단 메뉴의 '무료 자가 진단'을 클릭하고, 최근 거래 명세표(영수증) 사진을 3장 이상 업로드해주세요.",
                                            image: "/images/guide/diagnosis_step_1.png",
                                            alt: "자가 진단 업로드 화면"
                                        },
                                        {
                                            title: "분석 결과 확인",
                                            description: "AI가 분석한 사장님의 매입 경쟁력 점수와 절약 가능한 예상 금액을 확인하세요.",
                                            image: "/images/guide/diagnosis_step_2.png",
                                            alt: "자가 진단 결과 화면"
                                        }
                                    ]}
                                />
                                <div className="text-center mt-8">
                                    <Link href="/diagnosis" className="inline-block px-8 py-3 bg-brand-emerald-600 text-white rounded-xl font-bold hover:bg-brand-emerald-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200">
                                        무료 진단 하러 가기 →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Trading Process */}
                    <section className="animate-section">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                            거래 시작하기
                        </h2>
                        <div className="grid md:grid-cols-5 gap-6">
                            {[
                                { step: '01', title: '견적 문의', desc: '홈페이지 견적 문의 또는 전화(010-8215-6737)로 상담을 신청해주세요.', icon: '📞' },
                                { step: '02', title: '방문 상담', desc: '지역 전담 매니저가 사장님 매장을 방문하여 맞춤형 상담을 진행합니다.', icon: '🤝' },
                                { step: '03', title: '계약 체결', desc: '배송 요일, 결제 조건 등을 협의하고 정식 거래 계약을 체결합니다.', icon: '📝' },
                                { step: '04', title: '발주 시작', desc: '전용 카카오톡 채널이나 문자를 통해 간편하게 첫 주문을 넣습니다.', icon: '📱' },
                                { step: '05', title: '새벽 배송', desc: '주문 다음 날 아침 7시 전까지 매장 안 냉장고까지 신선하게 배송됩니다.', icon: '🚚' }
                            ].map((item, index) => (
                                <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow text-center group">
                                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                    <div className="text-brand-emerald-600 font-bold mb-2">STEP {item.step}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 text-sm break-keep leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <Link href="/#contact" className="inline-block px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl">
                                지금 바로 상담 신청하기
                            </Link>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}
