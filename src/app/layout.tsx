import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/motion/lenis";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "성원식자재 - 식당·프렌차이즈·급식·관공서 식자재 납품 전문",
  description: "가락시장 직매입, 주 6회 새벽배송. 프렌차이즈 본사 물류계약, 식당, 급식, 관공서, 군부대 B2B 식자재 유통 전문. 투명한 가격과 신선한 품질을 약속드립니다.",
  keywords: [
    "식자재유통", "프렌차이즈물류", "프렌차이즈본사", "물류계약", "업소용식자재",
    "식자재도매", "학교급식납품", "관공서식자재", "군부대납품", "어린이집간식",
    "식당창업", "가락시장직매입", "새벽배송", "성원식자재", "식자재납품"
  ],
  openGraph: {
    title: "성원식자재 - 프렌차이즈·식당 B2B 식자재 파트너",
    description: "프렌차이즈 본사 물류계약 및 식자재 유통 전문. 가락시장 직매입으로 더 신선하고 저렴하게 공급합니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "성원식자재",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WholesaleStore",
  "name": "성원식자재",
  "image": "https://swfood.co.kr/images/logo.png", // Placeholder, ideally real URL
  "description": "식당, 급식, 관공서, 학교, 군부대 대상 B2B 식자재 유통 전문 기업",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "경기도 의정부시 산단로 76번길 89",
    "addressLocality": "의정부시",
    "addressRegion": "경기도",
    "postalCode": "11781",
    "addressCountry": "KR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.7381, // Approximate coords for Uijeongbu industrial area
    "longitude": 127.0337
  },
  "url": "https://swfood.co.kr",
  "telephone": "031-841-5000",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$"
};

import FloatingCTA from "@/components/FloatingCTA";

// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-brand-gray-900`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LenisProvider>
          <SiteHeader />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <FloatingCTA />
          <SiteFooter />
        </LenisProvider>
      </body>
    </html>
  );
}
