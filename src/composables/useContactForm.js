import { ref, computed } from 'vue'

/**
 * useContactForm
 *
 * Composable that encapsulates all contact form logic:
 * field state, validation, submission, and result handling.
 *
 * Extracted from the component so the template stays clean
 * and the logic is independently testable.
 *
 * Form submits to Netlify Forms — no backend required.
 * Netlify detects the form at build time via the static
 * hidden form in index.html and handles storage + notifications.
 */
export function useContactForm() {
  // --- Field State ---
  const formFields = ref({
    name: '',
    email: '',
    message: '',
  })

  // --- Submission State ---
  // Possible values: 'idle' | 'submitting' | 'success' | 'error'
  const submissionState = ref('idle')

  // --- Validation Errors ---
  const validationErrors = ref({
    name: '',
    email: '',
    message: '',
  })

  // --- Computed Flags ---
  const isSubmitting = computed(() => submissionState.value === 'submitting')
  const isSuccess = computed(() => submissionState.value === 'success')
  const isError = computed(() => submissionState.value === 'error')

  // --- Validation ---
  function validateEmail(emailAddress) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(emailAddress)
  }

  function validateForm() {
    let isValid = true

    // Reset errors before revalidating
    validationErrors.value = { name: '', email: '', message: '' }

    if (!formFields.value.name.trim()) {
      validationErrors.value.name = 'Name is required'
      isValid = false
    }

    if (!formFields.value.email.trim()) {
      validationErrors.value.email = 'Email is required'
      isValid = false
    } else if (!validateEmail(formFields.value.email)) {
      validationErrors.value.email = 'Please enter a valid email address'
      isValid = false
    }

    if (!formFields.value.message.trim()) {
      validationErrors.value.message = 'Message is required'
      isValid = false
    }

    return isValid
  }

  // --- Submission ---
  async function submitForm(formName) {
    if (!validateForm()) return

    submissionState.value = 'submitting'

    try {
      // Netlify Forms expects application/x-www-form-urlencoded
      const encodedFormData = new URLSearchParams({
        'form-name': formName,
        name: formFields.value.name,
        email: formFields.value.email,
        message: formFields.value.message,
      }).toString()

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedFormData,
      })

      if (response.ok) {
        submissionState.value = 'success'
        resetForm()
      } else {
        submissionState.value = 'error'
      }
    } catch (networkError) {
      console.error('Form submission failed:', networkError)
      submissionState.value = 'error'
    }
  }

  // --- Reset ---
  function resetForm() {
    formFields.value = { name: '', email: '', message: '' }
    validationErrors.value = { name: '', email: '', message: '' }
  }

  return {
    formFields,
    submissionState,
    validationErrors,
    isSubmitting,
    isSuccess,
    isError,
    submitForm,
    resetForm,
  }
}
