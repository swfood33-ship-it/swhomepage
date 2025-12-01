export default function SiteFooter() {
    return (
        <footer className="bg-brand-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">성원식자재</h2>
                        <p className="text-gray-400">가락시장 직매입, 주 6회 새벽배송, 투명한 가격</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end gap-2">
                        <a href="tel:031-841-5000" className="text-xl font-bold text-brand-yellow">031-841-5000</a>
                        <a href="/pricing" className="text-sm text-gray-400 hover:text-brand-yellow transition-colors underline">파트너 매입가 확인</a>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-sm text-gray-400 space-y-1">
                    <p>상호명 : 성원식자재 | 대표자 : 김은정</p>
                    <p>사업자등록번호 : 127-46-39735 | 영업신고 : 제 2017-0285506 호</p>
                    <p>주소 : 경기도 양주시 평화로1261번길 74-2 (산북동)</p>
                    <p>이메일 : jjkk7179@hometax.go.kr | 고객센터 : 031-841-5000</p>
                    <p className="mt-4 text-gray-500 flex justify-between items-center">
                        <span>&copy; {new Date().getFullYear()} 성원식자재. All rights reserved.</span>
                        <a href="/admin" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">관리자</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
