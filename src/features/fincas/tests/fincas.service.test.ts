import { listFincas } from '@/features/fincas/services/fincas.service';
import { coreHttpClient } from '@/shared/config/httpClient';

jest.mock('@/shared/config/httpClient', () => ({
  coreHttpClient: { get: jest.fn() },
}));

const mockedGet = coreHttpClient.get as jest.Mock;

it('requests the fincas list from the right endpoint', async () => {
  mockedGet.mockResolvedValueOnce({
    data: [{ id: 1587, name: 'Finca La Esperanza', favourite: true, createdDate: '2025-03-10T09:00:00Z' }],
  });

  const fincas = await listFincas();

  expect(mockedGet).toHaveBeenCalledWith('/System/List');
  expect(fincas).toEqual([
    { id: 1587, name: 'Finca La Esperanza', favourite: true, createdDate: '2025-03-10T09:00:00Z' },
  ]);
});
