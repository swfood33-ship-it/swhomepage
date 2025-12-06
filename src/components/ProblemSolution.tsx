'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coins, Leaf, Truck, MessageCircle, Package, Headset, Phone, ArrowRight } from 'lucide-react';
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

// --- Data: Exact Copy from Prompt ---
const painPoints = [
    {
        icon: <Coins className="w-6 h-6" />,
        title: "믿기 어려운 단가",
        problem: "같은 제품인데 거래처마다 가격이 제각각이고, 왜 이 금액인지 설명을 들을 수 없어 늘 비교해야 합니다.",
        solutionBadge: "투명한 원가 공개 시스템",
        solution: "전 품목의 실제 매입가와 고정 마진을 100% 공개합니다. 숨겨진 운송비나 수수료 없이, 오직 약속된 마진만 받습니다."
    },
    {
        icon: <Leaf className="w-6 h-6" />,
        title: "제각각인 품질/신선도",
        problem: "전화 주문으로는 품질을 볼 수 없고, 받는 날마다 편차가 커서 식재료 상태가 늘 불안합니다.",
        solutionBadge: "4시간 현장 사입 & 100% 교체",
        solution: "매일 밤 10시부터 새벽 2시까지 가락시장에서 모든 농산물을 직접 눈으로 보고 고릅니다. 마음에 들지 않으면 단순 변심도 즉시 교체해드립니다."
    },
    {
        icon: <Truck className="w-6 h-6" />,
        title: "답답한 배송·응대",
        problem: "배송이 늦거나 연락이 잘 안 되고, 바쁜 점심시간에 재료가 없어 곤란했던 경험이 많습니다.",
        solutionBadge: "주 6회 정시 새벽 배송",
        solution: "가게별 전담 매니저가 배정되어 즉시 응답하며, 오배송이나 누락 발생 시 즉각 재배송합니다."
    },
    {
        icon: <MessageCircle className="w-6 h-6" />,
        title: "복잡한 발주/정산",
        problem: "앱 주문은 불편하게 느껴지고, 월말이면 영수증과 내역이 맞지 않아 정산 스트레스가 큽니다.",
        solutionBadge: "편한 발주 & 자동 정산",
        solution: "문자·카톡·전화 등 가장 편한 방식 그대로 주문하세요. ERP 시스템이 자동으로 기록하며 월말 1원 단위까지 정확한 내역을 제공합니다."
    },
    {
        icon: <Package className="w-6 h-6" />,
        title: "재고 관리 스트레스",
        problem: "조금 필요할 때도 박스 단위로만 팔아 버리는 게 많고, 갑자기 재료가 떨어지면 난감합니다.",
        solutionBadge: "최소 주문량 0 & 소분 공급",
        solution: "필요한 만큼만 주문하세요. 최소 주문 금액이나 수량 제한이 없습니다. 대파 한 단, 양파 한 망도 정성껏 배송합니다."
    },
    {
        icon: <Headset className="w-6 h-6" />,
        title: "소통 부재",
        problem: "문제가 생겨도 담당자가 누군지 모르고, 고객센터는 연결도 어려워 답답합니다.",
        solutionBadge: "1:1 전담 매니저 케어",
        solution: "사장님 전담 매니저가 배정되어 식자재 고민을 함께 해결합니다. 단순 납품을 넘어 운영의 파트너가 되어드립니다."
    }
];

