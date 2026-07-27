import axios, { AxiosError } from 'axios';
import { getAuthToken, loginRequest, logout, AUTH_QUERY_KEY } from '@/features/auth/services/auth.service';
import { queryClient } from '@/shared/lib/queryClient';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function axiosError(status: number): Error & { response: { status: number } } {
  return Object.assign(new Error('request failed'), { response: { status } });
}

describe('loginRequest error mapping', () => {
  beforeEach(() => {
    mockedAxios.isAxiosError.mockImplementation((e): e is AxiosError =>
      Boolean((e as { response?: unknown })?.response)
    );
  });

  it('maps a 400 to a credentials error', async () => {
    mockedAxios.post.mockRejectedValueOnce(axiosError(400));

    await expect(loginRequest({ username: 'a', password: 'b' })).rejects.toThrow(
      'Usuario o contraseña son incorrectos'
    );
  });

  it('maps a 401 to an unauthorized error', async () => {
    mockedAxios.post.mockRejectedValueOnce(axiosError(401));

    await expect(loginRequest({ username: 'a', password: 'b' })).rejects.toThrow('Usuario no autorizado');
  });

  it('maps any other failure to a generic error', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('network down'));

    await expect(loginRequest({ username: 'a', password: 'b' })).rejects.toThrow('No se pudo iniciar sesión');
  });
});

describe('session storage', () => {
  afterEach(() => {
    queryClient.clear();
  });

  it('getAuthToken reads the token from the cache', () => {
    queryClient.setQueryData(AUTH_QUERY_KEY, { accessToken: { token: 'abc' } });

    expect(getAuthToken()).toBe('abc');
  });

  it('logout clears the cached session', () => {
    queryClient.setQueryData(AUTH_QUERY_KEY, { accessToken: { token: 'abc' } });

    logout();

    expect(getAuthToken()).toBeUndefined();
  });
});
