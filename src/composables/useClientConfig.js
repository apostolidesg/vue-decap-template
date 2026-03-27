import clientConfig from '../../client-config.js'

/**
 * useClientConfig
 *
 * Composable that provides access to the client configuration.
 * All components should use this instead of importing client-config.js directly.
 * This gives us a single controlled access point for configuration,
 * making future changes (validation, overrides, env vars) easy to apply globally.
 *
 * @returns {object} config - The full client configuration object
 */
export function useClientConfig() {
  return {
    config: clientConfig,
  }
}
