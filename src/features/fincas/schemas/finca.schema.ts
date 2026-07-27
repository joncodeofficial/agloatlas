import { z } from 'zod';

export const fincaSchema = z.object({
  id: z.number(),
  name: z.string(),
  favourite: z.boolean(),
  createdDate: z.string(),
});

export type Finca = z.infer<typeof fincaSchema>;
