// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const serviceCategories = document.querySelectorAll('.service-category');

    // Toggle FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    const faqToggles = document.querySelectorAll('.faq-toggle');

    // Function to filter services based on category
    function filterServices(category) {
        // If 'all' is selected, show all categories
        if (category === 'all') {
            serviceCategories.forEach(cat => {
                cat.style.display = 'block';
            });
            return;
        }

        // Otherwise, hide all and show only the selected category
        serviceCategories.forEach(cat => {
            if (cat.id === category + '-services' || cat.id === category + '-cleaning') {
                cat.style.display = 'block';
                // Smooth scroll to the category
                cat.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            } else {
                cat.style.display = 'none';
            }
        });
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get category data attribute
            const category = this.getAttribute('data-category');

            // Filter services
            filterServices(category);
        });
    });

    // FAQ accordion functionality
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        question.addEventListener('click', () => {
            // Toggle active class on clicked item
            item.classList.toggle('active');

            // Update toggle icon
            if (item.classList.contains('active')) {
                toggle.innerHTML = '<i class="fas fa-minus"></i>';
            } else {
                toggle.innerHTML = '<i class="fas fa-plus"></i>';
            }

            // Close other open FAQ items (optional - comment out if you want multiple open)
            faqItems.forEach((otherItem, otherIndex) => {
                if (otherIndex !== index && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-toggle').innerHTML = '<i class="fas fa-plus"></i>';
                }
            });
        });
    });

    // Update the link to the services page in the main navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === 'services.html') {
            link.classList.add('active');
        }
    });

    // Enhance hover effect for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.08)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        });
    });

    // Make pricing table rows interactive
    const tableRows = document.querySelectorAll('.pricing-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Get the number of bedrooms from the first cell
            const bedrooms = this.cells[0].textContent;
            // Get the price from the second cell
            const price = this.cells[1].textContent;

            // Highlight the selected row
            tableRows.forEach(r => r.classList.remove('selected'));
            this.classList.add('selected');

            // Update booking button text (optional)
            const bookButton = document.querySelector('#deep-cleaning .cta-button');
            if (bookButton) {
                bookButton.textContent = `Book ${bedrooms} Bedroom Deep Clean`;
                // Could also update a href with query parameter if needed
                // bookButton.href = `booking.html?service=deep-clean&bedrooms=${bedrooms}&price=${price}`;
            }
        });
    });

    // Add style for selected row
    document.head.insertAdjacentHTML('beforeend', `
    <style>
        .pricing-table tr.selected {
            background-color: rgba(194, 161, 77, 0.15);
            font-weight: bold;
        }
    </style>
    `);
});