'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';


export default function SiteHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-brand-emerald-800 z-50 relative">
                    성원식자재
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 lg:space-x-8">
                    <Link href="/company" className="text-gray-600 hover:text-brand-emerald-600 transition-colors font-medium">회사소개</Link>
                    <Link href="/why-us" className="text-gray-600 hover:text-brand-emerald-600 transition-colors font-medium">경쟁력</Link>
                    <Link href="/cases" className="text-gray-600 hover:text-brand-emerald-600 transition-colors font-medium">성공사례</Link>
                    <Link href="/guide" className="text-gray-600 hover:text-brand-emerald-600 transition-colors font-medium">이용 방법</Link>
                    <Link href="/pricing" className="text-brand-emerald-700 font-bold hover:text-brand-emerald-900 transition-colors">매입가 공개</Link>
                    <Link href="/diagnosis" className="text-brand-emerald-700 font-bold hover:text-brand-emerald-900 transition-colors">무료 자가 진단</Link>
                    <Link href="https://blog.naver.com/lki4234" target="_blank" className="text-gray-600 hover:text-brand-emerald-600 transition-colors font-medium">블로그</Link>
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <a
                        href="tel:010-8215-6737"
                        className="text-brand-emerald-700 font-bold hover:text-brand-emerald-900 transition-colors"
                    >
                        010-8215-6737
                    </a>
                    <Link
                        href="/#contact"
                        className="bg-brand-emerald text-white px-5 py-2.5 rounded-md font-bold hover:bg-brand-emerald-700 transition-all duration-300 hover:shadow-lg hover:shadow-brand-emerald-500/30 hover:scale-105 active:scale-95"
                    >
                        무료 견적 받기
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 relative p-2 text-gray-800"
                    onClick={() => setIsMobileMenuOpen(true)}
                    aria-label="메뉴 열기"
                >
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Mobile Menu Overlay - Rendered via Portal */}
                {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
                    <div
                        className="md:hidden fixed inset-0 flex flex-col bg-white"
                        style={{
                            backgroundColor: '#FFFFFF',
                            zIndex: 999999
                        }}
                    >
                        {/* Overlay Header */}
                        <div className="flex justify-between items-center h-16 px-4 border-b border-gray-100 shrink-0">
                            <Link href="/" className="text-2xl font-bold text-brand-emerald-900" onClick={() => setIsMobileMenuOpen(false)}>
                                성원식자재
                            </Link>
                            <button
                                className="p-2 text-gray-900 hover:text-brand-emerald-600 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                                aria-label="메뉴 닫기"
                            >
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Menu Items Container */}
                        <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
                            <nav className="flex flex-col space-y-7">
                                <Link href="/company" className="text-3xl font-bold text-gray-900 hover:text-brand-emerald-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    회사소개
                                </Link>
                                <Link href="/why-us" className="text-3xl font-bold text-gray-900 hover:text-brand-emerald-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    경쟁력
                                </Link>
                                <Link href="/cases" className="text-3xl font-bold text-gray-900 hover:text-brand-emerald-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    성공사례
                                </Link>
                                <Link href="/guide" className="text-3xl font-bold text-gray-900 hover:text-brand-emerald-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    이용 방법
                                </Link>
                                <Link href="/pricing" className="text-3xl font-bold text-brand-emerald-600 hover:text-brand-emerald-700 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    매입가 공개
                                </Link>
                                <Link href="/diagnosis" className="text-3xl font-bold text-brand-emerald-600 hover:text-brand-emerald-700 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    무료 자가 진단
                                </Link>
                                <Link href="https://blog.naver.com/lki4234" target="_blank" className="text-3xl font-bold text-gray-900 hover:text-brand-emerald-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    블로그
                                </Link>
                            </nav>
                        </div>

                        {/* Footer CTA */}
                        <div className="p-6 border-t border-gray-100 shrink-0">
                            <a
                                href="tel:010-8215-6737"
                                className="flex items-center justify-center w-full py-4 bg-brand-emerald-600 text-white text-xl font-bold rounded-xl hover:bg-brand-emerald-700 transition-all shadow-lg active:scale-[0.98]"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="mr-2">📞</span> 전화 문의
                            </a>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        </header>
    );
}
