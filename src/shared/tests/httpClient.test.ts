import { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';
import { router } from 'expo-router';
import { getAuthToken, logout } from '@/features/auth/services/auth.service';
import { coreHttpClient } from '@/shared/config/httpClient';

jest.mock('expo-router', () => ({ router: { replace: jest.fn() } }));
jest.mock('@/features/auth/services/auth.service', () => ({
  getAuthToken: jest.fn(),
  logout: jest.fn(),
}));

const requestInterceptor = coreHttpClient.interceptors.request.handlers![0]!.fulfilled;
const responseErrorInterceptor = coreHttpClient.interceptors.response.handlers![0]!.rejected!;

function requestConfig(): InternalAxiosRequestConfig {
  return { headers: new AxiosHeaders() };
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('coreHttpClient request interceptor', () => {
  it('attaches the Bearer token when one is available', async () => {
    jest.mocked(getAuthToken).mockReturnValue('abc');

    const config = await requestInterceptor(requestConfig());

    expect(config.headers.Authorization).toBe('Bearer abc');
  });

  it('leaves the Authorization header untouched when there is no token', async () => {
    jest.mocked(getAuthToken).mockReturnValue(undefined);

    const config = await requestInterceptor(requestConfig());

    expect(config.headers.Authorization).toBeUndefined();
  });
});

describe('coreHttpClient response interceptor', () => {
  it('logs out and redirects to login on a 401', async () => {
    const error = { response: { status: 401 }, isAxiosError: true, toJSON: () => ({}) };

    await expect(responseErrorInterceptor(error)).rejects.toBe(error);
    expect(logout).toHaveBeenCalled();
    expect(router.replace).toHaveBeenCalledWith('/');
  });

  it('does not log out on other errors', async () => {
    const error = { response: { status: 500 }, isAxiosError: true, toJSON: () => ({}) };

    await expect(responseErrorInterceptor(error)).rejects.toBe(error);
    expect(logout).not.toHaveBeenCalled();
  });
});
