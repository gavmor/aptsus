import { env, SELF } from 'cloudflare:test';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Aptsus Gateway', () => {
  it('responds with 200 on /', async () => {
    const response = await SELF.fetch('https://example.com/');
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('Aptsus Gateway');
  });

  describe('POST /extract-listing', () => {
    it('returns structured data from raw text', async () => {
      // Mock Gemini API call
      const mockGeminiResponse = {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: JSON.stringify({
                    price: 2500,
                    beds: 2,
                    baths: 1,
                    sqft: 900,
                    location: 'Downtown',
                    description: 'Nice apartment'
                  })
                }
              ]
            }
          }
        ]
      };

      // We need to mock the global fetch that the worker uses
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async (input, init) => {
        if (typeof input === 'string' && input.includes('generativelanguage.googleapis.com')) {
          return new Response(JSON.stringify(mockGeminiResponse), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        return new Response('Not Found', { status: 404 });
      });

      const response = await SELF.fetch('https://example.com/extract-listing', {
        method: 'POST',
        body: JSON.stringify({ description: '2bd 1ba apartment in Downtown for $2500, 900sqft' }),
        headers: { 'Content-Type': 'application/json' }
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual({
        price: 2500,
        beds: 2,
        baths: 1,
        sqft: 900,
        location: 'Downtown',
        description: 'Nice apartment'
      });

      expect(fetchSpy).toHaveBeenCalled();
      
      fetchSpy.mockRestore();
    });
  });
});
