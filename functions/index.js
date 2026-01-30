// functions/index.js
export async function onRequest(context) {
    const url = new URL(context.request.url);
    const targetUrl = url.searchParams.get('url');

    // 如果没有传 url 参数，返回 400
    if (!targetUrl) {
        return new Response("Missing url parameter", { status: 400 });
    }

    const headers = {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        'Referer': 'https://qishui.douyin.com/',
        'Accept-Language': 'zh-CN,zh;q=0.9'
    };

    try {
        const response = await fetch(targetUrl, { headers });
        const body = await response.text();
        
        // 核心：必须返回跨域头 (CORS)，否则 GitHub Pages 无法读取
        return new Response(body, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/html;charset=UTF-8'
            }
        });
    } catch (e) {
        return new Response("Proxy Error: " + e.message, { status: 500 });
    }
}
