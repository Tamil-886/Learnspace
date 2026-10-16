/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Authentication Logic (Frontend Demonstration)
 *
 * CRITICAL REQUIREMENT:
 * Successful login must NOT redirect to another page or reload.
 * Displays "Login successful!" in place.
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Password Visibility Toggle
  const toggleButtons = document.querySelectorAll('.password-toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const input = this.closest('.input-icon-wrapper').querySelector('input');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          this.setAttribute('aria-label', 'Hide password');
        } else {
          input.type = 'password';
          this.setAttribute('aria-label', 'Show password');
        }
      }
    });
  });

  // 2. Demo Autofill Button on Login Page
  const autofillBtn = document.getElementById('btn-autofill-demo');
  if (autofillBtn) {
    autofillBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      if (emailInput && passInput) {
        emailInput.value = 'parent@learnspace.org';
        passInput.value = 'demo123';
        Validation.clearError(emailInput);
        Validation.clearError(passInput);
      }
    });
  }

  // 3. Login Form Handler
  const loginForm = document.getElementById('login-form');
  const loginBanner = document.getElementById('login-feedback-banner');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault(); // NEVER reload
      Validation.clearAllErrors(loginForm);

      if (loginBanner) {
        loginBanner.className = 'auth-banner';
        loginBanner.innerHTML = '';
      }

      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      const rememberInput = document.getElementById('login-remember');

      let isValid = true;

      // Validate Email
      if (!emailInput || !Validation.isNotEmpty(emailInput.value)) {
        Validation.showError(emailInput, 'Please enter your email address.');
        isValid = false;
      } else if (!Validation.isValidEmail(emailInput.value)) {
        Validation.showError(emailInput, 'Please enter a valid email address (e.g. name@domain.com).');
        isValid = false;
      }

      // Validate Password
      if (!passInput || !Validation.isNotEmpty(passInput.value)) {
        Validation.showError(passInput, 'Please enter your password.');
        isValid = false;
      } else if (!Validation.isValidPassword(passInput.value)) {
        Validation.showError(passInput, 'Password must be at least 6 characters.');
        isValid = false;
      }

      if (!isValid) {
        if (loginBanner) {
          loginBanner.className = 'auth-banner auth-banner-error visible';
          loginBanner.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Please correct the errors in the form above.</span>
          `;
        }
        return;
      }

      // DEMO SUCCESS - Display Login successful! in place without redirect or reload
      if (loginBanner) {
        loginBanner.className = 'auth-banner auth-banner-success visible';
        loginBanner.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <div>
            <strong>Login successful!</strong>
            <p style="margin: 2px 0 0 0; font-size: 0.825rem; font-weight: normal; opacity: 0.95;">
              Welcome back to LearnSpace Co-op. You may now continue exploring or open the <a href="../dashboard/index.html" style="text-decoration: underline; font-weight: bold; color: inherit;">Parent Dashboard</a> at your convenience.
            </p>
          </div>
        `;
      }

      // Store demo logged-in flag in localStorage
      localStorage.setItem('learnspace_logged_in', 'true');
    });
  }

  // 4. Registration Form Handler
  const registerForm = document.getElementById('register-form');
  const registerBanner = document.getElementById('register-feedback-banner');

  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      Validation.clearAllErrors(registerForm);

      if (registerBanner) {
        registerBanner.className = 'auth-banner';
        registerBanner.innerHTML = '';
      }

      const nameInput = document.getElementById('reg-name');
      const emailInput = document.getElementById('reg-email');
      const phoneInput = document.getElementById('reg-phone');
      const passInput = document.getElementById('reg-password');
      const confirmInput = document.getElementById('reg-confirm-password');
      const termsInput = document.getElementById('reg-terms');

      let isValid = true;

      // Validate Full Name: Letters only, spaces allowed, no numbers or symbols
      if (!nameInput || !Validation.isNotEmpty(nameInput.value)) {
        Validation.showError(nameInput, 'Please enter your full name.');
        isValid = false;
      } else if (!Validation.isValidName(nameInput.value)) {
        Validation.showError(nameInput, 'Full name must contain letters only (e.g. Sarah Jenkins). No numbers or symbols allowed.');
        isValid = false;
      }

      // Validate Email: Valid format with @ and domain
      if (!emailInput || !Validation.isNotEmpty(emailInput.value)) {
        Validation.showError(emailInput, 'Please enter your email address.');
        isValid = false;
      } else if (!Validation.isValidEmail(emailInput.value)) {
        Validation.showError(emailInput, 'Please enter a valid email address with @ and domain (e.g. name@domain.com).');
        isValid = false;
      }

      // Validate Mobile Phone: Numbers only, exactly 10 digits
      if (!phoneInput || !Validation.isNotEmpty(phoneInput.value)) {
        Validation.showError(phoneInput, 'Please enter a 10-digit mobile number.');
        isValid = false;
      } else if (!Validation.isValidPhone(phoneInput.value)) {
        Validation.showError(phoneInput, 'Mobile number must contain exactly 10 digits (e.g. 9876543210).');
        isValid = false;
      }

      if (!passInput || !Validation.isValidPassword(passInput.value)) {
        Validation.showError(passInput, 'Password must be at least 6 characters.');
        isValid = false;
      }

      if (!confirmInput || confirmInput.value !== passInput.value) {
        Validation.showError(confirmInput, 'Passwords do not match.');
        isValid = false;
      }

      if (termsInput && !termsInput.checked) {
        Validation.showError(termsInput, 'You must agree to the Co-op Family Guidelines.');
        isValid = false;
      }

      if (!isValid) {
        if (registerBanner) {
          registerBanner.className = 'auth-banner auth-banner-error visible';
          registerBanner.innerHTML = '<span>Please fix the highlighted fields to continue.</span>';
        }
        return;
      }

      // Backend validation and storage persistence
      if (window.StorageService) {
        try {
          window.StorageService.setUser({
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            tier: 'Full Co-Op Member',
            memberSince: 'October 2026',
            avatar: 'assets/images/avatars/parent-sarah.jpg',
            emergencyContact: `${nameInput.value.trim()} - ${phoneInput.value.trim()}`
          });
        } catch (err) {
          if (registerBanner) {
            registerBanner.className = 'auth-banner auth-banner-error visible';
            registerBanner.innerHTML = `<span>Backend Validation Error: ${err.message}</span>`;
          }
          return;
        }
      }

      // In-place success without redirect
      if (registerBanner) {
        registerBanner.className = 'auth-banner auth-banner-success visible';
        registerBanner.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <div>
            <strong>Registration successful!</strong>
            <p style="margin: 2px 0 0 0; font-size: 0.825rem;">
              Your family account application has been received. You can now <a href="login.html" style="text-decoration: underline; font-weight: bold; color: inherit;">sign in here</a>.
            </p>
          </div>
        `;
      }
    });
  }

  // 5. Forgot Password Handler
  const forgotForm = document.getElementById('forgot-password-form');
  const forgotBanner = document.getElementById('forgot-feedback-banner');

  if (forgotForm) {
    forgotForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = document.getElementById('forgot-email');
      Validation.clearAllErrors(forgotForm);

      if (!emailInput || !Validation.isNotEmpty(emailInput.value)) {
        Validation.showError(emailInput, 'Email address is required.');
        return;
      } else if (!Validation.isValidEmail(emailInput.value)) {
        Validation.showError(emailInput, 'Please enter a valid email address with @ and domain (e.g. name@domain.com).');
        return;
      }

      if (forgotBanner) {
        forgotBanner.className = 'auth-banner auth-banner-success visible';
        forgotBanner.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 14 14"></polyline>
          </svg>
          <div>
            <strong>Reset instructions sent!</strong>
            <p style="margin: 2px 0 0 0; font-size: 0.825rem;">
              If an account exists for ${emailInput.value}, a reset link has been dispatched.
            </p>
          </div>
        `;
      }
    });
  }

  // 6. Reset Password Handler
  const resetForm = document.getElementById('reset-password-form');
  const resetBanner = document.getElementById('reset-feedback-banner');

  if (resetForm) {
    resetForm.addEventListener('submit', function (e) {
      e.preventDefault();
      Validation.clearAllErrors(resetForm);

      const pass1 = document.getElementById('new-password');
      const pass2 = document.getElementById('confirm-new-password');

      let isValid = true;
      if (!pass1 || !Validation.isNotEmpty(pass1.value)) {
        Validation.showError(pass1, 'New password is required.');
        isValid = false;
      } else if (!Validation.isValidPassword(pass1.value)) {
        Validation.showError(pass1, 'Password must be at least 6 characters.');
        isValid = false;
      }
      if (!pass2 || !Validation.isNotEmpty(pass2.value)) {
        Validation.showError(pass2, 'Please confirm your new password.');
        isValid = false;
      } else if (pass2.value !== pass1.value) {
        Validation.showError(pass2, 'Passwords do not match.');
        isValid = false;
      }

      if (!isValid) return;

      if (resetBanner) {
        resetBanner.className = 'auth-banner auth-banner-success visible';
        resetBanner.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <div>
            <strong>Password updated successfully!</strong>
            <p style="margin: 2px 0 0 0; font-size: 0.825rem;">
              You can now <a href="login.html" style="text-decoration: underline; font-weight: bold; color: inherit;">proceed to login</a> with your new password.
            </p>
          </div>
        `;
      }
    });
  }

  // 7. Verify Email OTP Handler
  const verifyForm = document.getElementById('verify-email-form');
  const verifyBanner = document.getElementById('verify-feedback-banner');

  if (verifyForm) {
    const otpInputs = verifyForm.querySelectorAll('.otp-box');
    otpInputs.forEach((box, index) => {
      box.addEventListener('input', function () {
        if (this.value.length === 1 && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      });
      box.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !this.value && index > 0) {
          otpInputs[index - 1].focus();
        }
      });
    });

    verifyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let otpCode = '';
      otpInputs.forEach(b => otpCode += b.value);

      if (otpCode.length < 6) {
        if (verifyBanner) {
          verifyBanner.className = 'auth-banner auth-banner-error visible';
          verifyBanner.textContent = 'Please enter all 6 verification digits.';
        }
        return;
      }

      if (verifyBanner) {
        verifyBanner.className = 'auth-banner auth-banner-success visible';
        verifyBanner.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <div>
            <strong>Email verified successfully!</strong>
            <p style="margin: 2px 0 0 0; font-size: 0.825rem;">
              Your parent membership email is confirmed.
            </p>
          </div>
        `;
      }
    });
  }
});