function PainPointCard({ item }: { item: typeof painPoints[0] }) {
    return (
        <div className="pain-point-card group bg-white rounded-[24px] p-8 shadow-[0_6px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.10)] transition-all duration-300 ease-out hover:-translate-y-1 border border-gray-100 flex flex-col h-full">
            {/* Header: Icon + Title */}
            <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[rgba(14,143,91,0.12)] text-[#0E8F5B] flex items-center justify-center shadow-sm">
                    {item.icon}
                </div>
                <h3 className="text-[20px] font-semibold text-gray-900 leading-tight pt-2 break-keep">
                    {item.title}
                </h3>
            </div>

            {/* Problem Description (Tightened Spacing) */}
            <p className="text-[15px] text-gray-600 leading-normal mb-4 pl-1">
                {item.problem}
            </p>

            {/* Mandatory Divider */}
            <div className="border-b border-gray-200/60 w-full mb-5"></div>

            {/* Solution Section */}
            <div className="pl-1">
                <div className="uppercase tracking-wide text-[11px] font-semibold text-[#0E8F5B] mb-2">
                    {item.solutionBadge}
                </div>
                <p className="text-[15px] text-gray-800 leading-normal font-medium break-keep">
                    {item.solution}
                </p>
            </div>
        </div>
    );
}

export default function WhyUsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lenis = useLenis();

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            lenis?.scrollTo(contactSection);
        }
    };

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.pain-point-card');

        gsap.fromTo(cards,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                }
            }
        );

        gsap.fromTo('.header-animate',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                }
            }
        );

        gsap.fromTo('.cta-animate',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.cta-container',
                    start: 'top 90%',
                }
            }
        );

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative py-24 md:py-32 bg-[#F6FAF8] overflow-hidden"
        >
            {/* Radial Soft Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(14,143,91,0.08)_0%,rgba(255,255,255,0)_60%)] opacity-70"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">

                {/* 1. Header Section */}
                <div className="text-center mb-20 max-w-[800px] mx-auto">
                    <span className="header-animate inline-block text-[#0E8F5B] text-[12px] font-bold tracking-wider mb-6 uppercase bg-[rgba(14,143,91,0.1)] px-3 py-1 rounded-full">
                        WHY SUNGWON?
                    </span>
                    <h2 className="header-animate text-[36px] md:text-[42px] font-bold text-[#0B0B0B] mb-8 leading-[1.1] tracking-tight">
                        식당 운영을 흔드는 모든 문제.<br />
                        성원식자재는 <span className="text-[#0E8F5B] relative inline-block">
                            ‘현장 중심 시스템’
                            <span className="absolute bottom-2 left-0 w-full h-3 bg-[#0E8F5B]/10 -z-10"></span>
                        </span>으로<br className="hidden md:block" /> 완벽히 해결합니다.
                    </h2>
                    <p className="header-animate text-[16px] md:text-[18px] text-[#4A4A4A] leading-relaxed font-medium">
                        가게는 하루만 멈춰도 손해입니다. 겉으로 그럴듯한 말 대신, 실제로 매일 현장에서 검증된 방식으로 해결합니다.
                    </p>
                </div>

                {/* 2. Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-32">
                    {painPoints.map((item, idx) => (
                        <PainPointCard key={idx} item={item} />
                    ))}
                </div>

                {/* 3. CTA Section (Updated for Quote Consultation) */}
                <div className="cta-container cta-animate relative max-w-4xl mx-auto">
                    <div className="backdrop-blur-xl bg-white/90 rounded-[24px] p-10 md:p-14 text-center shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-white/50 relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#0E8F5B]/5 blur-[80px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#0B0B0B] mb-10 leading-snug">
                                우리 가게 상황 기준으로, 어떤 문제가 가장 급한지<br />
                                <span className="text-[#0E8F5B]">무료로 진단해드립니다.</span>
                            </h3>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a
                                    href="tel:010-8215-6737"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-[#4A4A4A] px-8 py-4 rounded-xl font-bold text-[16px] hover:bg-gray-50 transition-all border border-[rgba(0,0,0,0.08)] shadow-sm hover:shadow-md"
                                >
                                    <Phone className="w-5 h-5" />
                                    전화 바로 연결
                                </a>
                                <button
                                    onClick={scrollToContact}
                                    className="inline-flex items-center justify-center gap-2 bg-[#0E8F5B] text-white px-8 py-4 rounded-xl font-bold text-[16px] hover:bg-[#0B7A4D] transition-all shadow-[0_4px_14px_rgba(14,143,91,0.3)] hover:shadow-[0_6px_20px_rgba(14,143,91,0.4)] hover:-translate-y-0.5"
                                >
                                    무료 견적 상담 신청
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
