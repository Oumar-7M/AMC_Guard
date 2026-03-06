// src/services/api.ts
export async function authFetch(
  url: string,
  token: string,
  options: RequestInit = {}
) {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true", //  LA LIGNE MAGIQUE a enlever apres
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
}
