const fs = require('fs');
const path = require('path');
const https = require('https');

// Load env
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const apiKeyMatch = envContent.match(/OPENAI_API_KEY=(.+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

if (!apiKey) {
    console.error("API Key not found in .env.local");
    process.exit(1);
}

console.log("Testing API Key:", apiKey.substring(0, 10) + "...");

const data = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello" }]
});

const options = {
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log("Status:", res.statusCode);
        console.log("Body:", body);
    });
});

req.on('error', (e) => {
    console.error("Request error:", e);
});

req.write(data);
req.end();
