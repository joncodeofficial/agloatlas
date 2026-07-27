import { getAtlasDetail, listAtlas } from '@/features/atlas/services/atlas.service';
import { coreHttpClient } from '@/shared/config/httpClient';

jest.mock('@/shared/config/httpClient', () => ({
  coreHttpClient: { get: jest.fn() },
}));

const mockedGet = coreHttpClient.get as jest.Mock;

const atlasPage = {
  items: [],
  pageNumber: 3,
  totalPages: 6,
  totalCount: 53,
  hasPreviousPage: true,
  hasNextPage: true,
};

it('requests atlas pages using Init as the page number, not an offset', async () => {
  mockedGet.mockResolvedValueOnce({ data: atlasPage });

  await listAtlas(1590, 3);

  expect(mockedGet).toHaveBeenCalledWith('/systems/1590/Atlas/', { params: { Init: 3, Limit: 10 } });
});

it('requests a single atlas by finca id and imei', async () => {
  mockedGet.mockResolvedValueOnce({
    data: {
      imei: '860123456789012',
      name: 'Atlas Norte',
      expiredDate: '2027-01-01T00:00:00Z',
      batteryPercentage: 87,
      signalPercentage: 62,
      latitude: '40.4168',
      longitude: '-3.7038',
    },
  });

  await getAtlasDetail(1588, '860123456789012');

  expect(mockedGet).toHaveBeenCalledWith('/systems/1588/Atlas/860123456789012');
});
