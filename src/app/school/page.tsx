'use client';

import SiteHeader from '@/components/SiteHeader';
import FloatingCTA from '@/components/FloatingCTA';
import Link from 'next/link';
import { FileText, Clock, ShieldCheck, Truck } from 'lucide-react';

export default function SchoolPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-brand-emerald-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/hero_slide_5.jpg')] bg-cover bg-center opacity-20"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white font-bold mb-4 border border-white/20">
                        학교 · 관공서 · 병원
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        가장 <span className="text-brand-yellow">안전</span>하고<br />
                        <span className="text-brand-yellow">투명</span>한 식자재 공급
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        엄격한 위생 기준 준수, 복잡한 행정 서류 완벽 지원.<br />
                        영양사님의 업무 부담을 확실히 덜어드립니다.
                    </p>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-12 h-12 bg-brand-emerald-100 text-brand-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">HACCP 인증</h3>
                            <p className="text-gray-600">
                                HACCP 인증 물류센터와 냉동/냉장 차량으로 위생 안전을 100% 보장합니다.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-12 h-12 bg-brand-emerald-100 text-brand-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                <FileText size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">행정 서류 지원</h3>
                            <p className="text-gray-600">
                                견적서, 납품서, 거래명세서, 원산지 증명서 등 필요한 모든 서류를 신속하게 제공합니다.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-12 h-12 bg-brand-emerald-100 text-brand-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                <Clock size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">지정 시간 배송</h3>
                            <p className="text-gray-600">
                                조리 시작 전, 약속된 시간에 정확히 배송하여 급식 운영에 차질이 없도록 합니다.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-12 h-12 bg-brand-emerald-100 text-brand-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                <Truck size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">긴급 대응 시스템</h3>
                            <p className="text-gray-600">
                                오배송이나 긴급 추가 발주 발생 시, 전담 기사가 즉시 출동하여 해결합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">공공급식 납품 프로세스</h2>
                        <p className="text-gray-600">입찰부터 정산까지 체계적으로 관리합니다.</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                                <div className="w-10 h-10 bg-brand-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">1</div>
                                <h3 className="font-bold mb-2">입찰 및 계약</h3>
                                <p className="text-sm text-gray-600">eaT(학교급식지원센터) 및 나라장터 입찰 참여 및 계약 체결</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                                <div className="w-10 h-10 bg-brand-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">2</div>
                                <h3 className="font-bold mb-2">발주 접수</h3>
                                <p className="text-sm text-gray-600">나이스(NEIS) 시스템 또는 전용 발주망을 통한 주문 접수</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                                <div className="w-10 h-10 bg-brand-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">3</div>
                                <h3 className="font-bold mb-2">검수 및 배송</h3>
                                <p className="text-sm text-gray-600">콜드체인 차량 배송 및 영양사 입회 하 대면 검수 진행</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                                <div className="w-10 h-10 bg-brand-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">4</div>
                                <h3 className="font-bold mb-2">서류 및 정산</h3>
                                <p className="text-sm text-gray-600">납품 확인서 발급 및 월말 후불 정산 (카드/계좌이체)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                        까다로운 급식 기준,<br />
                        성원식자재가 완벽하게 맞춥니다
                    </h2>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link
                            href="/#contact"
                            className="px-8 py-4 bg-brand-emerald-600 text-white font-bold rounded-xl hover:bg-brand-emerald-700 transition-all shadow-lg"
                        >
                            납품 상담 신청
                        </Link>
                        <a
                            href="#"
                            className="px-8 py-4 bg-gray-100 text-gray-800 font-bold rounded-xl hover:bg-gray-200 transition-all"
                        >
                            사업자 등록증 다운로드
                        </a>
                    </div>
                </div>
            </section>

            <FloatingCTA />
        </main>
    );
}
