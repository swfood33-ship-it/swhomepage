'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';

interface PriceRow {
    품목: string;
    단위: string;
    원산지: string;
    매입가: string;
    비고: string;
}

export default function PricingPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState<PriceRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check authentication
        const auth = sessionStorage.getItem('pricing_auth');
        if (!auth) {
            router.push('/pricing/login');
            return;
        }
        setIsAuthenticated(true);

        // Fetch Excel Data
        fetch('/data/weekly_prices.xlsx')
            .then(res => res.arrayBuffer())
            .then(buffer => {
                const wb = XLSX.read(buffer, { type: 'array' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const jsonData = XLSX.utils.sheet_to_json<PriceRow>(ws);
                setData(jsonData);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading excel:', err);
                setLoading(false);
            });
    }, [router]);

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-gray-900 mb-2">금주 매입가 공개</h1>
                        <p className="text-gray-500">성원식자재는 투명한 가격 정책을 약속합니다.</p>
                    </div>
                    <a
                        href="/data/weekly_prices.xlsx"
                        download
                        className="flex items-center gap-2 px-6 py-3 bg-brand-emerald-900 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors font-medium shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        엑셀 다운로드
                    </a>
                </div>

                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                    {loading ? (
                        <div className="p-20 text-center text-gray-500">
                            데이터를 불러오는 중입니다...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-brand-emerald-50 text-brand-emerald-900">
                                        <th className="p-4 font-bold border-b border-brand-emerald-100">품목</th>
                                        <th className="p-4 font-bold border-b border-brand-emerald-100">단위</th>
                                        <th className="p-4 font-bold border-b border-brand-emerald-100">원산지</th>
                                        <th className="p-4 font-bold border-b border-brand-emerald-100 text-right">매입가</th>
                                        <th className="p-4 font-bold border-b border-brand-emerald-100">비고</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {data.map((row, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-medium text-gray-900">{row['품목']}</td>
                                            <td className="p-4 text-gray-600">{row['단위']}</td>
                                            <td className="p-4 text-gray-600">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${row['원산지'] === '국산' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                                    {row['원산지']}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right font-bold text-brand-emerald-600">{row['매입가']}원</td>
                                            <td className="p-4 text-gray-500 text-sm">{row['비고']}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center text-sm text-gray-400">
                    * 매입가는 매주 월요일 오전에 업데이트됩니다. <br />
                    * 시장 상황에 따라 가격이 변동될 수 있습니다.
                </div>
            </div>
        </div>
    );
}
