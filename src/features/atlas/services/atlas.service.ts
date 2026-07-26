import { coreHttpClient } from "@/shared/config/httpClient";
import {
  atlasDetailSchema,
  atlasPageSchema,
  type AtlasDetail,
  type AtlasPage,
} from "../schemas/atlas.schema";

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

export async function getAtlasDetail(
  fincaId: number,
  imei: string,
): Promise<AtlasDetail> {
  const { data } = await coreHttpClient.get(
    `/systems/${fincaId}/Atlas/${imei}`,
  );

  return atlasDetailSchema.parse(data);
}
