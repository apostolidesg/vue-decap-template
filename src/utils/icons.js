/**
 * Icon Registry
 *
 * Central registry that maps icon name strings to Lucide components.
 * This is the only file that imports from lucide-vue-next.
 *
 * Why a registry instead of direct imports in components?
 * - CMS content stores icon names as strings (e.g. "Briefcase")
 * - Components need to resolve those strings to actual Vue components
 * - Keeping all icon imports in one place makes it easy to add new icons
 * - Tree-shaking still works — only registered icons are bundled
 *
 * To add a new icon: import it from lucide-vue-next and add it to the registry.
 */

import {
  Briefcase,
  BarChart2,
  Target,
  Handshake,
  Lightbulb,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Users,
  Shield,
  Heart,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-vue-next'

export const iconRegistry = {
  Briefcase,
  BarChart2,
  Target,
  Handshake,
  Lightbulb,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Users,
  Shield,
  Heart,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
}

/**
 * Resolves an icon name string to a Lucide Vue component.
 * Returns null if the icon is not found in the registry.
 *
 * @param {string} iconName - The icon name as stored in content (e.g. 'Briefcase')
 * @returns {object|null} The Lucide Vue component or null
 */
export function resolveIcon(iconName) {
  if (!iconName) return null
  const resolvedIcon = iconRegistry[iconName]
  if (!resolvedIcon) {
    console.warn(`Icon "${iconName}" not found in registry. Add it to src/utils/icons.js`)
    return null
  }
  return resolvedIcon
}
