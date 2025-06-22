document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const spamCheckInput = document.getElementById('spam-check');
    const submitButton = document.getElementById('submit-button');
    const formLoader = document.getElementById('form-loader');
    const successMessage = document.getElementById('success-message');
    const charCount = document.getElementById('char-count');

    // Character counter for message
    messageInput.addEventListener('input', function() {
        const currentLength = messageInput.value.length;
        charCount.textContent = currentLength;

        // Optional: change color when approaching limit
        if (currentLength > 900) {
            charCount.style.color = '#e74c3c';
        } else {
            charCount.style.color = '#777';
        }
    });

    // Form validation
    function validateForm() {
        let isValid = true;

        // First Name validation
        if (firstNameInput.value.trim() === '') {
            showError(firstNameInput, 'first-name-error', 'Please enter your first name');
            isValid = false;
        } else {
            clearError(firstNameInput, 'first-name-error');
        }

        // Last Name validation
        if (lastNameInput.value.trim() === '') {
            showError(lastNameInput, 'last-name-error', 'Please enter your last name');
            isValid = false;
        } else {
            clearError(lastNameInput, 'last-name-error');
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'email-error', 'Please enter your email address');
            isValid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            showError(emailInput, 'email-error', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailInput, 'email-error');
        }

        // Phone validation (optional field)
        if (phoneInput.value.trim() !== '') {
            // Simple validation - can be enhanced for international formats
            const phonePattern = /^[0-9+\s()-]{7,20}$/;
            if (!phonePattern.test(phoneInput.value)) {
                showError(phoneInput, 'phone-error', 'Please enter a valid phone number');
                isValid = false;
            } else {
                clearError(phoneInput, 'phone-error');
            }
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'message-error', 'Please enter your message');
            isValid = false;
        } else if (messageInput.value.length < 10) {
            showError(messageInput, 'message-error', 'Your message is too short');
            isValid = false;
        } else {
            clearError(messageInput, 'message-error');
        }

        // Spam check validation
        if (spamCheckInput.value.trim() !== '87291') {
            showError(spamCheckInput, 'spam-check-error', 'Please enter the correct number');
            isValid = false;
        } else {
            clearError(spamCheckInput, 'spam-check-error');
        }

        return isValid;
    }

    // Helper functions for error handling
    function showError(input, errorId, message) {
        const errorElement = document.getElementById(errorId);
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearError(input, errorId) {
        const errorElement = document.getElementById(errorId);
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Show loader
        submitButton.disabled = true;
        formLoader.style.display = 'block';

        // Simulate form submission (replace with actual AJAX call)
        setTimeout(function() {
            // Hide form and show success message
            contactForm.querySelector('form > *:not(.success-message)').style.display = 'none';
            successMessage.style.display = 'block';

            // Reset form
            contactForm.reset();

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
});