import { pwa } from './app/config/pwa'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    'nuxt-api-party',
    '@nuxt/fonts',
  ],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    public: {
      API_ENDPOINT_POKEMON: process.env.API_ENDPOINT_POKEMON || 'https://pokeapi.co/api/v2',
      API_ENDPOINT_RICK_AND_MORTY: process.env.API_ENDPOINT_RICK_AND_MORTY || 'https://rickandmortyapi.com/api',
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  compatibilityDate: '2024-08-14',

  nitro: {
    prerender: {
      routes: [
        '/',
      ],
      crawlLinks: true,
    },
  },

  apiParty: {
    endpoints: {
      pokemon: {
        url: 'https://pokeapi.co/api/v2',
        allowedUrls: ['https://pokeapi.co/api/v2/*'],
      },
      rickAndMorty: {
        url: 'https://rickandmortyapi.com/api',
        allowedUrls: ['https://rickandmortyapi.com/api/*'],
      },
    },
    client: true,
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  icon: {
    provider: 'iconify',
  },

  pwa,
})
