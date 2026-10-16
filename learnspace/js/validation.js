/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Strict Form Validation Engine
 */

const Validation = {
  /**
   * 1. Name Validation:
   * Accepts letters only (uppercase A-Z, lowercase a-z) and single spaces between words.
   * Disallows numbers, symbols, and special characters.
   * Valid: "Ranjith", "Ranjith Kumar", "Sri Devi"
   * Invalid: "Ranjith123", "12345", "Ranjith@123"
   */
  isValidName(name) {
    if (!name || typeof name !== 'string') return false;
    const trimmed = name.trim();
    if (trimmed.length < 2) return false;
    // Strictly letters and single space between words
    const re = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    return re.test(trimmed);
  },

  /**
   * 2. Number Fields (Phone / Mobile):
   * Accepts numbers only, exactly 10 digits.
   * Valid: "9876543210"
   * Invalid: "98765abc10", "12345"
   */
  isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 10;
  },

  // General digits only
  isNumbersOnly(val) {
    if (val === null || val === undefined || val === '') return false;
    return /^\d+$/.test(String(val).trim());
  },

  // Age validation: integer between min and max
  isValidAge(age, min = 1, max = 120) {
    if (age === null || age === undefined || age === '') return false;
    const trimmed = String(age).trim();
    if (!/^\d+$/.test(trimmed)) return false;
    const num = parseInt(trimmed, 10);
    return num >= min && num <= max;
  },

  /**
   * 3. Email Fields:
   * Mandatory '@' symbol, valid username before '@', valid domain after '@' with valid extension.
   * Valid: "ranjith@gmail.com", "user@example.com"
   * Invalid: "ranjithgmail.com", "ranjith@", "@gmail.com", "ranjith@gmail", "ranjith@.com"
   */
  isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const trimmed = email.trim();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmed)) return false;
    const parts = trimmed.split('@');
    if (parts.length !== 2) return false;
    const domain = parts[1];
    if (!domain.includes('.')) return false;
    const domainParts = domain.split('.');
    const tld = domainParts[domainParts.length - 1];
    return tld.length >= 2;
  },

  isValidPassword(password) {
    return typeof password === 'string' && password.trim().length >= 6;
  },

  /**
   * 4. Required Fields:
   * Must not be empty or whitespace only.
   */
  isNotEmpty(val) {
    return val !== null && val !== undefined && String(val).trim().length > 0;
  },

  /**
   * 5. Validation UX:
   * Display error message clearly below the input field.
   */
  showError(inputElement, errorMessage) {
    if (!inputElement) return;
    inputElement.classList.add('is-invalid');
    const formGroup = inputElement.closest('.form-group') || inputElement.parentElement;
    let errorBox = formGroup.querySelector('.form-error');
    if (!errorBox) {
      errorBox = document.createElement('div');
      errorBox.className = 'form-error visible';
      formGroup.appendChild(errorBox);
    }
    errorBox.textContent = errorMessage;
    errorBox.classList.add('visible');
  },

  /**
   * Remove error message once the user enters valid data.
   */
  clearError(inputElement) {
    if (!inputElement) return;
    inputElement.classList.remove('is-invalid');
    const formGroup = inputElement.closest('.form-group') || inputElement.parentElement;
    const errorBox = formGroup.querySelector('.form-error');
    if (errorBox) {
      errorBox.textContent = '';
      errorBox.classList.remove('visible');
    }
  },

  clearAllErrors(formElement) {
    if (!formElement) return;
    const invalidInputs = formElement.querySelectorAll('.is-invalid');
    invalidInputs.forEach(el => el.classList.remove('is-invalid'));
    const errorBoxes = formElement.querySelectorAll('.form-error');
    errorBoxes.forEach(el => {
      el.textContent = '';
      el.classList.remove('visible');
    });
  },

  /**
   * Realtime input sanitization & instant error removal
   * Prevents users from typing invalid characters directly.
   */
  setupRealtimeSanitizers() {
    // Name fields: strip numbers & special characters in real time
    const nameSelectors = [
      'input[data-type="name"]',
      'input[name="fullName"]',
      'input[name="name"]',
      '#reg-name',
      '#child-name',
      '#edit-child-name',
      '#contact-name',
      '#profile-name',
      '#comment-name'
    ];
    document.querySelectorAll(nameSelectors.join(',')).forEach(input => {
      if (input.dataset.sanitizerAttached) return;
      input.dataset.sanitizerAttached = 'true';

      input.addEventListener('input', function () {
        const cleaned = this.value.replace(/[^A-Za-z\s]/g, '');
        if (this.value !== cleaned) {
          this.value = cleaned;
        }
        if (Validation.isValidName(this.value)) {
          Validation.clearError(this);
        }
      });

      input.addEventListener('blur', function () {
        if (this.hasAttribute('required') && !Validation.isNotEmpty(this.value)) {
          Validation.showError(this, 'Full name is required (letters only).');
        } else if (this.value && !Validation.isValidName(this.value)) {
          Validation.showError(this, 'Name must contain letters only (no numbers or special characters).');
        } else {
          Validation.clearError(this);
        }
      });
    });

    // Mobile / Phone fields: digits only, exactly 10 digits
    const phoneSelectors = [
      'input[type="tel"]',
      'input[data-type="phone"]',
      '#reg-phone',
      '#contact-phone',
      '#profile-phone'
    ];
    document.querySelectorAll(phoneSelectors.join(',')).forEach(input => {
      if (input.dataset.sanitizerAttached) return;
      input.dataset.sanitizerAttached = 'true';
      input.maxLength = 10;

      input.addEventListener('input', function () {
        const digits = this.value.replace(/\D/g, '').slice(0, 10);
        if (this.value !== digits) {
          this.value = digits;
        }
        if (digits.length === 10) {
          Validation.clearError(this);
        }
      });

      input.addEventListener('blur', function () {
        if (this.hasAttribute('required') && !Validation.isNotEmpty(this.value)) {
          Validation.showError(this, 'Phone number is required (10 digits).');
        } else if (this.value && this.value.length !== 10) {
          Validation.showError(this, 'Mobile number must contain exactly 10 digits (e.g. 9876543210).');
        } else {
          Validation.clearError(this);
        }
      });
    });

    // Email fields: strict email validation
    document.querySelectorAll('input[type="email"], input[data-type="email"]').forEach(input => {
      if (input.dataset.sanitizerAttached) return;
      input.dataset.sanitizerAttached = 'true';

      input.addEventListener('input', function () {
        if (Validation.isValidEmail(this.value)) {
          Validation.clearError(this);
        }
      });

      input.addEventListener('blur', function () {
        if (this.hasAttribute('required') && !Validation.isNotEmpty(this.value)) {
          Validation.showError(this, 'Email address is required.');
        } else if (this.value && !Validation.isValidEmail(this.value)) {
          Validation.showError(this, 'Please enter a valid email address (e.g. name@domain.com).');
        } else {
          Validation.clearError(this);
        }
      });
    });

    // Number / OTP / Age fields: numbers only
    document.querySelectorAll('input[type="number"], .otp-box').forEach(input => {
      if (input.dataset.sanitizerAttached) return;
      input.dataset.sanitizerAttached = 'true';

      input.addEventListener('input', function () {
        const cleaned = this.value.replace(/\D/g, '');
        if (this.value !== cleaned) {
          this.value = cleaned;
        }
        if (Validation.isNumbersOnly(this.value)) {
          Validation.clearError(this);
        }
      });
    });
  }
};

// Initialize sanitizers automatically when DOM loads
document.addEventListener('DOMContentLoaded', function () {
  Validation.setupRealtimeSanitizers();
});

window.Validation = Validation;

