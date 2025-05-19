import { defineNuxtRouteMiddleware } from '#app'
import { useThemeCss } from '@/composables/useThemeCss'

export default defineNuxtRouteMiddleware((to) => {
  const { page } = to.params
  const { loadTheme } = useThemeCss()
  loadTheme(`/themes/${page}.css`, `${page}-theme`)
})
