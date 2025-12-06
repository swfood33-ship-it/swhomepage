'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import ResultRatingCard from '@/components/diagnosis/ResultRatingCard';
import { Upload, ArrowRight, Check, Receipt, AlertCircle, ChevronRight, Store, Building2, GraduationCap, Edit2, Trash2, Plus } from 'lucide-react';

interface ExtractedItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    originalPrice: number;
}

interface AnalysisResult {
    summary: {
        totalOriginal: number;
        totalSungwon: number;
        savings: number;
        savingsRate: number;
        projectedSavings: number; // New field
        priceDifference: number;
        rating: 'very_good' | 'average' | 'expensive' | 'critical';
        ratingLabel: string;
        businessType?: string;
        currentSupplier?: string;
        monthlyAmount?: number;
    };
}

// type IndustryType = 'restaurant' | 'franchise' | 'school' | null; // Removed old type

export default function DiagnosisPage() {
    // New Step Flow: upload -> profile -> analyzing -> review -> result
    const [step, setStep] = useState<'upload' | 'profile' | 'analyzing' | 'review' | 'result'>('upload');
    const [files, setFiles] = useState<File[]>([]);

    // Store Profile State
    const [monthlyAmount, setMonthlyAmount] = useState<number>(0);
    const [businessType, setBusinessType] = useState<string>('');
    const [currentSupplier, setCurrentSupplier] = useState<string>('');

    const [extractedItems, setExtractedItems] = useState<ExtractedItem[]>([]);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
            setFiles(prev => [...prev, ...droppedFiles]);
            setError(null);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...selectedFiles]);
            setError(null);
        }
    };

    const handleNextToProfile = () => {
        if (files.length < 3) {
            setError('정확한 분석을 위해 영수증을 최소 3장 이상 업로드해주세요.');
            return;
        }
        setStep('profile');
    };

    const [manualMode, setManualMode] = useState(false);
    const [serverImagePaths, setServerImagePaths] = useState<string[]>([]);

    const startAnalysis = async () => {
        if (!monthlyAmount || !businessType || !currentSupplier) {
            setError('매장 프로필을 모두 입력해주세요.');
            return;
        }

        setStep('analyzing');
        setError(null);
        setManualMode(false);
        setError(null);
        setManualMode(false);
        const allItems: ExtractedItem[] = [];
        const imagePaths: string[] = [];

        try {
            // Analyze files sequentially
            let hasManualFallback = false;

            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/analyze-receipt', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.data?.imagePath) {
                        // Store the server-side path for the DB
                        imagePaths.push(data.data.imagePath);
                    }

                    if (data.data?.manualRequired) {
                        hasManualFallback = true;
                    } else if (data.data?.items) {
                        allItems.push(...data.data.items);
                    }
                }
            }

            // Store collecting paths
            setServerImagePaths(imagePaths);

            if (hasManualFallback || allItems.length === 0) {
                setManualMode(true);
                // Initialize with one empty item if nothing was found
                if (allItems.length === 0) {
                    allItems.push({
                        id: crypto.randomUUID(),
                        name: '',
                        quantity: 1,
                        price: 0,
                        originalPrice: 0
                    });
                }
            }

            setExtractedItems(allItems);
            setStep('review');

        } catch (err) {
            console.error(err);
            // Even on crash, go to manual mode
            setManualMode(true);
            setExtractedItems([{
                id: crypto.randomUUID(),
                name: '',
                quantity: 1,
                price: 0,
                originalPrice: 0
            }]);
            setStep('review');
        }
    };

    const updateItem = (id: string, field: keyof ExtractedItem, value: string | number) => {
        setExtractedItems(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const deleteItem = (id: string) => {
        setExtractedItems(prev => prev.filter(item => item.id !== id));
    };

    const addItem = () => {
        const newItem: ExtractedItem = {
            id: crypto.randomUUID(),
            name: '직접 입력',
            quantity: 1,
            price: 10000,
            originalPrice: 10000
        };
        setExtractedItems(prev => [...prev, newItem]);
    };

    const calculateSavings = async () => {
        try {
            const response = await fetch('/api/estimate-savings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: extractedItems,
                    monthlyAmount,
                    businessType,
                    currentSupplier,
                    imagePaths: serverImagePaths
                })
            });

            if (!response.ok) throw new Error('Calculation failed');

            const data = await response.json();
            setResult(data.data);
            setStep('result');

        } catch (err) {
            console.error(err);
            setError('견적 산출 중 오류가 발생했습니다.');
        }
    };

    const currentStepIndex = ['upload', 'industry', 'analyzing', 'review', 'result'].indexOf(step);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <SiteHeader />

            <main ref={containerRef} className="flex-grow pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-4xl">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            AI <span className="text-[#0E8F5B]">영수증 비용 분석</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600">
                            영수증 3장만 올리면, AI가 품목을 분석하고<br className="md:hidden" />
                            성원식자재 실제 단가표와 비교하여 정확한 절감액을 알려드립니다.
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex justify-center mb-12">
                        <div className="flex items-center gap-2 md:gap-4">
                            {[1, 2, 3, 4].map((num, idx) => {
                                const isActive = currentStepIndex >= idx;
                                return (
                                    <div key={num} className="flex items-center gap-2 md:gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${isActive ? 'bg-[#0E8F5B] text-white' : 'bg-gray-200 text-gray-500'}`}>
                                            {num}
                                        </div>
                                        {num < 4 && (
                                            <div className="w-12 h-1 bg-gray-200">
                                                <div className={`h-full bg-[#0E8F5B] transition-all duration-500 ${currentStepIndex > idx ? 'w-full' : 'w-0'}`} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="bg-white rounded-[32px] shadow-xl p-8 md:p-12 min-h-[500px] flex flex-col justify-center items-center transition-all duration-500 relative overflow-hidden border border-gray-100">

                        {/* Step 1: Upload */}
                        {step === 'upload' && (
                            <div className="w-full max-w-2xl text-center space-y-8 animate-fade-in">

                                <div className="max-w-2xl mx-auto space-y-8">
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        className={`border-3 border-dashed rounded-3xl p-12 transition-all cursor-pointer group ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-[#0E8F5B] hover:bg-[#0E8F5B]/5'}`}
                                    >
                                        <div className="mb-6">
                                            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <Upload className="w-10 h-10 text-gray-400 group-hover:text-[#0E8F5B] transition-colors" />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                            영수증 <span className="text-[#0E8F5B]">3장 이상</span>을 올려주세요
                                        </h3>
                                        <p className="text-gray-500 mb-4 leading-relaxed">
                                            분석의 정확도를 위해 최소 3장의 영수증이 필요합니다.<br />
                                            (JPG, PNG 이미지 파일 지원)
                                        </p>

                                        <div className="bg-[#0E8F5B]/5 p-4 rounded-xl mb-8 text-sm text-[#0E8F5B] font-medium break-keep">
                                            💡 Tip: 품목명이 잘 보이게 찍어주시면, 성원 실제 공급 단가와 매칭하여 <br className="hidden md:block" />더 정확한 견적을 받으실 수 있습니다.
                                        </div>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileSelect}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-bold hover:border-[#0E8F5B] hover:text-[#0E8F5B] cursor-pointer transition-all shadow-sm hover:shadow-md"
                                        >
                                            파일 선택하기 (여러장 가능)
                                        </label>
                                    </div>

                                    {error && (
                                        <div className="flex items-center justify-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl animate-shake">
                                            <AlertCircle size={20} />
                                            <span className="font-medium">{error}</span>
                                        </div>
                                    )}

                                    {files.length > 0 && (
                                        <div className="bg-gray-50 rounded-2xl p-6 text-left border border-gray-200">
                                            <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                                <Check className="text-[#0E8F5B]" size={20} />
                                                업로드 준비 ({files.length}장)
                                            </h4>
                                            <ul className="space-y-3 max-h-40 overflow-y-auto">
                                                {files.map((file, i) => (
                                                    <li key={i} className="text-sm text-gray-600 flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                                        <span className="truncate max-w-[70%] font-medium flex items-center gap-2">
                                                            <Receipt size={16} className="text-gray-400" />
                                                            {file.name}
                                                        </span>
                                                        <button
                                                            onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                                                            className="text-xs text-red-400 hover:text-red-600 font-medium px-2 py-1"
                                                        >
                                                            삭제
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleNextToProfile}
                                        className={`w-full py-5 rounded-2xl text-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${files.length >= 3 ? 'bg-[#0E8F5B] text-white hover:bg-[#0B7A4D] hover:-translate-y-1 shadow-[#0E8F5B]/30' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                    >
                                        다음 단계 (매장 프로필)
                                        <ArrowRight size={24} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Store Profile */}
                        {step === 'profile' && (
                            <div className="w-full max-w-3xl text-center space-y-10 animate-fade-in">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                        정확한 분석을 위해 <span className="text-[#0E8F5B]">매장 프로필</span>을 입력해주세요
                                    </h3>
                                    <p className="text-gray-500">입력하신 정보를 바탕으로 사장님께 딱 맞는 맞춤 절감액을 계산합니다.</p>
                                </div>

                                {/* 1. Business Type */}
                                <div className="space-y-4">
                                    <label className="block text-left text-lg font-bold text-gray-800">1. 운영 중인 업종이 무엇인가요?</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {['한식', '중식/일식', '양식/카페', '주점/호프', '구내식당', '기타'].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setBusinessType(type)}
                                                className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${businessType === type ? 'border-[#0E8F5B] bg-[#0E8F5B] text-white shadow-md' : 'border-gray-200 text-gray-600 hover:border-[#0E8F5B]/50 hover:bg-gray-50'}`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. Current Supplier */}
                                <div className="space-y-4">
                                    <label className="block text-left text-lg font-bold text-gray-800">2. 주로 어디서 식자재를 구매하시나요?</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {['식자재마트', '대형마트', '도매시장', '배송업체'].map((supplier) => (
                                            <button
                                                key={supplier}
                                                onClick={() => setCurrentSupplier(supplier)}
                                                className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${currentSupplier === supplier ? 'border-[#0E8F5B] bg-[#0E8F5B] text-white shadow-md' : 'border-gray-200 text-gray-600 hover:border-[#0E8F5B]/50 hover:bg-gray-50'}`}
                                            >
                                                {supplier}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 3. Monthly Amount */}
                                <div className="space-y-4">
                                    <label className="block text-left text-lg font-bold text-gray-800">3. 한 달 평균 식자재 매입액은 얼마인가요?</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={monthlyAmount > 0 ? monthlyAmount.toLocaleString() : ''}
                                            onChange={(e) => {
                                                const val = Number(e.target.value.replace(/,/g, ''));
                                                if (!isNaN(val)) setMonthlyAmount(val);
                                            }}
                                            placeholder="금액 입력"
                                            className="w-full text-right p-4 pr-12 text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-[#0E8F5B] focus:ring-[#0E8F5B] outline-none"
                                        />
                                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 font-bold">원</span>
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        {[1000000, 5000000, 10000000].map((amt) => (
                                            <button
                                                key={amt}
                                                onClick={() => setMonthlyAmount(prev => prev + amt)}
                                                className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-200"
                                            >
                                                +{amt / 10000}만
                                            </button>
                                        ))}
                                        <button onClick={() => setMonthlyAmount(0)} className="px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-bold hover:bg-red-100">초기화</button>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6 mt-8 border-t border-gray-100">
                                    <button onClick={() => setStep('upload')} className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                                        이전
                                    </button>
                                    <button
                                        onClick={startAnalysis}
                                        disabled={!monthlyAmount || !businessType || !currentSupplier}
                                        className={`flex-[2] py-4 rounded-xl text-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 
                                            ${(monthlyAmount && businessType && currentSupplier)
                                                ? 'bg-[#0E8F5B] text-white hover:bg-[#0B7A4D] hover:-translate-y-1'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                    >
                                        AI 분석 시작
                                        <ArrowRight size={24} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Analyzing */}
                        {step === 'analyzing' && (
                            <div className="text-center space-y-10 animate-fade-in py-10">
                                <div className="relative w-40 h-40 mx-auto">
                                    <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-[#0E8F5B] rounded-full border-t-transparent animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <Receipt className="w-12 h-12 text-[#0E8F5B] animate-pulse mb-2" />
                                        <span className="text-xs font-bold text-[#0E8F5B] animate-pulse">Scanning {files.length} receipts...</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">영수증 내용을 읽고 있습니다...</h3>
                                    <p className="text-gray-500">잠시 후 분석 결과를 검토하실 수 있습니다.</p>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Review */}
                        {step === 'review' && (
                            <div className="w-full max-w-4xl text-left animate-fade-in">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">분석 결과 확인</h3>
                                        <p className="text-gray-500 text-sm mt-1">
                                            {manualMode
                                                ? '시스템 일시 장애로 인해 주요 품목을 직접 입력해주세요. 담당자가 확인 후 정확한 견적을 안내드립니다.'
                                                : 'AI가 인식한 내용을 확인하고 수정해주세요.'}
                                        </p>
                                    </div>
                                    <button onClick={addItem} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200">
                                        <Plus size={16} /> 품목 추가
                                    </button>
                                </div>

                                {manualMode && (
                                    <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl mb-6 flex items-start gap-3">
                                        <AlertCircle className="shrink-0 mt-0.5" size={20} />
                                        <div className="text-sm">
                                            <strong>AI 시스템 응답 없음</strong><br />
                                            죄송합니다. 현재 영수증 자동 인식이 원활하지 않습니다.<br />
                                            가장 많이 쓰시는 <strong>주요 식자재 3~5가지만</strong> 아래에 입력해주시면, 담당자가 우선적으로 검토하겠습니다.
                                        </div>
                                    </div>
                                )}

                                {/* Image Previews */}
                                {files.length > 0 && (
                                    <div className="mb-6 overflow-x-auto pb-4">
                                        <div className="flex gap-4">
                                            {files.map((file, idx) => (
                                                <div key={idx} className="relative w-32 h-40 shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={`Receipt ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                                        #{idx + 1}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-8 max-h-[400px] overflow-y-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-[#0E8F5B]/5 text-gray-700 font-bold border-b border-[#0E8F5B]/10">
                                            <tr>
                                                <th className="px-4 py-3 text-left">품목명</th>
                                                <th className="px-4 py-3 text-center w-20">수량</th>
                                                <th className="px-4 py-3 text-right w-32">단가</th>
                                                <th className="px-4 py-3 text-right w-20">삭제</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {extractedItems.map((item) => (
                                                <tr key={item.id} className="bg-white hover:bg-gray-50">
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="text"
                                                            value={item.name}
                                                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                                            className="w-full bg-transparent border-none focus:ring-0 p-0 font-medium"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        <input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                                                            className="w-full bg-transparent border-none focus:ring-0 p-0 text-center"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 text-right">
                                                        <input
                                                            type="number"
                                                            value={item.price}
                                                            onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                                                            className="w-full bg-transparent border-none focus:ring-0 p-0 text-right text-gray-600"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 text-right">
                                                        <button onClick={() => deleteItem(item.id)} className="text-red-300 hover:text-red-500 p-1">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <button
                                    onClick={calculateSavings}
                                    className="w-full py-5 rounded-2xl bg-[#0E8F5B] text-white text-xl font-bold shadow-xl hover:bg-[#0B7A4D] hover:-translate-y-1 transition-all flex justify-center items-center gap-2"
                                >
                                    최종 견적(절감액) 산출하기
                                    <ArrowRight size={24} />
                                </button>
                            </div>
                        )}

                        {/* Step 5: Result (Rating Card + Details) */}
                        {step === 'result' && result && (
                            <div className="w-full max-w-2xl animate-fade-in text-center">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-gray-500 text-sm font-bold mb-8">
                                    분석 결과
                                </span>

                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-snug break-keep">
                                    <span className="text-[#0E8F5B]">{result.summary.currentSupplier || '사장님'}</span>에서 구매하시는 <span className="text-[#0E8F5B]">{result.summary.businessType || '사장님'}</span> 사장님,<br />
                                    매달 <span className="text-red-500 decoration-red-200 underline underline-offset-4 decoration-4">{(result.summary.projectedSavings || 0).toLocaleString()}원</span>을 손해보고 계십니다 💸
                                </h2>

                                {/* Rating Card */}
                                <ResultRatingCard
                                    rating={result.summary.rating}
                                    priceDifference={result.summary.priceDifference}
                                />

                                {/* Savings Details */}
                                <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
                                    <div className="flex justify-between items-center mb-6 text-gray-500">
                                        <span className="text-lg">성원으로 바꾸면 월 예상 이익</span>
                                    </div>
                                    <div className="text-4xl md:text-5xl font-black text-[#0E8F5B] mb-2">
                                        +{(result.summary.projectedSavings || 0).toLocaleString()}원
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        (월 매입액 {(result.summary.monthlyAmount || 0).toLocaleString()}원 기준 예상 절감액)
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={() => {
                                            setStep('upload');
                                            setFiles([]);
                                            setResult(null);
                                            setExtractedItems([]);
                                            setMonthlyAmount(0);
                                            setBusinessType('');
                                            setCurrentSupplier('');
                                        }}
                                        className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                                    >
                                        다시하기
                                    </button>
                                    <Link
                                        href="/#contact"
                                        className="px-8 py-4 bg-[#0E8F5B] text-white rounded-xl font-bold hover:bg-[#0B7A4D] shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                                    >
                                        무료 상세 견적 받기
                                        <ChevronRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
