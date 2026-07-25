import { coreHttpClient } from "@/shared/config/httpClient";
import { fincaSchema, type Finca } from "../schemas/finca.schema";

export async function listFincas(): Promise<Finca[]> {
  const { data } = await coreHttpClient.get("/System/List");
  return fincaSchema.array().parse(data);
}
