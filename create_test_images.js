const fs = require('fs');
const path = require('path');

const createDummyImage = (name) => {
    // 1x1 pixel transparent GIF
    const header = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    fs.writeFileSync(path.join(process.cwd(), 'public', name), header);
};

createDummyImage('test_receipt_1.jpg');
createDummyImage('test_receipt_2.jpg');
createDummyImage('test_receipt_3.jpg');
console.log('Created 3 dummy images in public/');
