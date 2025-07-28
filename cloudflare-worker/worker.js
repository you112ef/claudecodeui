async function hasUsers(env) {
  const { results } = await env.DB.prepare('SELECT COUNT(*) as count FROM users WHERE is_active = 1').all();
  return results && results[0] && results[0].count > 0;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/auth/status') {
      const usersExist = await hasUsers(env);
      return new Response(JSON.stringify({
        needsSetup: !usersExist,
        isAuthenticated: false
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response('Not found', { status: 404 });
  }
}