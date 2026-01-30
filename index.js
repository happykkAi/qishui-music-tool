export default {
  async fetch(request, env) {
    // 1. 定义最强 CORS 响应头
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Max-Age": "86400",
    };

    // 2. 处理浏览器的预检请求 (OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');
    if (!targetUrl) return new Response("Error: Missing URL", { status: 400, headers: corsHeaders });

    try {
      // 3. 抓取数据
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
          'Referer': 'https://qishui.douyin.com/'
        }
      });

      const body = await response.text();
      
      // 4. 返回给前端，并强制带上 CORS 头
      return new Response(body, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/html;charset=UTF-8"
        }
      });
    } catch (e) {
      return new Response("Worker Error: " + e.message, { 
        status: 500, 
        headers: corsHeaders 
      });
    }
  }
};
