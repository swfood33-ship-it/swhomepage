'use client';

import SiteHeader from '@/components/SiteHeader';
import FloatingCTA from '@/components/FloatingCTA';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export default function CasesPage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-brand-emerald-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/hero_slide_3.jpg')] bg-cover bg-center opacity-20"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-yellow/20 text-brand-yellow font-bold mb-4 border border-brand-yellow/30">
                        Success Stories
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        성공하는 사장님들의<br />
                        <span className="text-brand-yellow">비밀 파트너</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        비용 절감부터 운영 효율화까지,<br />
                        성원식자재와 함께 성장한 고객님들의 이야기입니다.
                    </p>
                </div>
            </section>

            {/* Case Studies List */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid gap-12">

                        {/* Case 1: Franchise */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row group hover:shadow-2xl transition-shadow duration-300">
                            <div className="md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden">
                                <div className="absolute inset-0 bg-brand-emerald-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                {/* Placeholder for Case Image - using a colored div for now */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400">
                                    <span className="text-lg">프랜차이즈 매장 이미지</span>
                                </div>
                            </div>
                            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-brand-emerald-600 font-bold mb-4">
                                    <TrendingUp size={20} />
                                    <span>비용 절감 사례</span>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                    "월 식자재 비용이 <span className="text-brand-emerald-600">15%</span> 줄었습니다"
                                </h3>
                                <p className="text-xl font-medium text-gray-800 mb-2">A 프랜차이즈 (양주점)</p>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    기존에는 여러 도매상에서 따로 주문하느라 배송비와 관리 비용이 많이 들었습니다.
                                    성원식자재로 통합 발주를 시작한 후, 투명한 원가 공개 정책 덕분에 매입 단가를 확실히 낮출 수 있었습니다.
                                    특히 공산품과 야채를 한 번에 받으니 재고 관리도 훨씬 수월해졌습니다.
                                </p>
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-1">월 절감액</p>
                                        <p className="text-2xl font-bold text-brand-emerald-600">약 150만원</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-1">배송 횟수</p>
                                        <p className="text-2xl font-bold text-brand-emerald-600">주 6회 (새벽)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Case 2: School */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row-reverse group hover:shadow-2xl transition-shadow duration-300">
                            <div className="md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden">
                                <div className="absolute inset-0 bg-brand-emerald-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-bl from-gray-200 to-gray-300 flex items-center justify-center text-gray-400">
                                    <span className="text-lg">학교 급식실 이미지</span>
                                </div>
                            </div>
                            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-brand-emerald-600 font-bold mb-4">
                                    <Clock size={20} />
                                    <span>정시 배송 사례</span>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                    "새벽 5시, 약속된 시간에 정확히 도착합니다"
                                </h3>
                                <p className="text-xl font-medium text-gray-800 mb-2">B 초등학교 (의정부)</p>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    학교 급식은 시간이 생명입니다. 조금만 늦어도 조리 전체 일정에 차질이 생기죠.
                                    성원식자재는 지난 3년간 단 한 번의 지연 없이 약속된 새벽 시간에 정확히 배송해 주셨습니다.
                                    검수 과정에서도 클레임이 거의 없을 정도로 품질이 일정합니다.
                                </p>
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-1">정시 도착률</p>
                                        <p className="text-2xl font-bold text-brand-emerald-600">99.9%</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-1">클레임 발생률</p>
                                        <p className="text-2xl font-bold text-brand-emerald-600">0.1% 미만</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Case 3: Restaurant */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row group hover:shadow-2xl transition-shadow duration-300">
                            <div className="md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden">
                                <div className="absolute inset-0 bg-brand-emerald-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400">
                                    <span className="text-lg">레스토랑 주방 이미지</span>
                                </div>
                            </div>
                            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-brand-emerald-600 font-bold mb-4">
                                    <CheckCircle size={20} />
                                    <span>맞춤형 서비스 사례</span>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                    "급하게 필요한 재료도 바로 해결해주셨어요"
                                </h3>
                                <p className="text-xl font-medium text-gray-800 mb-2">C 이탈리안 레스토랑 (포천)</p>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    주말 저녁 예약이 갑자기 몰려 샐러드 야채가 동난 적이 있었습니다.
                                    담당 매니저님께 연락드렸더니, 1시간 만에 긴급 배송을 해주셔서 위기를 넘길 수 있었죠.
                                    대형 플랫폼에서는 상상도 할 수 없는 1:1 케어 서비스에 감동했습니다.
                                </p>
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-1">담당자 배정</p>
                                        <p className="text-2xl font-bold text-brand-emerald-600">전담 매니저</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-1">긴급 대응</p>
                                        <p className="text-2xl font-bold text-brand-emerald-600">즉시 가능</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white text-center border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        다음 성공 사례의 주인공은<br />
                        바로 <span className="text-brand-emerald-600">사장님</span>입니다
                    </h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                        성원식자재는 단순한 납품업체가 아닙니다.<br />
                        사장님의 사업 성공을 돕는 든든한 비즈니스 파트너가 되겠습니다.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-emerald-600 text-white font-bold rounded-xl hover:bg-brand-emerald-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
                    >
                        무료 견적 상담 신청하기
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            <FloatingCTA />
        </main>
    );
}
