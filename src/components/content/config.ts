import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
    title: z.string(),
    resume: z.string(),
    keywords: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};