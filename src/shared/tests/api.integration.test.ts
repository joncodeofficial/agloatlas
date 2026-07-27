import { AUTH_QUERY_KEY, loginRequest } from '@/features/auth/services/auth.service';
import { getAtlasDetail, listAtlas } from '@/features/atlas/services/atlas.service';
import { listFincas } from '@/features/fincas/services/fincas.service';
import { queryClient } from '@/shared/lib/queryClient';

// Test fincas provisioned for this technical test: 1587 (favourite, no atlas),
// 1588 (1 atlas), 1590 (53 atlas across 6 pages).
const EMPTY_FINCA_ID = 1587;
const SINGLE_ATLAS_FINCA_ID = 1588;
const PAGINATED_FINCA_ID = 1590;

const username = process.env.TEST_ACCOUNT_USERNAME;
const password = process.env.TEST_ACCOUNT_PASSWORD;
const describeWithRealApi = username && password ? describe : describe.skip;

describeWithRealApi('Spherag API (real network)', () => {
  beforeAll(async () => {
    const session = await loginRequest({ username: username!, password: password! });
    queryClient.setQueryData(AUTH_QUERY_KEY, { ...session, username });
  });

  afterAll(() => {
    queryClient.clear();
  });

  it('lists the fincas for the test account', async () => {
    const fincas = await listFincas();

    expect(fincas.find((finca) => finca.id === PAGINATED_FINCA_ID)).toBeDefined();
  });

  it('paginates a finca with many atlas', async () => {
    const page = await listAtlas(PAGINATED_FINCA_ID, 1);

    expect(page.pageNumber).toBe(1);
    expect(page.hasNextPage).toBe(true);
    expect(page.items.length).toBeLessThanOrEqual(10);
  });

  it('returns an empty page for a finca with no atlas', async () => {
    const page = await listAtlas(EMPTY_FINCA_ID, 1);

    expect(page.items).toEqual([]);
    expect(page.hasNextPage).toBe(false);
  });

  it('fetches the detail of a real atlas, including its location', async () => {
    const page = await listAtlas(SINGLE_ATLAS_FINCA_ID, 1);
    const [atlas] = page.items;
    expect(atlas).toBeDefined();

    const detail = await getAtlasDetail(SINGLE_ATLAS_FINCA_ID, atlas.imei);

    expect(detail.imei).toBe(atlas.imei);
    expect(detail.latitude).toEqual(expect.any(String));
    expect(detail.longitude).toEqual(expect.any(String));
  });
});
