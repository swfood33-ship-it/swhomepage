const fs = require('fs');
const path = require('path');

async function testAnalyze() {
    const formData = new FormData();
    const filePath = path.join(process.cwd(), 'public', 'test_receipt_1.jpg');

    // Ensure file exists
    if (!fs.existsSync(filePath)) {
        console.error('Test file not found:', filePath);
        // Create dummy if missing
        fs.writeFileSync(filePath, Buffer.from('dummy'));
    }

    const fileBuffer = fs.readFileSync(filePath);
    const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
    formData.append('file', blob, 'test_receipt_1.jpg');

    console.log('Sending request to http://localhost:3000/api/analyze-receipt...');
    try {
        const response = await fetch('http://localhost:3000/api/analyze-receipt', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response JSON:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

testAnalyze();
