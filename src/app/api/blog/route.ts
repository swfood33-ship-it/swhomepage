import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const RSS_URL = 'https://rss.blog.naver.com/lki4234.xml';
        const response = await fetch(RSS_URL);
        const xmlText = await response.text();

        // Simple Regex Parsing for RSS (avoiding external dependencies)
        const items = [];
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match;

        while ((match = itemRegex.exec(xmlText)) !== null) {
            const itemContent = match[1];

            const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || itemContent.match(/<title>(.*?)<\/title>/);
            const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
            const dateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
            const descriptionMatch = itemContent.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || itemContent.match(/<description>(.*?)<\/description>/);

            // Extract first image from description or other tags
            let thumbnail = '/images/placeholder_blog.jpg'; // Default

            // 1. Try to find <thumbUrl> (Naver specific)
            const thumbMatch = itemContent.match(/<thumbUrl>(.*?)<\/thumbUrl>/);
            if (thumbMatch) {
                thumbnail = thumbMatch[1];
            } else if (descriptionMatch) {
                // 2. Try to find <img> in description
                // Look for src="URL" with various quote styles or no quotes
                const imgMatch = descriptionMatch[1].match(/<img[^>]+src=['"]([^'"]+)['"]/i);
                if (imgMatch) {
                    thumbnail = imgMatch[1];
                }
            }

            if (titleMatch && linkMatch && dateMatch) {
                items.push({
                    title: titleMatch[1],
                    link: linkMatch[1],
                    date: new Date(dateMatch[1]).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
                    thumbnail: thumbnail
                });
            }

            if (items.length >= 3) break; // Limit to 3 items
        }

        return NextResponse.json({ items });
    } catch (error) {
        console.error('Error fetching blog RSS:', error);
        return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }
}
