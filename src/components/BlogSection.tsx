'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface BlogPost {
    title: string;
    link: string;
    date: string;
    thumbnail: string;
}

export default function BlogSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    // Curated posts for restaurant owners (User Request)
    const BLOG_POSTS = [
        {
            title: '11월 제철 식자재 가이드: 김장철 배추, 무 가격 동향 분석',
            link: 'https://blog.naver.com/lki4234',
            date: '2024. 11. 20.',
            thumbnail: '/images/hero_slide_1.jpg'
        },
        {
            title: '식당 원가 절감 꿀팁: 식자재 로스율을 줄이는 올바른 보관법',
            link: 'https://blog.naver.com/lki4234',
            date: '2024. 11. 15.',
            thumbnail: '/images/hero_slide_2.jpg'
        },
        {
            title: '성원식자재가 알려주는 프랜차이즈 창업 성공 전략',
            link: 'https://blog.naver.com/lki4234',
            date: '2024. 11. 10.',
            thumbnail: '/images/hero_slide_3.jpg'
        }
    ];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/blog');
                const data = await res.json();
                if (data.items && data.items.length > 0) {
                    setPosts(data.items);
                } else {
                    // Fallback if API fails or no posts
                    setPosts(BLOG_POSTS);
                }
            } catch (error) {
                console.error('Failed to fetch blog posts:', error);
                setPosts(BLOG_POSTS);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);



    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="overflow-hidden">
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-emerald-900 leading-tight">
                            성원 이야기
                        </h2>
                    </div>
                    <Link
                        href="https://blog.naver.com/lki4234"
                        target="_blank"
                        className="group flex items-center gap-2 text-gray-600 hover:text-brand-emerald-600 transition-colors"
                    >
                        <span className="font-medium">블로그 더보기</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {loading ? (
                        // Loading Skeletons
                        [1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse" />
                        ))
                    ) : (
                        posts.map((post, index) => (
                            <Link
                                key={index}
                                href={post.link}
                                target="_blank"
                                className="group block bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Thumbnail */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={post.thumbnail}
                                        alt={post.title}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        unoptimized // Allow external images from Naver
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <span className="text-sm text-brand-emerald-600 font-semibold mb-3 block">
                                        {post.date}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-emerald-700 transition-colors">
                                        {post.title}
                                    </h3>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
