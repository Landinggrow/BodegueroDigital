import { defineCollection, z } from 'astro:content';

const blogContenidoCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    resume: z.string(),
  }),
});

export const collections = {
  blog_contenido: blogContenidoCollection,
};