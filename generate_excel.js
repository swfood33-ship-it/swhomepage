const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const data = [
    ['품목', '단위', '원산지', '매입가', '비고'],
    ['양파 (특)', '15kg', '국산', '18,500', '가락시장 경매'],
    ['대파', '1단', '국산', '2,800', '신선도 최상'],
    ['마늘 (깐마늘)', '1kg', '국산', '6,500', '남도'],
    ['청양고추', '10kg', '국산', '45,000', '꼭지 제거'],
    ['감자 (왕왕)', '20kg', '국산', '32,000', '수미감자'],
    ['당근', '10kg', '중국산', '12,000', '세척'],
    ['배추', '3입/망', '국산', '8,000', '강원도 고랭지'],
    ['무', '1box', '국산', '15,000', '제주'],
    ['식용유', '18L', '오뚜기', '38,000', '업소용'],
    ['참기름', '1.8L', '오뚜기', '28,000', '고소한'],
];

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet(data);

// Add some styling (column widths)
ws['!cols'] = [
    { wch: 15 }, // 품목
    { wch: 10 }, // 단위
    { wch: 10 }, // 원산지
    { wch: 12 }, // 매입가
    { wch: 20 }, // 비고
];

XLSX.utils.book_append_sheet(wb, ws, '금주 매입가');

const outputDir = path.join(__dirname, 'public', 'data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

XLSX.writeFile(wb, path.join(outputDir, 'weekly_prices.xlsx'));
console.log('Sample Excel file created at public/data/weekly_prices.xlsx');
