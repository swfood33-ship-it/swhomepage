'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: '결제는 외상(후불)이 가능한가요?',
        answer: '네, 가능합니다. 기본적으로 월 마감 후 익월 결제 방식을 지원하며, 사업자 신용도에 따라 협의하여 조정 가능합니다. 초기 거래 시에는 보증보험 가입이 필요할 수 있습니다.'
    },
    {
        question: '최소 주문 금액이 있나요?',
        answer: '서울/경기 지역 기준 최소 주문 금액은 15만원입니다. 그 외 지역이나 소량 주문의 경우 배송비가 발생할 수 있으니 고객센터로 문의 부탁드립니다.'
    },
    {
        question: '반품 및 교환 처리는 어떻게 되나요?',
        answer: '신선식품의 경우 배송 당일 오전 중으로 사진과 함께 접수해주시면 100% 교환/반품 처리해 드립니다. 공산품은 수령 후 7일 이내 접수 가능합니다.'
    },
    {
        question: '배송 가능 지역은 어디인가요?',
        answer: '현재 서울 전 지역, 경기(의정부, 양주, 구리, 남양주, 하남, 성남, 용인, 수원 등), 인천 일부 지역 직배송 가능합니다. 그 외 지역은 택배 발송 협의 가능합니다.'
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <p className="text-brand-emerald-600 text-sm font-bold tracking-widest uppercase mb-2">
                        FAQ
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        자주 묻는 <span className="text-brand-emerald-600">질문</span>
                    </h2>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-brand-emerald-200 bg-brand-emerald-50/30' : 'border-gray-100 bg-white hover:border-brand-emerald-100'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={`font-bold text-lg ${openIndex === index ? 'text-brand-emerald-700' : 'text-gray-800'}`}>
                                    Q. {faq.question}
                                </span>
                                <span className={`p-1 rounded-full ${openIndex === index ? 'bg-brand-emerald-100 text-brand-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-brand-emerald-100/50 mx-6 mt-2">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
