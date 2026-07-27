import { useQuery } from '@tanstack/react-query';
import { listFincas } from '../services/fincas.service';

export function useFincas() {
  return useQuery({
    queryKey: ['fincas'],
    queryFn: listFincas,
  });
}
