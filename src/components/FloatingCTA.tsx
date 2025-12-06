'use client';

import { useState, useEffect } from 'react';
import { Phone, FileText, ArrowUp, MessageCircle } from 'lucide-react';
import { useLenis } from 'lenis/react';

export default function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        lenis?.scrollTo(0);
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            lenis?.scrollTo(contactSection);
        }
    };

    return (
        <>
            {/* Mobile Bottom Bar */}
            <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-3 flex gap-2 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'} shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]`}>
                <a
                    href="#"
                    className="flex-1 bg-brand-yellow text-brand-emerald-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 text-sm"
                >
                    <MessageCircle size={18} />
                    카카오톡 상담
                </a>
                <a
                    href="tel:010-8215-6737"
                    className="flex-1 bg-brand-emerald-50 text-brand-emerald-700 font-bold py-3 rounded-lg flex items-center justify-center gap-2 text-sm"
                >
                    <Phone size={18} />
                    전화 상담
                </a>
                <button
                    onClick={scrollToContact}
                    className="flex-[1.5] bg-brand-emerald-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 text-sm"
                >
                    <FileText size={18} />
                    무료 견적 요청
                </button>
            </div>

            {/* Desktop Floating Buttons */}
            <div className={`hidden md:flex fixed bottom-8 right-8 z-50 flex-col items-end gap-4 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
                {/* Scroll to Top */}
                <button
                    onClick={scrollToTop}
                    className="bg-white text-gray-400 p-3 rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 hover:text-brand-emerald-600 transition-colors"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} />
                </button>

                {/* Kakao Button */}
                <a
                    href="#"
                    className="bg-brand-yellow text-brand-emerald-900 w-[180px] py-4 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 font-bold"
                    aria-label="Kakao Talk"
                >
                    <MessageCircle size={24} />
                    <span className="text-lg">카톡 상담</span>
                </a>

                {/* Call Button */}
                <a
                    href="tel:010-8215-6737"
                    className="bg-white text-brand-emerald-600 w-[180px] py-4 rounded-full shadow-xl border border-gray-100 hover:scale-105 transition-transform flex items-center justify-center gap-3 font-bold"
                    aria-label="Call Us"
                >
                    <Phone size={24} />
                    <span className="text-lg">전화 상담</span>
                </a>

                {/* Inquiry Button (Main) */}
                <button
                    onClick={scrollToContact}
                    className="group bg-brand-emerald-600 text-white w-[180px] py-4 rounded-full shadow-xl hover:bg-brand-emerald-700 transition-all hover:scale-105 flex items-center justify-center gap-3 font-bold"
                >
                    <FileText size={24} />
                    <span className="text-lg">견적 상담</span>
                </button>
            </div>
        </>
    );
}
