import { pwa } from './app/config/pwa'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxt/image',
  ],

  devtools: {
    enabled: true,
  },

  css: [
    '~/assets/css/pokemon.css',
    '~/assets/css/rickandmorty.css',
    '~/assets/css/main.css',
  ],

  colorMode: {
    // Cast to `any` to allow 'modes' property
    ...({
      preference: 'system',
      fallback: 'light',
      classSuffix: '',
      modes: {
        light: '',
        dark: '',
        pokemon: 'pokemon',
        rickandmorty: 'rickandmorty',
      },
    } as any),
  },

  runtimeConfig: {
    public: {
      apiBase: '/api',
      universe: {
        pokemon: 'https://pokeapi.co/api/v2/pokemon',
        rickandmorty: 'https://rickandmortyapi.com/api/character',
      },
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

  pinia: {
    storesDirs: ['./stores/**'],
  },

  pwa,
})
