export interface Env {
  GEMINI_API_KEY: string;
  GATEWAY_PASSWORD?: string;
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    
    // Health check
    if (url.pathname === '/' && request.method === 'GET') {
      return new Response('Aptsus Gateway', { status: 200 });
    }

    // Session creation
    if (url.pathname === '/session' && request.method === 'POST') {
      const { password } = (await request.json()) as { password: string };
      const expectedPassword = env.GATEWAY_PASSWORD || 'test-password';
      
      if (password === expectedPassword) {
        // Minimum viable session: just a fixed token for now
        // In a real app, this should be a cryptographically secure random string or JWT
        const sessionToken = 'valid-session-token';
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `session=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/`,
          },
        });
      }
      return new Response('Unauthorized', { status: 401 });
    }

    // Protected endpoints
    if (url.pathname === '/extract-listing' && request.method === 'POST') {
      // Check for session cookie
      const cookie = request.headers.get('Cookie');
      if (!cookie || !cookie.includes('session=valid-session-token')) {
        return new Response('Unauthorized', { status: 401 });
      }

      const { description } = (await request.json()) as { description: string };
      if (!description) {
        return new Response('Missing description', { status: 400 });
      }
      
      const prompt = `Extract structured apartment listing data from the following text: "${description}". Return JSON with the following fields: price (number), beds (number), baths (number), sqft (number), location (string), description (string).`;

      const response = await fetch(`${GEMINI_API_URL}?key=${env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        return new Response('Gemini API Error', { status: response.status });
      }

      const geminiData = (await response.json()) as any;
      const responseText = geminiData.candidates[0].content.parts[0].text;
      
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const structuredData = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(responseText);

      return new Response(JSON.stringify(structuredData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};
