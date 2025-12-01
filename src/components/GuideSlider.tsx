'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface GuideStep {
    title: string;
    description: string;
    image: string;
    alt: string;
    cursorPosition?: { x: number; y: number }; // Percentage 0-100
}

interface GuideSliderProps {
    steps: GuideStep[];
    autoPlayDuration?: number; // ms
}

export default function GuideSlider({ steps, autoPlayDuration = 5000 }: GuideSliderProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    // Auto-play logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                handleStepChange((currentStep + 1) % steps.length);
            }, autoPlayDuration);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentStep, autoPlayDuration, steps.length]);

    // Progress bar animation
    useGSAP(() => {
        if (isPlaying && progressRef.current) {
            gsap.fromTo(progressRef.current,
                { width: '0%' },
                { width: '100%', duration: autoPlayDuration / 1000, ease: 'none' }
            );
        } else if (progressRef.current) {
            gsap.killTweensOf(progressRef.current);
            gsap.set(progressRef.current, { width: '0%' });
        }
    }, [currentStep, isPlaying, autoPlayDuration]);

    const handleStepChange = (index: number) => {
        if (index === currentStep) return;

        // Animate out
        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentStep(index);
                // Animate in
                gsap.fromTo(imageRef.current,
                    { opacity: 0, scale: 1.05 },
                    { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
                );
                gsap.fromTo(textRef.current,
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.5, delay: 0.1, ease: 'power2.out' }
                );

                // Cursor Animation
                if (steps[index].cursorPosition && cursorRef.current) {
                    gsap.fromTo(cursorRef.current,
                        { opacity: 0, scale: 2, x: `${steps[index].cursorPosition?.x}%`, y: `${steps[index].cursorPosition?.y}%` },
                        { opacity: 1, scale: 1, duration: 0.5, delay: 0.5, ease: 'back.out(1.7)' }
                    );
                    // Click effect
                    gsap.to(cursorRef.current, {
                        scale: 0.8,
                        duration: 0.1,
                        delay: 1.2,
                        yoyo: true,
                        repeat: 1
                    });
                }
            }
        });

        tl.to(imageRef.current, { opacity: 0, duration: 0.3 })
            .to(textRef.current, { opacity: 0, x: 20, duration: 0.2 }, '<');
    };

    return (
        <div ref={containerRef} className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative group">
            <div className="grid md:grid-cols-12 min-h-[600px]">
                {/* Left: Navigation & Text */}
                <div className="md:col-span-4 p-8 md:p-12 flex flex-col bg-white relative z-10 border-r border-gray-100">
                    <div className="flex-grow flex flex-col justify-center space-y-8">
                        {/* Step Indicators */}
                        <div className="flex space-x-2 mb-4">
                            {steps.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setIsPlaying(false);
                                        handleStepChange(idx);
                                    }}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${currentStep === idx
                                            ? 'w-8 bg-brand-emerald-600'
                                            : 'w-2 bg-gray-200 hover:bg-gray-300'
                                        }`}
                                    aria-label={`Go to step ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Content */}
                        <div ref={textRef}>
                            <div className="inline-block px-3 py-1 rounded-lg bg-brand-emerald-50 text-brand-emerald-700 font-bold text-sm mb-4 border border-brand-emerald-100">
                                STEP {currentStep + 1}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                                {steps[currentStep].title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {steps[currentStep].description}
                            </p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-emerald-600 transition-colors"
                        >
                            {isPlaying ? (
                                <>
                                    <span className="w-2 h-2 rounded-full bg-brand-emerald-500 animate-pulse"></span>
                                    자동 재생 중
                                </>
                            ) : (
                                <>
                                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                                    일시 정지
                                </>
                            )}
                        </button>

                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setIsPlaying(false);
                                    handleStepChange((currentStep - 1 + steps.length) % steps.length);
                                }}
                                className="p-3 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={() => {
                                    setIsPlaying(false);
                                    handleStepChange((currentStep + 1) % steps.length);
                                }}
                                className="p-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Image Display */}
                <div className="md:col-span-8 bg-gray-900 relative overflow-hidden flex items-center justify-center">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-20">
                        <div ref={progressRef} className="h-full bg-brand-emerald-500"></div>
                    </div>

                    <div ref={imageRef} className="relative w-full h-full min-h-[400px]">
                        <Image
                            src={steps[currentStep].image}
                            alt={steps[currentStep].alt}
                            fill
                            className="object-contain"
                        />

                        {/* Cursor Overlay */}
                        {steps[currentStep].cursorPosition && (
                            <div
                                ref={cursorRef}
                                className="absolute w-12 h-12 pointer-events-none z-30 drop-shadow-xl"
                                style={{
                                    left: `${steps[currentStep].cursorPosition.x}%`,
                                    top: `${steps[currentStep].cursorPosition.y}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 3.5L11.5 19.5L14.5 12.5L21.5 9.5L5.5 3.5Z" fill="white" stroke="black" strokeWidth="2" strokeLinejoin="round" />
                                </svg>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                    Click!
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
