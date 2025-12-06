'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteHeader from '@/components/SiteHeader';
import PremiumTimeline from '@/components/PremiumTimeline';
import { Check, Clock, Truck, TrendingUp, Users, Shield, MapPin, Thermometer, Package, Phone, MessageCircle, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CompanyPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray<HTMLElement>('.animate-section');

        sections.forEach((section) => {
            gsap.from(section.querySelectorAll('.animate-up'), {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                },
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });
        });

    }, { scope: containerRef });

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
            <SiteHeader />
            <main ref={containerRef} className="flex-grow pt-16">

                {/* 1. Hero Section */}
                <section className="relative py-24 bg-brand-emerald-900 text-white overflow-hidden animate-section">
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src="/images/hero_warehouse.png"
                            alt="Background"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="animate-up text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                20년 업력의 식자재 전문 유통 기업,<br />
                                <span className="text-brand-yellow">성원식자재</span>
                            </h1>
                            <p className="animate-up text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed">
                                우리는 “식자재를 파는 회사”가 아니라<br className="hidden md:block" />
                                사장님의 <span className="font-bold text-white">원가와 시간을 지키는 식자재 운영 파트너</span>입니다.
                            </p>

                            {/* Values Grid */}
                            <div className="animate-up grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 text-left">
                                {[
                                    "20년 업력", "매입가 공개 + 고정 마진", "가락시장 직접 사입",
                                    "주 6회 새벽배송", "종합식자재 원스톱 공급", "누적 3000+ 파트너 기업"
                                ].map((val, idx) => (
                                    <div key={idx} className="bg-brand-emerald-800/80 backdrop-blur-md p-4 rounded-lg border border-brand-emerald-700 flex items-center gap-3 shadow-lg hover:bg-brand-emerald-700/80 transition-colors">
                                        <Check className="text-brand-yellow shrink-0" size={20} />
                                        <span className="font-medium text-white">{val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Brand Story */}
                <section className="py-24 bg-white animate-section">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <span className="text-brand-emerald-600 font-bold tracking-wider uppercase mb-4 block animate-up">Brand Story</span>
                            <h2 className="animate-up text-3xl md:text-4xl font-bold mb-8">
                                정직함, 단 하나로 시작했습니다.
                            </h2>
                            <div className="animate-up space-y-6 text-lg text-gray-600 leading-relaxed text-left md:text-center">
                                <p>
                                    2003년, 경기도 의정부. 작은 10평 창고에서 시작했습니다.<br />
                                    새벽마다 가락시장을 직접 다니며 좋은 품질의 재료만 골라오려는<br />
                                    한 사람의 진심이 성원식자재의 시작이었습니다.
                                </p>
                                <p className="font-bold text-brand-emerald-600 text-2xl py-4">
                                    “좋은 재료는 반드시 ‘보는 사람’이 정한다.”
                                </p>
                                <p>
                                    우리는 거래처가 늘어도 사입을 외주로 넘기지 않았고,<br />
                                    더 싸게 보이기 위해 품질을 속이지도 않았습니다.
                                </p>
                                <p>
                                    이 단단한 원칙 덕분에 성원식자재는<br />
                                    학교·관공서·프랜차이즈·로컬 맛집까지<br />
                                    연간 수백 곳의 고객사가 선택하는 회사로 성장했습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. History - Premium Timeline */}
                <PremiumTimeline />

                {/* 4. Philosophy */}
                <section className="py-24 bg-white animate-section relative">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-brand-emerald-600 font-bold tracking-wider uppercase mb-4 block animate-up">Our Philosophy</span>
                            <h2 className="animate-up text-3xl md:text-4xl font-bold mb-6">
                                식자재 유통의 본질은<br />
                                ‘정직·투명·일관성’입니다.
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
                            {[
                                {
                                    icon: <Shield className="w-12 h-12 text-brand-emerald-600" />,
                                    title: "정직한 사입 원칙",
                                    desc: "사진으로 품질을 판단하지 않습니다. 매일 새벽 가락시장에 직접 방문해 실물 상태로 평가합니다. ‘오늘 괜찮은 재료’를 구분하는 감각은 대체될 수 없습니다."
                                },
                                {
                                    icon: <TrendingUp className="w-12 h-12 text-brand-emerald-600" />,
                                    title: "투명한 단가 구조",
                                    desc: "모든 품목은 매입가 + 고정마진으로 책정합니다. 말로만 싸게 보이는 가격을 만들지 않습니다. 정산 방식·납기·마진 등 모든 과정이 투명합니다."
                                },
                                {
                                    icon: <Users className="w-12 h-12 text-brand-emerald-600" />,
                                    title: "고객사 재구매율 중심",
                                    desc: "장기 파트너십을 위해 무리한 단가 경쟁을 하지 않습니다. 문제 발생 시 책임지고 해결하며, 고객사 평균 거래 기간 12.4년을 유지합니다."
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="animate-up bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:border-brand-emerald-200 transition-all group">
                                    <div className="mb-6 bg-brand-emerald-50 w-20 h-20 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-gray-900">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Core Competencies */}
                <section className="py-24 bg-brand-emerald-900 text-white animate-section relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <Image
                            src="/images/fresh_vegetables.png"
                            alt="Fresh Vegetables"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="animate-up text-3xl md:text-4xl font-bold mb-6">
                                우리는 “배송하는 회사”가 아니라<br />
                                사장님의 식자재 운영을 관리하는 회사입니다.
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {[
                                {
                                    title: "가락시장 직매입 5년 (유통 20년)",
                                    items: ["20년간 쌓아온 품목별 시세·품질 패턴 데이터", "가격 변동성 높은 농산품은 ‘사입자의 경험’이 품질 결정", "다년간의 거래로 특정 도매상·산지 라인 확보"]
                                },
                                {
                                    title: "안정적인 물류 체계",
                                    items: ["60평 창고에서 야채/건식/냉장/냉동 완전 분리 운영", "새벽배송 동선 최적화 (누락률 2% 미만)", "냉장·냉동 온도 Log 관리"]
                                },
                                {
                                    title: "종합식자재 원스톱 공급",
                                    items: ["농산물, 공산품, 냉장·냉동, 소스, 부자재까지", "식당 운영에 필요한 95% 품목 단일 공급", "발주·정산·배송 통합으로 운영 효율 상승"]
                                },
                                {
                                    title: "업종별 맞춤 운영 노하우",
                                    items: ["학교: 규격·원산지·위생 인증 중심", "프랜차이즈: 표준화·유지율·정시성 중심", "식당: 신선도·속도·가격 안정성 중심"]
                                }
                            ].map((card, idx) => (
                                <div key={idx} className="animate-up bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors shadow-lg">
                                    <h3 className="text-2xl font-bold mb-6 text-brand-yellow">{card.title}</h3>
                                    <ul className="space-y-3">
                                        {card.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-100">
                                                <Check className="w-5 h-5 text-brand-emerald-400 shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Process */}
                <section className="py-24 bg-white animate-section">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-brand-emerald-600 font-bold tracking-wider uppercase mb-4 block animate-up">Direct Sourcing Process</span>
                            <h2 className="animate-up text-3xl md:text-4xl font-bold mb-6">
                                “신선도는 시스템보다 사람이 만듭니다.”
                            </h2>
                            <p className="animate-up text-xl text-gray-600 max-w-3xl mx-auto">
                                좋은 재료는 운송·보관 이전에 ‘사입 단계에서 이미 80%가 결정’됩니다.<br />
                                성원식자재는 매일 새벽, 이 모든 과정을 반복합니다.
                            </p>
                        </div>

                        <div className="max-w-5xl mx-auto">
                            <div className="grid md:grid-cols-6 gap-4">
                                {[
                                    { time: "20:00", title: "주문 마감", icon: <Clock /> },
                                    { time: "22:00", title: "목록 구성", icon: <FileText /> },
                                    { time: "02:00", title: "시장 입찰", icon: <MapPin /> },
                                    { time: "03:00", title: "육안 검수", icon: <Check /> },
                                    { time: "04:30", title: "분류/상차", icon: <Package /> },
                                    { time: "09:00", title: "배송 완료", icon: <Truck /> },
                                ].map((step, idx) => (
                                    <div key={idx} className="animate-up relative flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl hover:bg-brand-emerald-50 transition-colors group">
                                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md text-brand-emerald-600 mb-4 group-hover:scale-110 transition-transform border border-gray-100">
                                            {step.icon}
                                        </div>
                                        <span className="text-brand-emerald-700 font-bold mb-1 block">{step.time}</span>
                                        <span className="font-bold text-gray-900">{step.title}</span>
                                        {idx !== 5 && (
                                            <div className="hidden md:block absolute top-11 -right-2 w-4 h-0.5 bg-gray-300"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. Infrastructure & Metrics */}
                <section className="py-24 bg-gray-50 animate-section">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-16">
                            {/* Infrastructure */}
                            <div className="animate-up">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <Thermometer className="text-brand-emerald-600" />
                                    운영 인프라
                                </h3>
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6">
                                    <p className="text-lg font-medium text-gray-900 mb-4">
                                        “안정성은 시스템에서 나옵니다.”
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "60평 규모 창고 (야채·공산품·냉장고 완전 분리)",
                                            "신선도 유지 냉장/냉동 설비 운영",
                                            "차량 적재 동선 최적화",
                                            "누락 방지 프로세스 (체크리스트 기반)",
                                            "긴급 발주 대응 시스템 확보"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-600">
                                                <div className="w-2 h-2 bg-brand-emerald-500 rounded-full"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Metrics */}
                            <div className="animate-up">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <TrendingUp className="text-brand-emerald-600" />
                                    신뢰의 증명
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: "누적 거래처", value: "3000+" },
                                        { label: "정시 배송률", value: "98%" },
                                        { label: "재주문율", value: "93%+" },
                                        { label: "평균 거래기간", value: "12.4년" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center hover:-translate-y-1 transition-transform">
                                            <div className="text-4xl font-bold text-brand-emerald-600 mb-2">{stat.value}</div>
                                            <div className="text-gray-500 font-medium">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. Team */}
                <section className="py-24 bg-white animate-section relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="animate-up text-3xl md:text-4xl font-bold mb-6">믿음을 주는 사람들</h2>
                            <p className="animate-up text-gray-600">성원식자재는 크지 않지만, 책임 있는 팀으로 운영됩니다.</p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {[
                                { role: "대표 / Founder", name: "김OO", quote: "품질만큼은 타협하지 않습니다." },
                                { role: "사입 Buyer", name: "박OO", quote: "좋은 재료를 고르는 건 경험입니다." },
                                { role: "물류·배송", name: "최OO", quote: "배송의 1% 차이가 하루의 차이입니다." },
                                { role: "고객 관리", name: "정OO", quote: "문제 생기면 책임지고 해결합니다." },
                            ].map((member, idx) => (
                                <div key={idx} className="animate-up bg-white p-8 rounded-2xl text-center shadow-xl border border-gray-100 hover:border-brand-emerald-200 hover:-translate-y-2 transition-all">
                                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden relative">
                                        <Image
                                            src="/images/team_meeting.png"
                                            alt="Team Member"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="text-brand-emerald-600 font-bold text-sm mb-2 uppercase tracking-wide">{member.role}</div>
                                    <div className="font-bold text-2xl mb-4 text-gray-900">{member.name}</div>
                                    <p className="text-gray-600 text-sm italic leading-relaxed">"{member.quote}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 9. Mission & Vision */}
                <section className="py-24 bg-brand-emerald-50 animate-section">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="animate-up text-3xl font-bold mb-12">우리가 바라보는 다음 10년</h2>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="animate-up bg-white p-10 rounded-3xl shadow-lg border border-brand-emerald-100">
                                <h3 className="text-2xl font-bold text-brand-emerald-800 mb-6">MISSION</h3>
                                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                                    "좋은 식재료를 정직하게 공급함으로써<br />
                                    사장님의 하루를 더 안전하게 만든다."
                                </p>
                            </div>
                            <div className="animate-up bg-white p-10 rounded-3xl shadow-lg border border-brand-emerald-100">
                                <h3 className="text-2xl font-bold text-brand-emerald-800 mb-6">VISION</h3>
                                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                                    식자재 유통의<br />
                                    ‘신뢰 기준’을 만드는 기업
                                </p>
                            </div>
                        </div>

                        <div className="animate-up mt-16 flex flex-wrap justify-center gap-4">
                            {["정직", "투명", "신선", "응답", "데이터", "파트너십"].map((val, i) => (
                                <span key={i} className="px-6 py-3 bg-white rounded-full text-brand-emerald-700 font-bold shadow-md border border-brand-emerald-100 hover:scale-105 transition-transform cursor-default">
                                    #{val}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 10. CTA */}
                <section className="py-24 bg-brand-emerald-900 text-white text-center animate-section">
                    <div className="container mx-auto px-4">
                        <h2 className="animate-up text-3xl md:text-5xl font-bold mb-8">
                            사장님, 이제 믿고 맡기세요.
                        </h2>
                        <p className="animate-up text-xl text-brand-emerald-100 mb-12">
                            원가·품질·배송 스트레스, 성원식자재가 해결해드립니다.
                        </p>

                        <div className="animate-up flex flex-col md:flex-row justify-center gap-4 md:gap-6">
                            <a
                                href="tel:010-8215-6737"
                                className="flex items-center justify-center gap-3 bg-white text-brand-emerald-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                            >
                                <Phone size={24} />
                                전화 상담
                            </a>
                            <a
                                href="#"
                                className="flex items-center justify-center gap-3 bg-brand-yellow text-brand-emerald-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-xl"
                            >
                                <MessageCircle size={24} />
                                카카오톡 상담
                            </a>
                            <a
                                href="/diagnosis"
                                className="flex items-center justify-center gap-3 bg-brand-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-emerald-600 transition-colors border border-brand-emerald-600 shadow-lg hover:shadow-xl"
                            >
                                <FileText size={24} />
                                무료 견적 요청
                            </a>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
