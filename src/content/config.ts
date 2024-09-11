import { defineCollection, z } from 'astro:content'

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    created_at: z.date(),
    draft: z.boolean().optional().default(false),
    tags: z.array(z.string()).or(z.null()),
    /* For internal use */
    prevTitle: z.string().default(''),
    prevSlug: z.string().default(''),
    nextTitle: z.string().default(''),
    nextSlug: z.string().default(''),
  }),
})
export const collections = {
  posts: postsCollection,
}
