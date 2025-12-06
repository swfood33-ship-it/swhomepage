'use client';

import { useState, useEffect } from 'react';
import SiteHeader from '@/components/SiteHeader';
import { Receipt, Download, ExternalLink, RefreshCw, Upload, Plus, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';

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
    imagePath?: string;
    analysisData?: {
        items: Array<{ name: string; quantity: number; price: number; sungwonPrice: number }>;
        summary: { totalOriginal: number; totalSungwon: number; savings: number; savingsRate: number };
    };
    createdAt: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
    unit?: string;
    updatedAt: string;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'quotes' | 'pricing' | 'diagnosis' | 'products'>('quotes');
    const [data, setData] = useState<{
        quotes: Quote[];
        pricingRequests: PricingRequest[];
        diagnosisResults: DiagnosisResult[];
        products: Product[];
    }>({ quotes: [], pricingRequests: [], diagnosisResults: [], products: [] });

    const [isUploading, setIsUploading] = useState(false);

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
            // Fetch existing data
            const resData = await fetch('/api/admin/data').then(r => r.json());

            // Fetch products
            const resProducts = await fetch('/api/admin/products').then(r => r.json());

            setData({
                quotes: resData.quotes || [],
                pricingRequests: resData.pricingRequests || [],
                diagnosisResults: resData.diagnosisResults || [],
                products: resProducts.products || []
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const buffer = await file.arrayBuffer();
            const workbook = XLSX.read(buffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // Mapper to standardize columns
            // Expected columns: "품목명" -> name, "단가" -> price, "규격" -> unit
            const products = jsonData.map((row: any) => ({
                name: row['품목명'] || row['name'] || row['Name'],
                price: row['단가'] || row['price'] || row['Price'],
                unit: row['규격'] || row['unit'] || row['Unit'] || '',
            })).filter(p => p.name && p.price);

            if (products.length === 0) {
                alert('유효한 데이터가 없습니다. 엑셀 컬럼명(품목명, 단가)을 확인해주세요.');
                return;
            }

            const res = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ products })
            });

            if (res.ok) {
                alert(`${products.length}개 품목이 등록되었습니다.`);
                fetchData();
            } else {
                alert('업로드 실패');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            alert('파일 처리 중 오류가 발생했습니다.');
        } finally {
            setIsUploading(false);
            if (e.target) e.target.value = ''; // Reset input
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        try {
            const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
            if (res.ok) fetchData();
        } catch (error) {
            console.error('Delete error', error);
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
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                    >
                        <RefreshCw size={16} />
                        새로고침
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('quotes')}
                        className={`px-6 py-3 font-bold text-lg whitespace-nowrap transition-colors border-b-2 ${activeTab === 'quotes' ? 'border-brand-emerald-600 text-brand-emerald-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        견적 문의 ({data.quotes.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('pricing')}
                        className={`px-6 py-3 font-bold text-lg whitespace-nowrap transition-colors border-b-2 ${activeTab === 'pricing' ? 'border-brand-emerald-600 text-brand-emerald-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        단가표 요청 ({data.pricingRequests.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('diagnosis')}
                        className={`px-6 py-3 font-bold text-lg whitespace-nowrap transition-colors border-b-2 ${activeTab === 'diagnosis' ? 'border-brand-emerald-600 text-brand-emerald-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        자가 진단 ({data.diagnosisResults.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-6 py-3 font-bold text-lg whitespace-nowrap transition-colors border-b-2 ${activeTab === 'products' ? 'border-brand-emerald-600 text-brand-emerald-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        단가 관리 ({data.products.length})
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* ... Existing Tabs ... */}
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
                                        <th className="p-4 font-bold text-gray-600">영수증 이미지</th>
                                        <th className="p-4 font-bold text-gray-600">분석 결과</th>
                                        <th className="p-4 font-bold text-gray-600">상세 내역</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {data.diagnosisResults.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="p-4 text-sm text-gray-500 whitespace-nowrap align-top">
                                                {new Date(item.createdAt).toLocaleString()}
                                            </td>
                                            <td className="p-4 align-top">
                                                {item.imagePath ? (
                                                    (() => {
                                                        const paths = item.imagePath.split(',').filter(p => p.trim());
                                                        return (
                                                            <div className="flex flex-wrap gap-2 w-48">
                                                                {paths.map((path, idx) => (
                                                                    <a
                                                                        key={idx}
                                                                        href={path}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="block w-14 h-14 relative rounded-lg overflow-hidden border border-gray-200 hover:border-brand-emerald-500 transition-colors group"
                                                                    >
                                                                        <img src={path} alt={`Receipt ${idx + 1}`} className="w-full h-full object-cover" />
                                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                                            <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" size={12} />
                                                                        </div>
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        );
                                                    })()
                                                ) : (
                                                    <span className="text-gray-400 text-sm">이미지 없음</span>
                                                )}
                                            </td>
                                            <td className="p-4 align-top">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-lg text-brand-emerald-600">{item.score}% 절감</span>
                                                        <span className={`px-2 py-0.5 rounded text-xs font-bold
                                                            ${item.answers.rating === 'good' ? 'bg-green-100 text-green-700' :
                                                                item.answers.rating === 'average' ? 'bg-yellow-100 text-yellow-700' :
                                                                    'bg-red-100 text-red-700'}`}>
                                                            {item.answers.rating?.toUpperCase()}
                                                        </span>
                                                    </div>
                                                    {item.analysisData && (
                                                        <div className="text-xs text-gray-600">
                                                            <p>총 매입: {item.analysisData.summary.totalOriginal.toLocaleString()}원</p>
                                                            <p>예상 절감: <span className="font-bold text-brand-emerald-600">{item.analysisData.summary.savings.toLocaleString()}원</span></p>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 align-top">
                                                {item.analysisData ? (
                                                    <div className="max-h-32 overflow-y-auto text-xs border border-gray-100 rounded bg-gray-50 p-2">
                                                        <table className="w-full">
                                                            <thead>
                                                                <tr className="text-gray-500 border-b border-gray-200">
                                                                    <th className="pb-1 text-left">품목</th>
                                                                    <th className="pb-1 text-right">기존</th>
                                                                    <th className="pb-1 text-right text-brand-emerald-600">성원</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {item.analysisData.items.map((prod, idx) => (
                                                                    <tr key={idx}>
                                                                        <td className="py-1 truncate max-w-[100px]" title={prod.name}>{prod.name}</td>
                                                                        <td className="py-1 text-right text-gray-500">{prod.price.toLocaleString()}</td>
                                                                        <td className="py-1 text-right font-medium">{prod.sungwonPrice.toLocaleString()}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">상세 데이터 없음</span>
                                                )}
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

                    {activeTab === 'products' && (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-bold">등록된 단가표 ({data.products.length})</h2>
                                    <p className="text-sm text-gray-500">엑셀 업로드를 통해 단가를 일괄 등록할 수 있습니다.</p>
                                </div>
                                <div className="flex gap-2">
                                    <label className={`cursor-pointer flex items-center gap-2 px-4 py-2 bg-brand-emerald-600 text-white rounded-lg hover:bg-brand-emerald-700 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        <Upload size={18} />
                                        <span>{isUploading ? '업로드 중...' : '엑셀 업로드'}</span>
                                        <input
                                            type="file"
                                            accept=".xlsx, .xls"
                                            className="hidden"
                                            onChange={handleFileUpload}
                                            disabled={isUploading}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="p-4 font-bold text-gray-600 w-1/3">품목명</th>
                                            <th className="p-4 font-bold text-gray-600">단가 (원)</th>
                                            <th className="p-4 font-bold text-gray-600">규격</th>
                                            <th className="p-4 font-bold text-gray-600 text-right">관리</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {data.products.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="p-4 font-medium">{item.name}</td>
                                                <td className="p-4 font-bold text-brand-emerald-600">{item.price.toLocaleString()}원</td>
                                                <td className="p-4 text-gray-500">{item.unit || '-'}</td>
                                                <td className="p-4 text-right">
                                                    <button
                                                        onClick={() => handleDeleteProduct(item.id)}
                                                        className="text-red-400 hover:text-red-600 p-1"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {data.products.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="p-12 text-center text-gray-400">
                                                    등록된 품목이 없습니다.<br />
                                                    엑셀 파일을 업로드해주세요.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                                <p className="font-bold mb-2">💡 엑셀 업로드 가이드</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>엑셀 파일의 첫 번째 줄(헤더)에 <strong>품목명</strong>, <strong>단가</strong>, <strong>규격</strong> 컬럼이 있어야 합니다.</li>
                                    <li>단가는 숫자만 입력해주세요. (예: 5000)</li>
                                    <li>품목명은 영수증에 찍히는 이름과 비슷할수록 인식이 잘 됩니다.</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
