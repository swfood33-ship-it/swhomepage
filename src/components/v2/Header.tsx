'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
    { name: '회사소개', href: '#about' },
    { name: '식자재 공급 서비스', href: '#service' },
    { name: '주요 취급 품목', href: '#categories' },
    { name: '매입가 공개', href: '#pricing' },
    { name: '블로그', href: '#blog' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/new" className="text-2xl font-bold tracking-tighter text-brand-emerald-600">
                    성원식자재
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600 hover:text-brand-emerald-600' : 'text-white/90 hover:text-white'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="#inquiry"
                        className="px-5 py-2.5 bg-brand-emerald-600 text-white text-sm font-bold rounded-full hover:bg-brand-emerald-700 transition-all shadow-lg hover:shadow-brand-emerald-500/30"
                    >
                        무료 진단 요청
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className={isScrolled ? 'text-gray-900' : 'text-white'} />
                    ) : (
                        <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl p-4 md:hidden flex flex-col gap-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-gray-600 font-medium py-2 hover:text-brand-emerald-600"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="#inquiry"
                        className="w-full py-3 bg-brand-emerald-600 text-white text-center font-bold rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        무료 진단 요청
                    </Link>
                </div>
            )}
        </header>
    );
}
