// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const bookingForm = document.getElementById('booking-form');
    const submitBtn = document.getElementById('submit-btn');
    const formLoader = document.getElementById('form-loader');
    const successMessage = document.getElementById('success-message');

    // Service selection elements
    const serviceTypeSelect = document.getElementById('service-type');
    const subServiceSelect = document.getElementById('sub-service');
    const bedroomsGroup = document.getElementById('bedrooms-group');
    const addOnsGroup = document.getElementById('add-ons-group');

    // City and state fields
    const citySelect = document.getElementById('city');
    const stateInput = document.getElementById('state');

    // Date picker - set minimum date to tomorrow
    const dateInput = document.getElementById('date');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];

    // Required form fields
    const requiredFields = document.querySelectorAll('[required]');

    // Track if form submission has been attempted
    let submissionAttempted = false;

    // Service types and their sub-services
    const serviceOptions = {
        basic: ['Laundry', 'Errands', 'Food Processing', 'General Cleaning'],
        'deep-clean': ['Standard Deep Clean'],
        specialty: ['Gardening/Landscaping', 'Decluttering/Organizing', 'Post Construction Clean', 'Child & Senior Minding', 'Upholstery Cleaning', 'Fumigation']
    };

    // Check if the form should be pre-filled based on URL parameters
    function checkUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const serviceType = params.get('service');
        const subService = params.get('type');

        if (serviceType && serviceOptions[serviceType]) {
            serviceTypeSelect.value = serviceType;
            updateSubServices(serviceType);
            toggleConditionalFields(serviceType);

            if (subService) {
                // Find the match in sub-services (case insensitive)
                const options = Array.from(subServiceSelect.options);
                const matchingOption = options.find(option =>
                    option.text.toLowerCase() === subService.toLowerCase());

                if (matchingOption) {
                    subServiceSelect.value = matchingOption.value;
                }
            }
        }
    }

    // Function to update sub-services based on service type
    function updateSubServices(serviceType) {
        // Clear all options except the first one
        subServiceSelect.innerHTML = '<option value="" disabled selected>Select a sub-service</option>';

        // If service type is valid
        if (serviceOptions[serviceType]) {
            // Enable the sub-service select
            subServiceSelect.disabled = false;

            // Add new options based on the selected service type
            serviceOptions[serviceType].forEach((service, index) => {
                const option = document.createElement('option');
                option.value = serviceType + '-' + index;
                option.textContent = service;
                subServiceSelect.appendChild(option);
            });
        } else {
            // Disable the sub-service select if no valid service type
            subServiceSelect.disabled = true;
        }
    }

    // Function to toggle conditional fields based on service type
    function toggleConditionalFields(serviceType) {
        // Show/hide bedrooms field only for deep cleaning
        bedroomsGroup.style.display = serviceType === 'deep-clean' ? 'block' : 'none';

        // Show add-ons for deep clean and basic services
        addOnsGroup.style.display = (serviceType === 'deep-clean' || serviceType === 'basic') ? 'block' : 'none';
    }

    // Function to update state based on city
    function updateState(city) {
        if (city === 'lagos') {
            stateInput.value = 'Lagos State';
        } else if (city === 'enugu') {
            stateInput.value = 'Enugu State';
        } else {
            stateInput.value = '';
        }
    }

    // Function to validate phone number (Nigerian format)
    function validatePhoneNumber(phone) {
        // Basic Nigerian phone validation (starts with +234 or 0)
        const nigerianPhonePattern = /^(\+234|0)[0-9]{10}$/;
        return nigerianPhonePattern.test(phone.replace(/\s/g, ''));
    }

    // Function to validate email
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to validate captcha
    function validateCaptcha(captcha) {
        return captcha.toUpperCase() === 'ZIGAM';
    }

    // Function to check if the form is valid
    function checkFormValidity(showErrors = false) {
        let isValid = true;

        // Check all required fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                if (showErrors) {
                    highlightError(field, 'This field is required');
                }
            } else {
                // Only validate further if the field has a value
                if (field.id === 'email' && !validateEmail(field.value)) {
                    isValid = false;
                    if (showErrors) {
                        highlightError(field, 'Please enter a valid email address');
                    }
                } else if (field.id === 'phone' && !validatePhoneNumber(field.value)) {
                    isValid = false;
                    if (showErrors) {
                        highlightError(field, 'Please enter a valid Nigerian phone number');
                    }
                } else if (field.id === 'captcha' && !validateCaptcha(field.value)) {
                    isValid = false;
                    if (showErrors) {
                        highlightError(field, 'Please type ZIGAM correctly');
                    }
                } else if (field.id === 'date') {
                    const selectedDate = new Date(field.value);
                    const currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0); // Reset time portion for comparison

                    if (selectedDate < currentDate) {
                        isValid = false;
                        if (showErrors) {
                            highlightError(field, 'Date cannot be in the past');
                        }
                    } else if (showErrors) {
                        clearError(field);
                    }
                } else if (showErrors) {
                    clearError(field);
                }
            }
        });

        // Enable/disable the submit button based on validity
        submitBtn.disabled = !isValid && submissionAttempted;

        return isValid;
    }

    // Function to highlight error on field
    function highlightError(field, message) {
        field.classList.add('error');
        const errorElement = document.getElementById(field.id + '-error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // Function to clear error on field
    function clearError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(field.id + '-error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    // Clear all error messages and styling on page load
    function clearAllErrors() {
        requiredFields.forEach(field => {
            clearError(field);
        });
    }

    // Service type change handler
    serviceTypeSelect.addEventListener('change', function() {
        const serviceType = this.value;
        updateSubServices(serviceType);
        toggleConditionalFields(serviceType);

        // If submission attempted, validate this field
        if (submissionAttempted) {
            if (!this.value.trim()) {
                highlightError(this, 'This field is required');
            } else {
                clearError(this);
            }
        }
    });

    // City change handler
    citySelect.addEventListener('change', function() {
        updateState(this.value);

        // If submission attempted, validate this field
        if (submissionAttempted) {
            if (!this.value.trim()) {
                highlightError(this, 'This field is required');
            } else {
                clearError(this);
            }
        }
    });

    // Form input change handler - only validate fields after submission attempt
    bookingForm.addEventListener('input', function(e) {
        if (submissionAttempted) {
            const field = e.target;

            if (field.hasAttribute('required')) {
                if (!field.value.trim()) {
                    highlightError(field, 'This field is required');
                } else if (field.id === 'email' && !validateEmail(field.value)) {
                    highlightError(field, 'Please enter a valid email address');
                } else if (field.id === 'phone' && !validatePhoneNumber(field.value)) {
                    highlightError(field, 'Please enter a valid Nigerian phone number');
                } else if (field.id === 'captcha' && !validateCaptcha(field.value)) {
                    highlightError(field, 'Please type ZIGAM correctly');
                } else if (field.id === 'date') {
                    const selectedDate = new Date(field.value);
                    const currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0);

                    if (selectedDate < currentDate) {
                        highlightError(field, 'Date cannot be in the past');
                    } else {
                        clearError(field);
                    }
                } else {
                    clearError(field);
                }
            }

            // Update submit button state
            submitBtn.disabled = !checkFormValidity(false);
        }
    });

    // Form submission handler
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        submissionAttempted = true;

        if (checkFormValidity(true)) {
            // Show loader
            submitBtn.style.display = 'none';
            formLoader.style.display = 'block';

            // Simulate form submission delay
            setTimeout(function() {
                // Hide the form and show success message
                bookingForm.style.display = 'none';
                formLoader.style.display = 'none';
                successMessage.style.display = 'block';

                // Scroll to top of success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }, 1500);

            // In a real implementation, you would submit the form data to a server here
            // Example:
            // const formData = new FormData(bookingForm);
            // fetch('/api/booking', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     // Show success message
            // })
            // .catch(error => {
            //     // Show error message
            // });
        } else {
            // Scroll to the first field with an error
            const firstErrorField = bookingForm.querySelector('.error');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstErrorField.focus();
            }
        }
    });

    // Check for URL parameters when page loads
    checkUrlParams();

    // Clear all errors on initial load
    clearAllErrors();

    // Enable submit button by default until submission is attempted
    submitBtn.disabled = false;
});