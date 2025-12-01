'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

export default function DiagnosisPage() {
    const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload');
    const [files, setFiles] = useState<File[]>([]);
    const [result, setResult] = useState<{ score: number; rating: 'good' | 'average' | 'warning' | 'critical' } | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    // Step 1: Start Analysis (Simulation)
    const startAnalysis = () => {
        if (files.length < 3) {
            alert('정확한 진단을 위해 영수증을 3장 이상 업로드해주세요.');
            return;
        }

        setStep('analyzing');

        // Simulate OCR processing time
        setTimeout(async () => {
            // Randomize result for demo purposes (5% ~ 20%)
            const randomScore = Math.floor(Math.random() * 16) + 5;

            let rating: 'good' | 'average' | 'warning' | 'critical' = 'average';
            if (randomScore >= 15) rating = 'good';
            else if (randomScore >= 10) rating = 'average';
            else if (randomScore >= 5) rating = 'warning';
            else rating = 'critical';

            const resultData = { score: randomScore, rating };
            setResult(resultData);

            // Save to API
            try {
                await fetch('/api/inquiry/diagnosis', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        answers: {
                            fileCount: files.length,
                            fileNames: files.map(f => f.name),
                            rating: rating
                        },
                        score: randomScore
                    }),
                });
            } catch (error) {
                console.error('Error saving diagnosis:', error);
            }

            setStep('result');
        }, 3000);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(prev => [...prev, ...droppedFiles]);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...selectedFiles]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <SiteHeader />

            <main ref={containerRef} className="flex-grow pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-4xl">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            무료 <span className="text-brand-emerald-600">단가 진단</span> 서비스
                        </h1>
                        <p className="text-xl text-gray-600">
                            최근 매입 영수증 3장만 있으면,<br className="md:hidden" />
                            성원식자재가 사장님의 매입 경쟁력을 분석해드립니다.
                        </p>
                    </div>

                    {/* Content Area */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 min-h-[500px] flex flex-col justify-center items-center transition-all duration-500">

                        {/* Step 1: Upload */}
                        {step === 'upload' && (
                            <div className="w-full max-w-2xl text-center space-y-8 animate-fade-in">
                                <div
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    className="border-3 border-dashed border-gray-300 rounded-2xl p-12 hover:border-brand-emerald-500 hover:bg-brand-emerald-50 transition-all cursor-pointer group"
                                >
                                    <div className="mb-6">
                                        <svg className="w-20 h-20 mx-auto text-gray-400 group-hover:text-brand-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                        영수증 이미지를 여기에 놓아주세요
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        또는 클릭하여 파일 선택 (최소 3장)
                                    </p>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-block px-8 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        파일 찾기
                                    </label>
                                </div>

                                {/* File List */}
                                {files.length > 0 && (
                                    <div className="bg-gray-50 rounded-xl p-6 text-left">
                                        <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-brand-emerald-500"></span>
                                            업로드된 파일 ({files.length}개)
                                        </h4>
                                        <ul className="space-y-2">
                                            {files.map((file, i) => (
                                                <li key={i} className="text-sm text-gray-600 flex justify-between items-center bg-white p-3 rounded border border-gray-200">
                                                    <span className="truncate max-w-[80%]">{file.name}</span>
                                                    <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <button
                                    onClick={startAnalysis}
                                    disabled={files.length < 3}
                                    className={`w-full py-5 rounded-xl text-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg
                                        ${files.length >= 3
                                            ? 'bg-brand-emerald-600 hover:bg-brand-emerald-700 shadow-brand-emerald-200'
                                            : 'bg-gray-300 cursor-not-allowed'}`}
                                >
                                    {files.length < 3 ? `3장 이상 업로드해주세요 (${files.length}/3)` : '무료 진단 시작하기'}
                                </button>
                            </div>
                        )}

                        {/* Step 2: Analyzing Animation */}
                        {step === 'analyzing' && (
                            <div className="text-center space-y-8 animate-fade-in">
                                <div className="relative w-32 h-32 mx-auto">
                                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-brand-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-brand-emerald-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">영수증을 분석하고 있습니다...</h3>
                                    <p className="text-gray-500">AI가 품목별 단가를 추출하여 비교 분석합니다.</p>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Result */}
                        {step === 'result' && result && (
                            <div className="w-full max-w-3xl animate-fade-in">
                                <div className="text-center mb-10">
                                    <span className="inline-block px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium mb-4">
                                        분석 완료
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        사장님의 매입 경쟁력은?
                                    </h2>
                                </div>

                                {/* Score Card */}
                                <div className={`relative overflow-hidden rounded-3xl p-8 md:p-12 text-center text-white mb-10 shadow-2xl
                                    ${result.rating === 'good' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
                                        result.rating === 'average' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                                            result.rating === 'warning' ? 'bg-gradient-to-br from-orange-500 to-red-500' :
                                                'bg-gradient-to-br from-red-600 to-pink-700'
                                    }`}>

                                    <div className="relative z-10">
                                        <p className="text-lg md:text-xl font-medium opacity-90 mb-2">
                                            성원식자재 이용 시 예상 절감액
                                        </p>
                                        <div className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
                                            {result.score}%
                                            <span className="text-2xl md:text-4xl font-bold ml-2">
                                                더 저렴해요!
                                            </span>
                                        </div>

                                        <div className="inline-block bg-white/20 backdrop-blur-md rounded-xl px-6 py-3 border border-white/30">
                                            <span className="text-xl md:text-2xl font-bold">
                                                {result.rating === 'good' && '🎉 훌륭합니다! 하지만 더 아낄 수 있어요.'}
                                                {result.rating === 'average' && '😐 평균적인 가격입니다. 마진을 더 높여보세요.'}
                                                {result.rating === 'warning' && '⚠️ 주의가 필요합니다. 매입가 점검이 시급해요.'}
                                                {result.rating === 'critical' && '🚨 심각합니다! 당장 거래처 변경을 고려하세요.'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Decorative Circles */}
                                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>
                                </div>

                                {/* Call to Action */}
                                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 text-center">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                                        정확한 견적을 받아보시겠습니까?
                                    </h3>
                                    <p className="text-gray-600 mb-8">
                                        업로드하신 영수증을 바탕으로 담당자가<br />
                                        상세 품목별 비교 견적서를 보내드립니다.
                                    </p>

                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={() => { setStep('upload'); setFiles([]); setResult(null); }}
                                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors"
                                        >
                                            다시 진단하기
                                        </button>
                                        <Link
                                            href="/#contact"
                                            className="px-6 py-3 bg-brand-emerald-600 rounded-lg text-white hover:bg-brand-emerald-700 font-bold shadow-lg shadow-brand-emerald-200 transition-all hover:-translate-y-1"
                                        >
                                            무료 상세 견적 신청
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
