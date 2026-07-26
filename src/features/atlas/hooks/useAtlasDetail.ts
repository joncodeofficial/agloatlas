import { useQuery } from "@tanstack/react-query";
import { getAtlasDetail } from "../services/atlas.service";

export function useAtlasDetail(fincaId: number, imei: string) {
  return useQuery({
    queryKey: ["atlas", fincaId, "detail", imei],
    queryFn: () => getAtlasDetail(fincaId, imei),
  });
}
