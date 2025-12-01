'use client';

import { useState, useEffect } from 'react';
import { Phone, FileText, ArrowUp } from 'lucide-react';
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
        <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
            {/* Scroll to Top */}
            <button
                onClick={scrollToTop}
                className="bg-white text-gray-600 p-3 rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 hover:text-brand-emerald-600 transition-colors"
                aria-label="Scroll to top"
            >
                <ArrowUp size={20} />
            </button>

            {/* Call Button */}
            <a
                href="tel:031-841-5000"
                className="bg-white text-brand-emerald-600 p-3 rounded-full shadow-lg border border-gray-100 hover:bg-brand-emerald-50 transition-colors flex items-center justify-center"
                aria-label="Call Us"
            >
                <Phone size={20} />
            </a>

            {/* Inquiry Button (Main) */}
            <button
                onClick={scrollToContact}
                className="bg-brand-emerald-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-brand-emerald-700 transition-colors flex items-center gap-2 font-bold"
            >
                <FileText size={20} />
                <span>견적문의</span>
            </button>
        </div>
    );
}
