import axios from 'axios';

// export const API_BASE_URL = 'http://localhost:8080/wildwoolwales/v1'
const API_BASE_URL = 'http://WildWoolWAles-env.eba-fvftvdmu.us-east-1.elasticbeanstalk.com/wildwoolwales/v1'
const BRAND = 'wildwoolwales';

export class ApiError extends Error {
  constructor(status, message, fieldErrors) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Brand': BRAND,
  },
});

// Set from AuthContext whenever the token changes. Module-level because
// the interceptor below runs outside React and can't call useState.
let currentAccessToken = null;

export function setAccessToken(token) {
  currentAccessToken = token;
}

client.interceptors.request.use((config) => {
  console.log('Attaching token:', currentAccessToken)  // TEMP — remove after debugging
  if (currentAccessToken) {
    config.headers.Authorization = `Bearer ${currentAccessToken}`;
  }
  return config;
});

// Normalize Axios's error shape into ApiError, matching what
// GlobalExceptionHandler actually returns: { status, message, fieldErrors }
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      throw new ApiError(
        status,
        data?.message ?? 'Something went wrong',
        data?.fieldErrors ?? null
      );
    }
    throw new ApiError(0, 'Unable to reach the server', null);
  }
);

export const api = {
  register: (payload) => client.post('/auth/register', payload).then((r) => r.data),
  verifyEmail: (token) => client.post('/auth/verify-email', { token }).then((r) => r.data),
  resendVerification: (email) =>
    client.post('/auth/resend-verification', { email }).then((r) => r.data),
  login: (payload) => client.post('/auth/login', payload).then((r) => r.data),
  refresh: (refreshToken) =>
    client.post('/auth/refresh-token', { refreshToken }).then((r) => r.data),
  logout: (refreshToken) =>
    client.post('/auth/logout', { refreshToken }).then((r) => r.data),
  me: () => client.get('/auth/me').then((r) => r.data),
  getProducts: (page = 0, pageSize = 12) =>
    client.get('/products', { params: { page, pageSize } }).then((r) => r.data),
  getProduct: (slug) => client.get(`/products/${slug}`).then((r) => r.data),
  checkout: (items) => client.post('/payment/checkout', { items }).then((r) => r.data),
};