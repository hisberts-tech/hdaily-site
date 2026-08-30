// In dev, requests go to "/api" and Vite proxies them to the backend (see
// vite.config.ts). In production set VITE_API_URL to the deployed API origin.
const BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

const TOKEN_KEY = 'hdaily-admin-token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 204) return undefined as T;

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = (body && (body.error as string)) || `Request failed (${res.status})`;
    throw new ApiError(res.status, message);
  }
  return body as T;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: 'customer' | 'admin';
}

export interface BulkOption {
  unit: string;
  price: number;
  minQty: number;
}

export interface Product {
  id: number;
  name: string;
  category: 'frais' | 'alimentaires' | 'quotidiens';
  price: number;
  unit: string;
  image: string;
  description: string;
  stock: number;
  badge?: string | null;
  bulk?: BulkOption;
}

export interface ProductPayload {
  name: string;
  category: 'frais' | 'alimentaires' | 'quotidiens';
  price: number;
  unit: string;
  image: string;
  description: string;
  stock: number;
  badge?: string;
  bulkUnit?: string | null;
  bulkPrice?: number | null;
  bulkMinQty?: number | null;
}

export const api = {
  login: (email: string, password: string) =>
    request<{ token: string; user: AuthUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<AuthUser>('/auth/me'),

  listProducts: () => request<Product[]>('/products'),
  createProduct: (payload: ProductPayload) =>
    request<Product>('/products', { method: 'POST', body: JSON.stringify(payload) }),
  updateProduct: (id: number, payload: Partial<ProductPayload>) =>
    request<Product>(`/products/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  deleteProduct: (id: number) => request<void>(`/products/${id}`, { method: 'DELETE' }),
};
