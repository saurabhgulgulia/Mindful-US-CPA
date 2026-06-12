// Thin client for the auth API. In dev, Vite proxies `/api` to the Express
// server (see vite.config.js); in production set VITE_API_URL to the API origin.
const API_BASE = import.meta.env.VITE_API_URL || '/api';
const TOKEN_KEY = 'mucpa_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Could not reach the server. Is the API running?');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status}).`);
  }
  return data;
}

export async function login({ email, password }) {
  const data = await request('/auth/login', { method: 'POST', body: { email, password } });
  setToken(data.token);
  return data.user;
}

export async function signup({ email, password, phone, service, clientId }) {
  const data = await request('/auth/signup', {
    method: 'POST',
    body: { email, password, phone, service, clientId },
  });
  setToken(data.token);
  return data.user;
}

export async function fetchMe() {
  const data = await request('/auth/me', { auth: true });
  return data.user;
}

export function logout() {
  clearToken();
}
