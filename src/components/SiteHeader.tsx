'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SiteHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-brand-emerald-900 z-50 relative">
                    성원식자재
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 lg:space-x-8">
                    <Link href="/company" className="text-gray-600 hover:text-brand-emerald-600 transition-colors font-medium">회사소개</Link>
                    <Link href="/guide" className="text-gray-600 hover:text-brand-emerald-600 transition-colors font-medium">이용 방법</Link>
                    <Link href="/pricing" className="text-brand-emerald-700 font-bold hover:text-brand-emerald-900 transition-colors">매입가 공개</Link>
                    <Link href="/diagnosis" className="text-brand-emerald-700 font-bold hover:text-brand-emerald-900 transition-colors">무료 자가 진단</Link>
                    <Link href="https://blog.naver.com/lki4234" target="_blank" className="text-gray-600 hover:text-brand-emerald-600 transition-colors font-medium">블로그</Link>
                    <Link href="/#contact" className="text-gray-600 hover:text-brand-emerald-600 transition-colors font-medium">견적 문의</Link>
                </nav>

                {/* Desktop CTA */}
                <a
                    href="tel:010-8215-6737"
                    className="hidden md:block bg-brand-emerald text-white px-4 py-2 rounded-md font-medium hover:bg-brand-emerald-700 transition-all duration-300 hover:shadow-lg hover:shadow-brand-emerald-500/30 hover:scale-105 active:scale-95"
                >
                    전화 문의
                </a>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 relative p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className={`w-6 h-0.5 bg-gray-800 mb-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <div className={`w-6 h-0.5 bg-gray-800 mb-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                    <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <Link href="/company" className="text-2xl font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>회사소개</Link>
                    <Link href="/guide" className="text-2xl font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>이용 방법</Link>
                    <Link href="/pricing" className="text-2xl font-bold text-brand-emerald-600" onClick={() => setIsMobileMenuOpen(false)}>매입가 공개</Link>
                    <Link href="/diagnosis" className="text-2xl font-bold text-brand-emerald-600" onClick={() => setIsMobileMenuOpen(false)}>무료 자가 진단</Link>
                    <Link href="https://blog.naver.com/lki4234" target="_blank" className="text-2xl font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>블로그</Link>
                    <Link href="/#contact" className="text-2xl font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>견적 문의</Link>
                </div>
            </div>
        </header>
    );
}
