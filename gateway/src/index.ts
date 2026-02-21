export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/') {
      return new Response('Aptsus Gateway', { status: 200 });
    }
    return new Response('Not Found', { status: 404 });
  },
};
