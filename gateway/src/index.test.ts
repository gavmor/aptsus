import { env, SELF } from 'cloudflare:test';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Aptsus Gateway', () => {
  it('responds with 200 on /', async () => {
    const response = await SELF.fetch('https://example.com/');
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('Aptsus Gateway');
  });

  describe('Session Management', () => {
    it('POST /session with correct password sets a cookie', async () => {
      // Mock env for the test if possible, but SELF.fetch uses the real worker instance
      // In vitest-pool-workers, we can't easily mock env for SELF.fetch without complex setup
      // So we'll assume the worker uses GATEWAY_PASSWORD from wrangler.toml or similar.
      // For testing, we'll just test the logic.
      
      const response = await SELF.fetch('https://example.com/session', {
        method: 'POST',
        body: JSON.stringify({ password: 'test-password' }),
        headers: { 'Content-Type': 'application/json' }
      });

      // This will fail initially as /session is not implemented
      expect(response.status).toBe(200);
      expect(response.headers.get('Set-Cookie')).toContain('session=');
    });
  });

  describe('POST /extract-listing', () => {
    it('returns 401 without session cookie', async () => {
      const response = await SELF.fetch('https://example.com/extract-listing', {
        method: 'POST',
        body: JSON.stringify({ description: 'test' }),
        headers: { 'Content-Type': 'application/json' }
      });
      expect(response.status).toBe(401);
    });

    it('returns structured data with valid session cookie', async () => {
      const mockGeminiResponse = {
        candidates: [{ content: { parts: [{ text: JSON.stringify({ price: 1000 }) }] } }]
      };

      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
        return new Response(JSON.stringify(mockGeminiResponse), { status: 200 });
      });

      // Note: We need a way to generate a valid cookie for this test.
      // For now, we'll just expect 200 if we send *any* cookie if that's how we implement it,
      // or we first call /session.
      
      const sessionResponse = await SELF.fetch('https://example.com/session', {
        method: 'POST',
        body: JSON.stringify({ password: 'test-password' }),
        headers: { 'Content-Type': 'application/json' }
      });
      const cookie = sessionResponse.headers.get('Set-Cookie');

      const response = await SELF.fetch('https://example.com/extract-listing', {
        method: 'POST',
        body: JSON.stringify({ description: 'test' }),
        headers: { 
          'Content-Type': 'application/json',
          'Cookie': cookie || ''
        }
      });

      expect(response.status).toBe(200);
      fetchSpy.mockRestore();
    });
  });
});
