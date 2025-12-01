'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function TeamGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(gridRef.current!.children, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-gray-900 text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <p className="text-brand-emerald-400 text-sm font-bold tracking-widest uppercase mb-2">
                            TEAM & WAREHOUSE
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            성원의 <span className="text-brand-emerald-400">24시간</span>은<br />
                            멈추지 않습니다
                        </h2>
                        <p className="text-gray-400 max-w-md">
                            최상의 신선도를 위해 밤낮없이 움직이는 성원식자재 물류센터의 생생한 현장입니다.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="text-right">
                            <div className="text-4xl font-bold text-brand-emerald-400 mb-1">1,200평</div>
                            <div className="text-sm text-gray-500">물류센터 규모</div>
                        </div>
                    </div>
                </div>

                {/* Grid Layout */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px]">
                    {/* Main Large Image - Warehouse */}
                    <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group">
                        <Image
                            src="/images/warehouse_interior.png"
                            alt="성원식자재 대형 물류 센터"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <span className="text-brand-emerald-400 font-bold mb-2 block">01. SCALE</span>
                            <h3 className="text-2xl font-bold text-white mb-2">압도적인 물류 규모</h3>
                            <p className="text-gray-200">3,000평 규모의 선진화된 물류 센터</p>
                        </div>
                    </div>

                    {/* Top Right - Worker Inspection */}
                    <div className="md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden group">
                        <Image
                            src="/images/worker_inspection.png"
                            alt="꼼꼼한 검수 시스템"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        <div className="absolute bottom-0 left-0 p-6">
                            <span className="text-brand-emerald-400 font-bold mb-1 block text-sm">02. QUALITY</span>
                            <h3 className="text-lg font-bold text-white">철저한 검수</h3>
                        </div>
                    </div>

                    {/* Bottom Right - Cold Storage */}
                    <div className="md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden group">
                        <Image
                            src="/images/cold_storage.png"
                            alt="최적 온도 콜드체인"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        <div className="absolute bottom-0 left-0 p-6">
                            <span className="text-brand-emerald-400 font-bold mb-1 block text-sm">03. FRESH</span>
                            <h3 className="text-lg font-bold text-white">콜드체인 시스템</h3>
                        </div>
                    </div>

                    {/* Side Vertical - Delivery Trucks (Dawn) */}
                    <div className="md:col-span-1 md:row-span-2 relative rounded-3xl overflow-hidden group">
                        <Image
                            src="/images/delivery_trucks.png"
                            alt="새벽 배송 시스템"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <span className="text-brand-emerald-400 font-bold mb-2 block">04. DELIVERY</span>
                            <h3 className="text-2xl font-bold text-white mb-2">멈추지 않는 24시</h3>
                            <p className="text-gray-200">새벽을 여는 신속 정확 배송</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
