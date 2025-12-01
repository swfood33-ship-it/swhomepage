'use client';

import { ArrowRight, Phone, MessageCircle } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
            {/* Background Image/Video Placeholder */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
                {/* Ideally this would be a video or high-quality image of Garak Market */}
                <div
                    className="w-full h-full bg-cover bg-center opacity-60 scale-105 animate-slow-zoom"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop")' }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-20 text-center flex flex-col items-center">
                <span className="inline-block py-1 px-3 rounded-full bg-brand-emerald-500/20 border border-brand-emerald-500/50 text-brand-emerald-400 text-sm font-bold mb-6 backdrop-blur-sm">
                    경기북부 식자재 파트너
                </span>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
                    신선식재는 <span className="text-brand-emerald-500">직접 사입</span>으로,<br className="hidden md:block" />
                    단가는 <span className="text-brand-emerald-500">투명 공개</span>로.
                </h1>

                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                    매일 새벽 가락시장 직매입 · 실매입가 기반 고정마진<br />
                    야채·쌀·공산품·냉동/냉장까지 원스톱 공급하는<br className="hidden md:block" />
                    성원식자재입니다.
                </p>

                <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl justify-center">
                    <button className="flex-1 py-4 px-8 bg-brand-emerald-600 hover:bg-brand-emerald-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-brand-emerald-900/20 flex items-center justify-center gap-2 group">
                        무료 견적 요청
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex gap-4 flex-1">
                        <button className="flex-1 py-4 px-6 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            카카오 상담
                        </button>
                        <button className="flex-1 py-4 px-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                            <Phone className="w-5 h-5" />
                            전화 문의
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400">
                    <span className="text-xs uppercase tracking-widest mb-2 block">Scroll</span>
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-gray-400 rounded-full animate-scroll-down" />
                    </div>
                </div>
            </div>
        </section>
    );
}
