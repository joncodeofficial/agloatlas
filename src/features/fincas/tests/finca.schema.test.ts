import { fincaSchema } from '@/features/fincas/schemas/finca.schema';

describe('fincaSchema', () => {
  it('parses a real API-shaped finca', () => {
    const apiFinca = {
      id: 1587,
      name: 'Finca La Esperanza',
      favourite: true,
      createdDate: '2025-03-10T09:00:00Z',
    };

    expect(fincaSchema.parse(apiFinca)).toEqual(apiFinca);
  });

  it('ignores unknown fields the API adds later (e.g. isLite)', () => {
    const apiFinca = {
      id: 1588,
      name: 'Finca Los Alamos',
      favourite: false,
      createdDate: '2025-01-01T00:00:00Z',
      isLite: true,
    };

    const result = fincaSchema.parse(apiFinca);

    expect(result).not.toHaveProperty('isLite');
  });

  it('rejects a finca with a non-boolean favourite', () => {
    const malformed = {
      id: 1589,
      name: 'Finca El Roble',
      favourite: 'true',
      createdDate: '2025-01-01T00:00:00Z',
    };

    expect(() => fincaSchema.parse(malformed)).toThrow();
  });

  it('rejects a finca missing required fields', () => {
    expect(() => fincaSchema.parse({ id: 1590 })).toThrow();
  });
});
