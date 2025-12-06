'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export default function WhyUsTeaser() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brand-emerald-600 font-bold tracking-wider uppercase text-sm mb-2 block">WHY SUNGWON?</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        왜 <span className="text-brand-emerald-600">성원식자재</span>인가요?
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        단순한 납품을 넘어 사장님의 성공을 돕는 든든한 파트너가 되겠습니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="group bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-brand-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <Check className="text-brand-emerald-600" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">100% 원가 공개</h3>
                        <p className="text-gray-600 leading-relaxed">
                            가락시장 경매가와 운송비, 마진까지 투명하게 공개하여 믿을 수 있습니다.
                        </p>
                    </div>

                    <div className="group bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-brand-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <Check className="text-brand-emerald-600" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">전차량 콜드체인</h3>
                        <p className="text-gray-600 leading-relaxed">
                            입고부터 배송까지 끊김 없는 냉장/냉동 시스템으로 최상의 신선도를 유지합니다.
                        </p>
                    </div>

                    <div className="group bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-brand-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <Check className="text-brand-emerald-600" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">1:1 전담 매니저</h3>
                        <p className="text-gray-600 leading-relaxed">
                            긴급 발주부터 클레임 처리까지, 전담 매니저가 즉각적으로 해결해 드립니다.
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        href="/why-us"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        상세 비교표 보기
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
