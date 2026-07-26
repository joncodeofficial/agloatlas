import { z } from "zod";

export const atlasSchema = z.object({
  imei: z.string(),
  name: z.string(),
  expiredDate: z.string(),
  batteryPercentage: z.number(),
  signalPercentage: z.number(),
});

export type Atlas = z.infer<typeof atlasSchema>;

export const atlasPageSchema = z.object({
  items: atlasSchema.array(),
  pageNumber: z.number(),
  totalPages: z.number(),
  totalCount: z.number(),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
});

export type AtlasPage = z.infer<typeof atlasPageSchema>;

export const atlasDetailSchema = atlasSchema.extend({
  latitude: z.string(),
  longitude: z.string(),
});

export type AtlasDetail = z.infer<typeof atlasDetailSchema>;
