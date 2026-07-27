import { atlasDetailSchema, atlasPageSchema, atlasSchema } from '@/features/atlas/schemas/atlas.schema';

describe('atlasSchema', () => {
  it('parses a real API-shaped atlas', () => {
    const apiAtlas = {
      imei: '860123456789012',
      name: 'Atlas Norte',
      expiredDate: '2027-01-01T00:00:00Z',
      batteryPercentage: 87,
      signalPercentage: 62,
    };

    expect(atlasSchema.parse(apiAtlas)).toEqual(apiAtlas);
  });

  it('rejects a missing imei', () => {
    const malformed = {
      name: 'Atlas Norte',
      expiredDate: '2027-01-01T00:00:00Z',
      batteryPercentage: 87,
      signalPercentage: 62,
    };

    expect(() => atlasSchema.parse(malformed)).toThrow();
  });
});

describe('atlasPageSchema', () => {
  it('parses a paginated response', () => {
    const apiPage = {
      items: [
        {
          imei: '860123456789012',
          name: 'Atlas Norte',
          expiredDate: '2027-01-01T00:00:00Z',
          batteryPercentage: 87,
          signalPercentage: 62,
        },
      ],
      pageNumber: 1,
      totalPages: 6,
      totalCount: 53,
      hasPreviousPage: false,
      hasNextPage: true,
    };

    expect(atlasPageSchema.parse(apiPage)).toEqual(apiPage);
  });

  it('accepts an empty items array (0-atlas finca)', () => {
    const apiPage = {
      items: [],
      pageNumber: 1,
      totalPages: 0,
      totalCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    };

    expect(atlasPageSchema.parse(apiPage)).toEqual(apiPage);
  });

  it('rejects a page missing pagination metadata', () => {
    expect(() => atlasPageSchema.parse({ items: [] })).toThrow();
  });
});

describe('atlasDetailSchema', () => {
  it('parses a detail response including coordinates', () => {
    const apiDetail = {
      imei: '860123456789012',
      name: 'Atlas Norte',
      expiredDate: '2027-01-01T00:00:00Z',
      batteryPercentage: 87,
      signalPercentage: 62,
      latitude: '40.4168',
      longitude: '-3.7038',
    };

    expect(atlasDetailSchema.parse(apiDetail)).toEqual(apiDetail);
  });

  it('rejects a detail missing coordinates', () => {
    const malformed = {
      imei: '860123456789012',
      name: 'Atlas Norte',
      expiredDate: '2027-01-01T00:00:00Z',
      batteryPercentage: 87,
      signalPercentage: 62,
    };

    expect(() => atlasDetailSchema.parse(malformed)).toThrow();
  });
});
