export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
      return new Response("Missing url parameter", { status: 400 });
    }

    const headers = {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16.0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
      'Referer': 'https://qishui.douyin.com/',
    };

    try {
      const response = await fetch(targetUrl, { headers });
      const body = await response.text();
      
      return new Response(body, {
        headers: {
          'Access-Control-Allow-Origin': '*', // 允许 GitHub Pages 调用
          'Content-Type': 'text/html;charset=UTF-8'
        }
      });
    } catch (e) {
      return new Response("Proxy Error: " + e.message, { status: 500 });
    }
  }
};
