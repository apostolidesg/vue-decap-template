import clientConfig from '../../client-config.js'

export async function applyTheme() {
  const themeName = clientConfig.theme || 'default'

  try {
    const themeModule = await import(`../themes/${themeName}.js`)
    const theme = themeModule.default

    const root = document.documentElement
    Object.entries(theme.tokens).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })

    console.log(`Theme "${themeName}" applied successfully`)
  } catch (error) {
    console.error(`Theme "${themeName}" not found, falling back to default`)
    if (themeName !== 'default') {
      const fallback = await import('../themes/default.js')
      const theme = fallback.default
      const root = document.documentElement
      Object.entries(theme.tokens).forEach(([property, value]) => {
        root.style.setProperty(property, value)
      })
    }
  }
}
