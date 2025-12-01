'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PricingLogin() {
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple mock authentication
        // In a real app, this would verify against a backend or use NextAuth
        if (accessCode === '1234') {
            // Set a simple flag in sessionStorage
            sessionStorage.setItem('pricing_auth', 'true');
            router.push('/pricing');
        } else {
            setError('인증 코드가 올바르지 않습니다.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-emerald-900 px-4">
            <div className="bg-white rounded-2xl p-8 md:p-12 w-full max-w-md shadow-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-brand-gray-900 mb-2">파트너 전용</h1>
                    <p className="text-gray-500">
                        매입가 확인을 위해 인증 코드를 입력해주세요.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-2">
                            인증 코드
                        </label>
                        <input
                            type="password"
                            id="accessCode"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-emerald-500 focus:border-transparent outline-none transition-all"
                            placeholder="코드를 입력하세요"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center font-medium animate-pulse">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-4 bg-brand-yellow text-brand-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-yellow-400/30"
                    >
                        확인하기
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-400">
                    <p>인증 코드는 담당 매니저에게 문의해주세요.</p>
                </div>
            </div>
        </div>
    );
}
