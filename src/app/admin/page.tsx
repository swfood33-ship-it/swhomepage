'use client';

import { useState, useEffect } from 'react';
import SiteHeader from '@/components/SiteHeader';

interface Quote {
    id: string;
    name: string;
    phone: string;
    message: string;
    createdAt: string;
}

interface PricingRequest {
    id: string;
    name: string;
    phone: string;
    businessName: string;
    createdAt: string;
}

interface DiagnosisResult {
    id: string;
    answers: any;
    score: number;
    createdAt: string;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'quotes' | 'pricing' | 'diagnosis'>('quotes');
    const [data, setData] = useState<{
        quotes: Quote[];
        pricingRequests: PricingRequest[];
        diagnosisResults: DiagnosisResult[];
    }>({ quotes: [], pricingRequests: [], diagnosisResults: [] });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin1234') {
            setIsAuthenticated(true);
            fetchData();
        } else {
            alert('비밀번호가 틀렸습니다.');
        }
    };

    const fetchData = async () => {
        try {
            const res = await fetch('/api/admin/data');
            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호 입력"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-brand-emerald-900 text-white font-bold rounded-lg hover:bg-brand-emerald-800 transition-colors"
                    >
                        로그인
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <SiteHeader />
            <main className="pt-32 pb-20 px-4 container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">통합 관리자 대시보드</h1>
                    <button
                        onClick={fetchData}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                    >
                        새로고침
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('quotes')}
                        className={`px-6 py-3 font-bold text-lg transition-colors border-b-2 ${activeTab === 'quotes' ? 'border-brand-emerald-600 text-brand-emerald-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        견적 문의 ({data.quotes.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('pricing')}
                        className={`px-6 py-3 font-bold text-lg transition-colors border-b-2 ${activeTab === 'pricing' ? 'border-brand-emerald-600 text-brand-emerald-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        단가표 요청 ({data.pricingRequests.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('diagnosis')}
                        className={`px-6 py-3 font-bold text-lg transition-colors border-b-2 ${activeTab === 'diagnosis' ? 'border-brand-emerald-600 text-brand-emerald-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        자가 진단 ({data.diagnosisResults.length})
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {activeTab === 'quotes' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="p-4 font-bold text-gray-600">날짜</th>
                                        <th className="p-4 font-bold text-gray-600">업체명/이름</th>
                                        <th className="p-4 font-bold text-gray-600">연락처</th>
                                        <th className="p-4 font-bold text-gray-600">문의 내용</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {data.quotes.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="p-4 text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</td>
                                            <td className="p-4 font-medium">{item.name}</td>
                                            <td className="p-4">{item.phone}</td>
                                            <td className="p-4 text-gray-600 max-w-md truncate">{item.message}</td>
                                        </tr>
                                    ))}
                                    {data.quotes.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-gray-400">데이터가 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'pricing' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="p-4 font-bold text-gray-600">날짜</th>
                                        <th className="p-4 font-bold text-gray-600">업체명</th>
                                        <th className="p-4 font-bold text-gray-600">담당자</th>
                                        <th className="p-4 font-bold text-gray-600">연락처</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {data.pricingRequests.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="p-4 text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</td>
                                            <td className="p-4 font-medium">{item.businessName}</td>
                                            <td className="p-4">{item.name}</td>
                                            <td className="p-4">{item.phone}</td>
                                        </tr>
                                    ))}
                                    {data.pricingRequests.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-gray-400">데이터가 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'diagnosis' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="p-4 font-bold text-gray-600">날짜</th>
                                        <th className="p-4 font-bold text-gray-600">점수</th>
                                        <th className="p-4 font-bold text-gray-600">등급</th>
                                        <th className="p-4 font-bold text-gray-600">진단 상세</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {data.diagnosisResults.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{new Date(item.createdAt).toLocaleString()}</td>
                                            <td className="p-4 font-bold text-brand-emerald-600 whitespace-nowrap">{item.score}%</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded text-xs font-bold
                                                    ${item.answers.rating === 'good' ? 'bg-green-100 text-green-700' :
                                                        item.answers.rating === 'average' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'}`}>
                                                    {item.answers.rating?.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600">
                                                <div className="space-y-2">
                                                    {/* User Prices */}
                                                    {item.answers.userPrices && (
                                                        <div className="bg-gray-100 p-2 rounded text-xs grid grid-cols-2 gap-x-4 gap-y-1">
                                                            {item.answers.userPrices.onion && <p><span className="font-bold">양파:</span> {parseInt(item.answers.userPrices.onion).toLocaleString()}원</p>}
                                                            {item.answers.userPrices.greenOnion && <p><span className="font-bold">대파:</span> {parseInt(item.answers.userPrices.greenOnion).toLocaleString()}원</p>}
                                                            {item.answers.userPrices.garlic && <p><span className="font-bold">마늘:</span> {parseInt(item.answers.userPrices.garlic).toLocaleString()}원</p>}
                                                            {item.answers.userPrices.rice && <p><span className="font-bold">쌀:</span> {parseInt(item.answers.userPrices.rice).toLocaleString()}원</p>}
                                                            {item.answers.userPrices.oil && <p><span className="font-bold">식용유:</span> {parseInt(item.answers.userPrices.oil).toLocaleString()}원</p>}
                                                        </div>
                                                    )}
                                                    {/* Files */}
                                                    <div className="max-h-24 overflow-y-auto">
                                                        <p className="text-xs font-bold text-gray-500 mb-1">업로드 파일 ({item.answers.fileCount}개):</p>
                                                        {item.answers.fileNames && Array.isArray(item.answers.fileNames) ? (
                                                            <ul className="list-disc list-inside text-xs text-gray-500">
                                                                {item.answers.fileNames.map((name: string, i: number) => (
                                                                    <li key={i} className="truncate max-w-xs" title={name}>{name}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <span className="text-xs text-gray-400">파일명 없음</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {data.diagnosisResults.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-gray-400">데이터가 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
