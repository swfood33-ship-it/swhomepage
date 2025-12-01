'use client';

import { CheckCircle, Truck, TrendingUp, Package, Clock } from 'lucide-react';

const features = [
    {
        icon: <CheckCircle className="w-8 h-8 text-brand-emerald-600" />,
        title: '직접 사입',
        desc: '매일 새벽 시장에서 상태·시세·품질 직접 확인'
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-brand-emerald-600" />,
        title: '투명 단가',
        desc: '실매입가 + 고정마진 → 숨김 없는 유통정책'
    },
    {
        icon: <Package className="w-8 h-8 text-brand-emerald-600" />,
        title: '원스톱 공급',
        desc: '야채·쌀·공산품·냉동/냉장까지 전 품목 통합 공급'
    },
    {
        icon: <Truck className="w-8 h-8 text-brand-emerald-600" />,
        title: '주 6회 배송',
        desc: '식자재 변동 없는 안정적인 운영 가능'
    },
    {
        icon: <Clock className="w-8 h-8 text-brand-emerald-600" />,
        title: '발주 최적화',
        desc: '사용량 기반 발주 제안 → 비용 절감'
    }
];

export default function USPCards() {
    return (
        <section id="service" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        왜 <span className="text-brand-emerald-600">성원식자재</span>인가요?
                    </h2>
                    <p className="text-gray-500">
                        경기북부 수백 매장이 선택한 이유는 '숨기지 않는 공급' 입니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 bg-brand-emerald-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed break-keep">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
