import { describe, it, expect, vi, beforeEach } from 'vitest';
import { extractListingData } from '../data-extraction';

describe('Data Extraction Service', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('calls the domain-specific endpoint and returns structured data', async () => {
    const mockResponse = {
      price: 2500,
      beds: 2,
      baths: 1,
      sqft: 900,
      location: 'Downtown',
      description: 'Nice apartment'
    };

    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await extractListingData('2bd 1ba apartment in Downtown for $2500, 900sqft');

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/extract-listing'), expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ description: '2bd 1ba apartment in Downtown for $2500, 900sqft' }),
    }));
    expect(result).toEqual(mockResponse);
  });

  it('handles unauthorized errors', async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
      status: 401,
    });

    await expect(extractListingData('test')).rejects.toThrow('Unauthorized');
  });
});
