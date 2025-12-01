import Link from 'next/link';

export default function SiteHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-brand-emerald-900">
                    성원식자재
                </Link>
                <nav className="hidden md:flex space-x-6 lg:space-x-8">
                    <Link href="/company" className="text-gray-600 hover:text-brand-emerald-600 transition-colors font-medium">회사소개</Link>
                    <Link href="/guide" className="text-gray-600 hover:text-brand-emerald-600 transition-colors font-medium">이용 방법</Link>
                    <Link href="/pricing" className="text-brand-emerald-700 font-bold hover:text-brand-emerald-900 transition-colors">매입가 공개</Link>
                    <Link href="/diagnosis" className="text-brand-emerald-700 font-bold hover:text-brand-emerald-900 transition-colors">무료 자가 진단</Link>
                    <Link href="https://blog.naver.com/lki4234" target="_blank" className="text-gray-600 hover:text-brand-emerald-600 transition-colors font-medium">블로그</Link>
                    <Link href="/#contact" className="text-gray-600 hover:text-brand-emerald-600 transition-colors font-medium">견적 문의</Link>
                </nav>
                <a
                    href="tel:010-8215-6737"
                    className="bg-brand-emerald text-white px-4 py-2 rounded-md font-medium hover:bg-brand-emerald-700 transition-all duration-300 hover:shadow-lg hover:shadow-brand-emerald-500/30 hover:scale-105 active:scale-95"
                >
                    전화 문의
                </a>
            </div>
        </header>
    );
}
