const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || 'http://localhost:8787';

export const login = async (password: string): Promise<void> => {
  const response = await fetch(`${GATEWAY_URL}/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    throw new Error('Unauthorized');
  }
};

export const extractListingData = async (description: string) => {
  const response = await fetch(`${GATEWAY_URL}/extract-listing`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error('Extraction failed');
  }

  return response.json();
};

export const estimateCommutes = async (address: string, destinations: any[]) => {
  const response = await fetch(`${GATEWAY_URL}/estimate-commutes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ address, destinations }),
  });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error('Commute estimation failed');
  }

  return response.json();
};

export const analyzeListing = async (listing: any, priorities: string) => {
  const response = await fetch(`${GATEWAY_URL}/analyze-listing`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ listing, priorities }),
  });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error('Analysis failed');
  }

  return response.json();
};
