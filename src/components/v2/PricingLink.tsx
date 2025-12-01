'use client';

import { ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';

export default function PricingLink() {
    return (
        <section id="pricing" className="py-20 bg-gray-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="md:w-1/2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald-500/20 border border-brand-emerald-500/50 text-brand-emerald-400 text-sm font-bold mb-6">
                            <Lock className="w-4 h-4" />
                            업계 최초 투명 공개
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                            매입가를 공개하는<br />
                            <span className="text-brand-emerald-500">투명한 식자재</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            성원식자재는 실매입가에 고정 마진만을 더해 공급합니다.<br />
                            불투명한 가격 정책으로 인한 고민, 이제 끝내세요.
                        </p>
                        <Link
                            href="/pricing/login"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-emerald-600 hover:bg-brand-emerald-700 text-white rounded-xl font-bold text-lg transition-all"
                        >
                            매입가 확인하러 가기
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="md:w-1/2 relative">
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                                <span className="text-gray-400">품목</span>
                                <span className="text-gray-400">실매입가</span>
                                <span className="text-brand-emerald-400 font-bold">공급가 (마진포함)</span>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: '양파 (20kg)', price: '28,000원', supply: '30,800원' },
                                    { name: '대파 (1단)', price: '2,500원', supply: '2,750원' },
                                    { name: '계란 (특란/30구)', price: '6,200원', supply: '6,820원' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm md:text-base">
                                        <span className="font-medium">{item.name}</span>
                                        <span className="text-gray-400 line-through">{item.price}</span>
                                        <span className="text-brand-emerald-400 font-bold">{item.supply}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/10 text-center">
                                <p className="text-xs text-gray-500">
                                    * 위 가격은 예시이며, 실제 매입가는 매일 변동됩니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
