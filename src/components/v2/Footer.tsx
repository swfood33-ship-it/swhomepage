'use client';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold text-brand-emerald-600 mb-4">성원식자재</h3>
                        <p className="text-gray-500 leading-relaxed mb-6 max-w-md">
                            경기북부 식자재 유통의 새로운 기준.<br />
                            정직하게 사입하고, 투명하게 공급합니다.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-brand-emerald-600 hover:shadow-md transition-all border border-gray-100">
                                B
                            </a>
                            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-brand-emerald-600 hover:shadow-md transition-all border border-gray-100">
                                I
                            </a>
                            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-brand-emerald-600 hover:shadow-md transition-all border border-gray-100">
                                F
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">고객센터</h4>
                        <ul className="space-y-3 text-gray-500">
                            <li className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">1234-5678</span>
                            </li>
                            <li>평일 09:00 - 18:00</li>
                            <li>주말/공휴일 휴무</li>
                            <li>swfood@example.com</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">회사 정보</h4>
                        <ul className="space-y-3 text-gray-500 text-sm">
                            <li>(주)성원식자재</li>
                            <li>대표: 홍길동</li>
                            <li>사업자등록번호: 123-45-67890</li>
                            <li>경기도 포천시 가산면 ...</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Sungwon Food Materials. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
