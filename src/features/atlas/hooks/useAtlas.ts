import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listAtlas } from "../services/atlas.service";

export function useAtlas(fincaId: number, page: number) {
  return useQuery({
    queryKey: ["atlas", fincaId, page],
    queryFn: () => listAtlas(fincaId, page),
    placeholderData: keepPreviousData,
  });
}
