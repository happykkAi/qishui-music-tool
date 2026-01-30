export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');

    // 预检请求处理 (解决 CORS)
    if (request.method === "OPTIONS") {
      return new Response(null, {  
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (!targetUrl) return new Response("缺少 url 参数", { status: 400 });

    try {
      // 深度模拟 iPhone 浏览器请求
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'zh-CN,zh;q=0.9',
          'Referer': 'https://qishui.douyin.com/',
          'Cache-Control': 'no-cache'
        },
        redirect: 'follow' // 必须跟随重定向
      });

      if (!response.ok) {
        return new Response(`汽水音乐响应错误: ${response.status}`, { 
          status: response.status,
          headers: { "Access-Control-Allow-Origin": "*" }
        });
      }

      const body = await response.text();
      
      return new Response(body, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/html;charset=UTF-8'
        }
      });
    } catch (e) {
      return new Response("Worker 内部错误: " + e.message, { 
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }
  }
};
