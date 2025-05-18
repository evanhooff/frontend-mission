import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    universes: defineCollection({
      source: 'universes/*.json',
      type: 'page',
      schema: z.object({
        universe: z.string(),
        title: z.string(),
        label: z.string(),
        description: z.string(),
      }),
    }),

    settings: defineCollection({
      source: 'settings/*.json',
      type: 'data',
      schema: z.object({
        universe: z.string(),
        css_colormode: z.string(),
        endpoint: z.string(),
        NUXT_ENV_API_ENDPOINT: z.string(),
        imagetemplate: z.string(),
      }),
    }),

    lordOfTheRingsCharacter: defineCollection({
      source: 'universes/lord-of-the-rings/characters/*.json',
      type: 'data',
      schema: z.object({
        nameFirst: z.string(),
        nameLast: z.string().optional(),
        hobbies: z.array(z.string()),
        age: z.number(),
        height: z.number(),
        image: z.string().optional(),
      }),
    }),

    natureAnimal: defineCollection({
      source: 'universes/nature/animals/*.json',
      type: 'data',
      schema: z.object({
        name: z.string(),
        nameLatin: z.string(),
        diet: z.array(z.string()),
        size: z.string(),
        lifespan: z.number(),
        icon: z.string().optional(),
      }),
    }),
  },
})
