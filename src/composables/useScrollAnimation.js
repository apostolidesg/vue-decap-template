import { ref, onMounted, onUnmounted } from 'vue'

/**
 * useScrollAnimation
 *
 * Attaches an IntersectionObserver to a single element ref.
 * Adds .is-visible when the element enters the viewport.
 * The observer disconnects after the first trigger (no re-animation).
 *
 * Usage:
 *   const { animationRef } = useScrollAnimation()
 *   <div ref="animationRef" class="fade-in">...</div>
 *
 * Respects prefers-reduced-motion: adds .is-visible immediately without animating.
 */
export function useScrollAnimation() {
  const animationRef = ref(null)
  let observer = null

  onMounted(() => {
    if (!animationRef.value) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      animationRef.value.classList.add('is-visible')
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(animationRef.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return { animationRef }
}

/**
 * useStaggeredAnimation
 *
 * Attaches an IntersectionObserver to a container ref.
 * When the container enters the viewport, adds .is-visible to all children
 * and applies --stagger-delay CSS custom property (index * 80ms) to each.
 *
 * Usage:
 *   const { containerRef } = useStaggeredAnimation()
 *   <div ref="containerRef">
 *     <div class="fade-in-stagger">Card 1</div>
 *     <div class="fade-in-stagger">Card 2</div>
 *   </div>
 *
 * Respects prefers-reduced-motion: adds .is-visible immediately without delay.
 */
export function useStaggeredAnimation() {
  const containerRef = ref(null)
  let observer = null

  onMounted(() => {
    if (!containerRef.value) return

    const children = Array.from(containerRef.value.children)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Apply stagger delays regardless of reduced-motion preference
    // (the transition duration/delay is what gets bypassed, not the class)
    children.forEach((child, index) => {
      child.style.setProperty('--stagger-delay', `${index * 80}ms`)
    })

    if (prefersReducedMotion) {
      children.forEach((child) => child.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Array.from(entry.target.children).forEach((child) => {
              child.classList.add('is-visible')
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(containerRef.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return { containerRef }
}
