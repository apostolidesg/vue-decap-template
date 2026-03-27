/**
 * Resolves an image path for use in templates.
 *
 * - CMS-uploaded images live in /public/uploads/ and are referenced as /uploads/filename
 * - Static template images live in src/assets/images/ and must be imported directly
 *
 * Use this helper for CMS image fields to ensure paths always resolve correctly.
 *
 * @param {string} imagePath - The path stored in CMS content
 * @param {string} fallbackPath - Optional fallback if imagePath is empty
 * @returns {string} Resolved image URL
 */
export function resolveImagePath(imagePath, fallbackPath = '') {
  if (!imagePath) return fallbackPath

  // Already an absolute URL (e.g. Unsplash placeholder)
  if (imagePath.startsWith('http')) return imagePath

  // Already has a leading slash — return as-is
  if (imagePath.startsWith('/')) return imagePath

  // Relative path — prepend slash to make it root-relative
  return `/${imagePath}`
}
