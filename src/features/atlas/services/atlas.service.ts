import { coreHttpClient } from "@/shared/config/httpClient";
import { atlasPageSchema, type AtlasPage } from "../schemas/atlas.schema";

const PAGE_SIZE = 10;

export async function listAtlas(
  fincaId: number,
  page: number,
): Promise<AtlasPage> {
  const { data } = await coreHttpClient.get(`/systems/${fincaId}/Atlas/`, {
    params: { Init: page, Limit: PAGE_SIZE },
  });

  return atlasPageSchema.parse(data);
}
