import { env, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';

describe('Aptsus Gateway', () => {
  it('responds with 200 on /', async () => {
    const response = await SELF.fetch('https://example.com/');
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('Aptsus Gateway');
  });
});
