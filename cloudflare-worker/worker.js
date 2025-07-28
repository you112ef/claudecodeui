export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/auth/status') {
      return new Response(JSON.stringify({
        needsSetup: true,
        isAuthenticated: false
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response('Not found', { status: 404 });
  }
}