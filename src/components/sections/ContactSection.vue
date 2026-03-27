<template>
  <section class="contact section section--white" id="contact">
    <div class="container contact__inner">

      <!-- Left Column — info -->
      <div class="contact__info">
        <div class="section-header section-header--left">
          <span class="section-header__eyebrow">{{ subtitle }}</span>
          <h2 class="section-header__title">{{ title }}</h2>
          <p v-if="description" class="section-header__description">{{ description }}</p>
        </div>

        <div class="contact__details">
          <a
            v-if="config.contact.email"
            :href="`mailto:${config.contact.email}`"
            class="contact__detail-item"
          >
            <div class="contact__detail-icon">
              <Mail :size="18" :stroke-width="1.5" />
            </div>
            <span>{{ config.contact.email }}</span>
          </a>

          <a
            v-if="config.contact.phone"
            :href="`tel:${config.contact.phone}`"
            class="contact__detail-item"
          >
            <div class="contact__detail-icon">
              <Phone :size="18" :stroke-width="1.5" />
            </div>
            <span>{{ config.contact.phone }}</span>
          </a>

          <div v-if="config.contact.address" class="contact__detail-item">
            <div class="contact__detail-icon">
              <MapPin :size="18" :stroke-width="1.5" />
            </div>
            <span>{{ config.contact.address }}</span>
          </div>
        </div>
      </div>

      <!-- Right Column — form -->
      <div class="contact__form-wrapper">

        <!-- Success State -->
        <div v-if="isSuccess" class="contact__success">
          <CheckCircle :size="48" :stroke-width="1.5" class="contact__success-icon" />
          <p>{{ successMessage }}</p>
        </div>

        <!-- Form -->
        <form
          v-else
          class="contact__form"
          name="contact"
          method="POST"
          data-netlify="true"
          @submit.prevent="submitForm('contact')"
        >
          <!-- Name Field -->
          <div class="form-field" :class="{ 'form-field--error': validationErrors.name }">
            <label class="form-field__label" for="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              v-model="formFields.name"
              type="text"
              class="form-field__input"
              :placeholder="namePlaceholder"
              :disabled="isSubmitting"
            />
            <span v-if="validationErrors.name" class="form-field__error">
              {{ validationErrors.name }}
            </span>
          </div>

          <!-- Email Field -->
          <div class="form-field" :class="{ 'form-field--error': validationErrors.email }">
            <label class="form-field__label" for="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              v-model="formFields.email"
              type="email"
              class="form-field__input"
              :placeholder="emailPlaceholder"
              :disabled="isSubmitting"
            />
            <span v-if="validationErrors.email" class="form-field__error">
              {{ validationErrors.email }}
            </span>
          </div>

          <!-- Message Field -->
          <div class="form-field" :class="{ 'form-field--error': validationErrors.message }">
            <label class="form-field__label" for="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              v-model="formFields.message"
              class="form-field__input form-field__input--textarea"
              :placeholder="messagePlaceholder"
              :disabled="isSubmitting"
              rows="5"
            />
            <span v-if="validationErrors.message" class="form-field__error">
              {{ validationErrors.message }}
            </span>
          </div>

          <!-- Error Message -->
          <div v-if="isError" class="contact__error-message">
            {{ errorMessage }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="contact__submit-btn"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Sending...</span>
            <span v-else>{{ sendButton }}</span>
            <ArrowRight v-if="!isSubmitting" :size="18" :stroke-width="2" />
          </button>

        </form>
      </div>

    </div>
  </section>
</template>

<script setup>
import { Mail, Phone, MapPin, CheckCircle, ArrowRight } from 'lucide-vue-next'
import { useClientConfig } from '@/composables/useClientConfig'
import { useContactForm } from '@/composables/useContactForm'

// Config — used for contact details in the left column
const { config } = useClientConfig()

// All form logic lives in the composable — this component only handles display
const {
  formFields,
  validationErrors,
  isSubmitting,
  isSuccess,
  isError,
  submitForm,
} = useContactForm()

// Props — all content passed down from the page
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  namePlaceholder: {
    type: String,
    default: 'Your Name',
  },
  emailPlaceholder: {
    type: String,
    default: 'Your Email',
  },
  messagePlaceholder: {
    type: String,
    default: 'Your Message',
  },
  sendButton: {
    type: String,
    default: 'Send Message',
  },
  successMessage: {
    type: String,
    default: 'Thank you! We will be in touch shortly.',
  },
  errorMessage: {
    type: String,
    default: 'Something went wrong. Please try again.',
  },
})
</script>

<style lang="scss" scoped>
.contact {
  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: start;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: var(--space-10);
    }
  }

  // --- Left Column ---
  &__info {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-top: var(--space-4);
  }

  &__detail-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-primary);
    }
  }

  &__detail-icon {
    width: 2rem;
    height: 2rem;
    border-radius: var(--radius-md);
    background: var(--color-secondary);
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  // --- Right Column ---
  &__form-wrapper {
    background: var(--color-background);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--color-border);
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  &__success {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    padding: var(--space-12) var(--space-8);
    text-align: center;

    p {
      font-size: var(--font-size-base);
      color: var(--color-text-secondary);
      line-height: var(--line-height-relaxed);
    }
  }

  &__success-icon {
    color: var(--color-success);
  }

  &__error-message {
    font-size: var(--font-size-sm);
    color: var(--color-error);
    padding: var(--space-3) var(--space-4);
    background: rgba(239, 68, 68, 0.08);
    border-radius: var(--radius-md);
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  &__submit-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-8);
    background: var(--color-primary);
    color: var(--color-text-inverse);
    border: none;
    border-radius: var(--radius-full);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
    align-self: flex-start;

    &:hover:not(:disabled) {
      background: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

// --- Form Fields ---
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  &__label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
  }

  &__input {
    width: 100%;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    font-family: var(--font-family-body);
    color: var(--color-text-primary);
    background: var(--color-background);
    transition: border-color var(--transition-fast);
    outline: none;

    &::placeholder {
      color: var(--color-text-secondary);
      opacity: 0.6;
    }

    &:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(44, 95, 93, 0.1);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &--textarea {
      resize: vertical;
      min-height: 140px;
    }
  }

  &--error &__input {
    border-color: var(--color-error);

    &:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  }

  &__error {
    font-size: var(--font-size-xs);
    color: var(--color-error);
  }
}
</style>
