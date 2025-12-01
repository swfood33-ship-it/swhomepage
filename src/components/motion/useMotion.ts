'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function useMotion() {
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);
}
