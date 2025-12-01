'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: '박철수 점주님',
        role: '프랜차이즈 고기집 운영 (서울)',
        content: '오픈 초기에는 직접 시장을 다녔는데, 성원을 만나고 나서 시간과 비용이 확 줄었습니다. 특히 월말에 정산서가 깔끔하게 나와서 세무 처리하기도 너무 편해요. 식자재 로스율도 10% 가까이 줄었습니다.',
        rating: 5,
        location: '서울 강동구'
    },
    {
        name: '이영희 영양사',
        role: 'OO초등학교 급식실',
        content: '아이들이 먹는 거라 위생과 신선도가 제일 중요한데, 성원은 검수 시스템이 정말 철저합니다. 새벽에 배송 오시는 기사님들도 항상 친절하시고, 냉장/냉동 온도 체크도 꼼꼼하게 해주셔서 믿음이 갑니다.',
        rating: 5,
        location: '경기 의정부시'
    },
    {
        name: '최민석 실장님',
        role: '대형 요양병원 구매팀',
        content: '매일 대량의 식자재가 필요한데, 물량 펑크 없이 안정적으로 공급해주는 곳은 성원뿐이었습니다. 긴급하게 추가 주문할 때도 최대한 맞춰주려고 노력해주시는 모습에 감동받았습니다.',
        rating: 5,
        location: '경기 양주시'
    }
];

export default function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);



    return (
        <section className="py-24 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <p className="text-brand-emerald-600 text-sm font-bold tracking-widest uppercase mb-2">
                        TESTIMONIALS
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        사장님들의 <span className="text-brand-emerald-600">생생한 후기</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        성원식자재와 함께 성공을 만들어가는 파트너들의 이야기입니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 p-8 rounded-2xl relative hover:shadow-lg hover:-translate-y-2 transition-all duration-300 border border-gray-100 group"
                        >
                            <Quote className="absolute top-8 right-8 text-brand-emerald-100 w-10 h-10 group-hover:text-brand-emerald-200 transition-colors" />

                            <div className="flex gap-1 mb-4 text-brand-yellow-400">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-gray-900 mb-6 leading-relaxed min-h-[80px]">
                                "{item.content}"
                            </p>

                            <div className="border-t border-gray-200 pt-6">
                                <p className="font-bold text-gray-900">{item.name}</p>
                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-sm text-brand-emerald-600 font-medium">{item.role}</p>
                                    <p className="text-xs text-gray-400">{item.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
