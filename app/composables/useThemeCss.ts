let currentThemeId: string | null = null

export function useThemeCss() {
  function loadTheme(path: string, id: string) {
    if (typeof document === 'undefined')
      return

    // If theme already loaded, don't re-load
    if (currentThemeId === id)
      return

    // Remove previous theme if it exists
    if (currentThemeId) {
      const existing = document.getElementById(currentThemeId)
      if (existing)
        existing.remove()
    }

    // Create and append new theme stylesheet
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = path
    document.head.appendChild(link)

    currentThemeId = id
  }

  return { loadTheme }
}
