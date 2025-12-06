'use client';

import Link from 'next/link';
import { Building2, GraduationCap, ArrowRight } from 'lucide-react';

export default function IndustrySolutions() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-brand-emerald-600 font-bold tracking-wider uppercase text-sm mb-2 block">SOLUTIONS</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        업종별 <span className="text-brand-emerald-600">맞춤 솔루션</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        사장님의 업종에 딱 맞는 최적의 서비스를 제공합니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Franchise */}
                    <Link
                        href="/franchise"
                        className="group relative overflow-hidden rounded-3xl h-[400px] flex flex-col justify-end p-10 shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-[url('/images/hero_slide_4.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-brand-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Building2 size={28} />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-3">프랜차이즈</h3>
                            <p className="text-gray-200 mb-6 leading-relaxed max-w-md">
                                전 지점 맛의 통일과 통합 정산 시스템.<br />
                                50개 이상 브랜드가 선택한 물류 파트너입니다.
                            </p>
                            <div className="flex items-center text-brand-yellow font-bold group-hover:gap-3 gap-2 transition-all">
                                솔루션 자세히 보기
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* School */}
                    <Link
                        href="/school"
                        className="group relative overflow-hidden rounded-3xl h-[400px] flex flex-col justify-end p-10 shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-[url('/images/hero_slide_5.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-brand-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <GraduationCap size={28} />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-3">학교 · 관공서</h3>
                            <p className="text-gray-200 mb-6 leading-relaxed max-w-md">
                                HACCP 인증 시설과 엄격한 위생 관리.<br />
                                복잡한 행정 서류까지 완벽하게 지원합니다.
                            </p>
                            <div className="flex items-center text-brand-yellow font-bold group-hover:gap-3 gap-2 transition-all">
                                솔루션 자세히 보기
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
