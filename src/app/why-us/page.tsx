'use client';

import SiteHeader from '@/components/SiteHeader';
import FloatingCTA from '@/components/FloatingCTA';
import Link from 'next/link';
import { Check, X, Minus } from 'lucide-react';

export default function WhyUsPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-brand-emerald-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/hero_slide_1.jpg')] bg-cover bg-center opacity-20"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        왜 <span className="text-brand-yellow">성원식자재</span>인가요?
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        가격은 투명하게, 배송은 확실하게.<br />
                        사장님의 성공을 위한 최적의 파트너십을 제안합니다.
                    </p>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900 mb-4">
                            비교할수록 답은 <span className="text-brand-emerald-600">성원</span>입니다
                        </h2>
                        <p className="text-gray-600">일반 도매상, 대형 플랫폼과 꼼꼼히 비교해보세요.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-6 px-4 text-left text-gray-500 font-medium w-1/4">구분</th>
                                    <th className="py-6 px-4 text-center text-gray-500 font-medium w-1/4">일반 도매상</th>
                                    <th className="py-6 px-4 text-center text-gray-500 font-medium w-1/4">대형 식자재 플랫폼</th>
                                    <th className="py-6 px-4 text-center text-brand-emerald-700 font-bold text-xl w-1/4 bg-brand-emerald-50 border-b-4 border-brand-emerald-500">
                                        성원식자재
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="py-6 px-6 font-bold text-gray-800">가격 투명성</td>
                                    <td className="py-6 px-4 text-center text-gray-600">불투명 (부르는 게 값)</td>
                                    <td className="py-6 px-4 text-center text-gray-600">공개 (수수료 포함)</td>
                                    <td className="py-6 px-4 text-center bg-brand-emerald-50 font-bold text-brand-emerald-700">
                                        100% 원가 공개<br />
                                        <span className="text-sm font-normal text-brand-emerald-600">(매입가 + 고정마진)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-6 px-6 font-bold text-gray-800">배송 품질</td>
                                    <td className="py-6 px-4 text-center text-gray-600">불규칙함</td>
                                    <td className="py-6 px-4 text-center text-gray-600">택배/새벽배송 혼재</td>
                                    <td className="py-6 px-4 text-center bg-brand-emerald-50 font-bold text-brand-emerald-700">
                                        전차량 콜드체인<br />
                                        <span className="text-sm font-normal text-brand-emerald-600">직영 기사 책임 배송</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-6 px-6 font-bold text-gray-800">담당자 케어</td>
                                    <td className="py-6 px-4 text-center text-gray-600">케이스 바이 케이스</td>
                                    <td className="py-6 px-4 text-center text-gray-600">없음 (고객센터 연결)</td>
                                    <td className="py-6 px-4 text-center bg-brand-emerald-50 font-bold text-brand-emerald-700">
                                        1:1 전담 매니저<br />
                                        <span className="text-sm font-normal text-brand-emerald-600">긴급 발주/반품 즉시 해결</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-6 px-6 font-bold text-gray-800">취급 품목</td>
                                    <td className="py-6 px-4 text-center text-gray-600">제한적</td>
                                    <td className="py-6 px-4 text-center text-gray-600">매우 다양함</td>
                                    <td className="py-6 px-4 text-center bg-brand-emerald-50 font-bold text-brand-emerald-700">
                                        원스톱 솔루션<br />
                                        <span className="text-sm font-normal text-brand-emerald-600">야채/공산/냉동/소모품</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-6 px-6 font-bold text-gray-800">반품/교환</td>
                                    <td className="py-6 px-4 text-center text-gray-600">어려움 (눈치 보임)</td>
                                    <td className="py-6 px-4 text-center text-gray-600">절차 복잡</td>
                                    <td className="py-6 px-4 text-center bg-brand-emerald-50 font-bold text-brand-emerald-700">
                                        100% 즉시 처리<br />
                                        <span className="text-sm font-normal text-brand-emerald-600">묻지도 따지지도 않음</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-shadow text-center group">
                            <div className="w-16 h-16 bg-brand-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-3xl">💰</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">압도적인 가격 경쟁력</h3>
                            <p className="text-gray-600 leading-relaxed">
                                가락시장 경매 직낙찰과 대량 매입을 통해<br />
                                유통 단계를 최소화했습니다.<br />
                                매주 공개되는 투명한 단가를 확인하세요.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-shadow text-center group">
                            <div className="w-16 h-16 bg-brand-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-3xl">🚛</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">완벽한 콜드체인</h3>
                            <p className="text-gray-600 leading-relaxed">
                                입고부터 배송까지 전 과정 냉장/냉동 시스템.<br />
                                고객님의 주방 냉장고까지<br />
                                신선함을 그대로 배달합니다.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-shadow text-center group">
                            <div className="w-16 h-16 bg-brand-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-3xl">🤝</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">든든한 파트너십</h3>
                            <p className="text-gray-600 leading-relaxed">
                                단순 납품을 넘어 메뉴 컨설팅,<br />
                                재고 관리 노하우까지 공유합니다.<br />
                                사장님의 성공이 곧 성원의 성공입니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-brand-emerald-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        지금 바로 성원식자재의<br />
                        <span className="text-brand-yellow">놀라운 경쟁력</span>을 경험하세요
                    </h2>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link
                            href="/#contact"
                            className="px-8 py-4 bg-brand-emerald-600 text-white font-bold rounded-xl hover:bg-brand-emerald-500 transition-all shadow-lg text-lg"
                        >
                            무료 견적 신청하기
                        </Link>
                        <Link
                            href="/pricing"
                            className="px-8 py-4 bg-white text-brand-emerald-900 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg text-lg"
                        >
                            이번 주 매입가 확인
                        </Link>
                    </div>
                </div>
            </section>

            <FloatingCTA />
        </main>
    );
}
