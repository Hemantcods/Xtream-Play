const API_URL = 'http://localhost:3001/api'

export async function apiFetch(
  endpoint: string,
  options?: RequestInit
) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}