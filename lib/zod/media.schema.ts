import { z } from "zod";

export const GENRES = [
  "Action",
  "Adventure",
  "Crime",
  "Comedy",
  "Drama",
  "Documentary",
  "Thriller" ,
  "Science_fiction",
  "Psychological",
  "Sports",
  "Horror"
] as const;

export const mediaSchema = z.object({
  title: z.string().min(1, "Title is required"),

  type: z.enum(["Movie", "Series"]),

  priceType: z.enum(["Free", "Premium"]),

  releaseYear: z
    .number()
    .max(new Date().getFullYear()),

  director: z.string().optional(),

  synopsis: z.string().optional(),

  platform: z.string().optional(),

  youtubeLink: z.string().url().optional(),

  cast: z.array(z.string()),

  genre: z.array(z.enum(GENRES)),

  coverImage: z.string().url(),
});