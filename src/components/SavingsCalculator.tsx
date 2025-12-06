'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Calculator, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function SavingsCalculator() {
    const [monthlySpend, setMonthlySpend] = useState(500); // Unit: 10,000 KRW
    const [savingsRate, setSavingsRate] = useState(15); // Default 15%
    const [businessType, setBusinessType] = useState('restaurant');

    const calculatedSavings = Math.floor(monthlySpend * (savingsRate / 100));
    const yearlySavings = calculatedSavings * 12;

    const handleTypeChange = (type: string) => {
        setBusinessType(type);
        if (type === 'franchise') setSavingsRate(18);
        else if (type === 'school') setSavingsRate(12);
        else setSavingsRate(15);
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-brand-emerald-900 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Calculator className="text-brand-yellow" size={24} />
                    <h3 className="text-xl font-bold">예상 절감액 계산기</h3>
                </div>
                <div className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full">
                    AI 데이터 기반
                </div>
            </div>

            <div className="p-8">
                {/* Business Type Selection */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-700 mb-3">업종을 선택해주세요</label>
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={() => handleTypeChange('restaurant')}
                            className={`py-3 rounded-xl font-medium transition-all ${businessType === 'restaurant' ? 'bg-brand-emerald-100 text-brand-emerald-800 border-2 border-brand-emerald-500' : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
                        >
                            일반 식당
                        </button>
                        <button
                            onClick={() => handleTypeChange('franchise')}
                            className={`py-3 rounded-xl font-medium transition-all ${businessType === 'franchise' ? 'bg-brand-emerald-100 text-brand-emerald-800 border-2 border-brand-emerald-500' : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
                        >
                            프랜차이즈
                        </button>
                        <button
                            onClick={() => handleTypeChange('school')}
                            className={`py-3 rounded-xl font-medium transition-all ${businessType === 'school' ? 'bg-brand-emerald-100 text-brand-emerald-800 border-2 border-brand-emerald-500' : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
                        >
                            학교/관공서
                        </button>
                    </div>
                </div>

                {/* Monthly Spend Input */}
                <div className="mb-10">
                    <div className="flex justify-between items-end mb-4">
                        <label className="block text-sm font-bold text-gray-700">월 평균 식자재 매입액</label>
                        <span className="text-2xl font-bold text-brand-emerald-600">
                            {monthlySpend.toLocaleString()} <span className="text-sm text-gray-500 font-normal">만원</span>
                        </span>
                    </div>
                    <input
                        type="range"
                        min="100"
                        max="5000"
                        step="50"
                        value={monthlySpend}
                        onChange={(e) => setMonthlySpend(Number(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-emerald-600"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>100만원</span>
                        <span>5,000만원+</span>
                    </div>
                </div>

                {/* Result Display */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-center border border-gray-100">
                    <p className="text-gray-500 mb-2">성원식자재 이용 시 예상되는</p>
                    <div className="mb-4">
                        <p className="text-sm text-gray-400 mb-1">월 절감액</p>
                        <p className="text-4xl font-bold text-brand-emerald-600 mb-2">
                            {calculatedSavings.toLocaleString()} <span className="text-2xl">만원</span>
                        </p>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-400 mb-1">연간 절감액</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {yearlySavings.toLocaleString()} <span className="text-lg">만원</span>
                        </p>
                    </div>
                </div>

                <Link
                    href="/#contact"
                    className="w-full py-4 bg-brand-emerald-600 text-white font-bold rounded-xl hover:bg-brand-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                    이 금액으로 견적 받기
                    <ArrowRight size={20} />
                </Link>

                <p className="text-xs text-gray-400 text-center mt-4">
                    * 위 금액은 평균적인 절감율({savingsRate}%)을 적용한 예상치이며, 실제 품목에 따라 달라질 수 있습니다.
                </p>
            </div>
        </div>
    );
}
