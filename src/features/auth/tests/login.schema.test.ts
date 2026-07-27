import { loginCredentialsSchema, loginResponseSchema } from '@/features/auth/schemas/login.schema';

describe('loginCredentialsSchema', () => {
  it('accepts valid credentials', () => {
    const result = loginCredentialsSchema.parse({
      username: 'apppruebatecnica@spherag.com',
      password: 'Usuario2026!',
    });

    expect(result).toEqual({
      username: 'apppruebatecnica@spherag.com',
      password: 'Usuario2026!',
    });
  });

  it('rejects a missing password', () => {
    expect(() => loginCredentialsSchema.parse({ username: 'foo' })).toThrow();
  });
});

describe('loginResponseSchema', () => {
  it('parses a real API-shaped response', () => {
    const apiResponse = {
      accessToken: { token: 'abc.def.ghi', expiration: '2026-08-01T00:00:00Z' },
      refreshToken: { token: 'jkl.mno.pqr', expiration: '2026-08-08T00:00:00Z' },
    };

    expect(loginResponseSchema.parse(apiResponse)).toEqual(apiResponse);
  });

  it('rejects a response missing the access token', () => {
    const malformed = {
      refreshToken: { token: 'jkl.mno.pqr', expiration: '2026-08-08T00:00:00Z' },
    };

    expect(() => loginResponseSchema.parse(malformed)).toThrow();
  });
});
