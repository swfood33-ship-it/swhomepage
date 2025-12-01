import Link from 'next/link';

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-emerald-50 px-4 text-center">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full">
                <div className="w-20 h-20 bg-brand-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-brand-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-brand-gray-900 mb-4">상담 신청 완료</h1>
                <p className="text-gray-600 mb-8">
                    문의해주셔서 감사합니다.<br />
                    담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.
                </p>
                <Link
                    href="/"
                    className="inline-block w-full py-4 bg-brand-emerald text-white font-bold rounded-lg hover:bg-brand-emerald-700 transition-colors"
                >
                    메인으로 돌아가기
                </Link>
            </div>
        </div>
    );
}
