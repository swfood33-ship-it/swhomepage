'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

const heroImages = [
    '/images/hero_slide_1.jpg',      // 1. 가락시장 전경 (User Upload)
    '/images/hero_slide_2.jpg',      // 2. 트럭 상차 (User Upload)
    '/images/hero_slide_3.jpg',      // 3. 창고 소분 (User Upload)
    '/images/hero_slide_4.jpg',      // 4. 도로 주행 (User Upload)
    '/images/hero_slide_5.jpg'       // 5. 주방 도착 (User Upload)
];

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial Text Animation
            const tl = gsap.timeline();
            tl.to(headlineRef.current, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power4.out',
            })
                .from(subRef.current, {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                }, '-=0.5')
                .from(scrollRef.current, {
                    y: 10,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power3.out',
                }, '-=0.3');

            // Scroll hint animation
            gsap.to(scrollRef.current, {
                y: 10,
                repeat: -1,
                yoyo: true,
                duration: 1.5,
                ease: 'power1.inOut',
            });

            // Slideshow Animation - Smooth Crossfade with Zoom
            const slideDuration = 5; // Longer display time
            const fadeDuration = 1.5; // Smooth fade
            const totalSlides = heroImages.length;

            // Initialize
            slidesRef.current.forEach((slide, i) => {
                if (slide) {
                    gsap.set(slide, {
                        opacity: i === 0 ? 1 : 0,
                        zIndex: i === 0 ? 2 : 1,
                        scale: 1.1 // Start slightly zoomed in
                    });
                }
            });

            const slideshowTl = gsap.timeline({ repeat: -1 });

            heroImages.forEach((_, i) => {
                const currentSlide = slidesRef.current[i];
                const nextSlide = slidesRef.current[(i + 1) % totalSlides];

                if (!currentSlide || !nextSlide) return;

                // Animate current slide (Zoom out slightly while visible)
                slideshowTl.to(currentSlide, {
                    scale: 1,
                    duration: slideDuration,
                    ease: "none"
                }, i * slideDuration);

                // Animate next slide in (Fade in + Zoom reset)
                slideshowTl.to(nextSlide, {
                    opacity: 1,
                    zIndex: 2,
                    duration: fadeDuration,
                    ease: "power2.inOut",
                    onStart: () => {
                        gsap.set(nextSlide, { scale: 1.1, zIndex: 2 }); // Reset scale for next slide
                        gsap.set(currentSlide, { zIndex: 1 }); // Lower current slide z-index
                    }
                }, (i + 1) * slideDuration - fadeDuration);

                // Reset current slide after transition
                slideshowTl.to(currentSlide, {
                    opacity: 0,
                    zIndex: 0,
                    duration: 0
                }, (i + 1) * slideDuration);
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-emerald-900 text-white">
            {/* Background Slideshow */}
            <div className="absolute inset-0 z-0">
                {heroImages.map((src, index) => (
                    <div
                        key={index}
                        ref={(el) => { slidesRef.current[index] = el }}
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
                        style={{ backgroundImage: `url(${src})` }}
                    />
                ))}
                <div className="absolute inset-0 bg-black/50 z-10" /> {/* Dark Overlay */}
            </div>

            <div className="relative z-20 container mx-auto px-4 text-center">
                <div className="overflow-hidden mb-6">
                    <h1 ref={headlineRef} className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight transform translate-y-full">
                        20년 신뢰의 이름,<br />
                        식자재 유통의 <span className="text-brand-yellow">표준</span>을 세우다.
                    </h1>
                </div>
                <div ref={subRef} className="space-y-8">
                    <p className="text-lg md:text-xl text-gray-200 font-light">
                        가락시장 직매입 · 주 6회 새벽배송 · 매입가 공개
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="#contact"
                            className="px-8 py-4 bg-brand-yellow text-brand-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-yellow-400/50 hover:scale-105 active:scale-95"
                        >
                            견적 요청하기
                        </Link>
                        <a
                            href="tel:010-8215-6737"
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            전화 문의 010-8215-6737
                        </a>
                    </div>
                </div>
            </div>

            <div ref={scrollRef} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-20">
                <p className="text-sm text-gray-300 mb-2">SCROLL</p>
                <svg className="w-6 h-6 mx-auto text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
