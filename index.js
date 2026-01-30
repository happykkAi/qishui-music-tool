export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');

    // 1. 核心：处理跨域预检 (CORS Preflight)
    // 浏览器在正式请求前会发一个 OPTIONS 请求，如果不处理就会报“响应异常”
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (!targetUrl) return new Response("Missing URL", { status: 400, headers: corsHeaders });

    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
          'Referer': 'https://qishui.douyin.com/'
        }
      });

      const body = await response.text();
      
      // 2. 返回结果时必须再次附带 corsHeaders
      return new Response(body, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/html;charset=UTF-8'
        }
      });
    } catch (e) {
      return new Response("Error: " + e.message, { 
        status: 500, 
        headers: corsHeaders 
      });
    }
  }
};
