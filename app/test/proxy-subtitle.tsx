// pages/api/proxy-subtitle.js 或 app/api/proxy-subtitle/route.js (如果使用App Router)

export async function GET(request: Request) {
  const url = new URL(request.url);
  const fileUrl = url.searchParams.get('url');
  
  if (!fileUrl) {
    return new Response('Missing URL parameter', { status: 400 });
  }

  try {
    const response = await fetch(fileUrl);
    const text = await response.text();
    
    return new Response(text, {
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response('Error fetching subtitle', { status: 500 });
  }
}