// Handle FAQ accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Toggle active class on the clicked item
            const isActive = item.classList.contains('active');

            // Close all items first
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const icon = faqItem.querySelector('.faq-toggle i');
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            });

            // If the clicked item wasn't active before, make it active
            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('.faq-toggle i');
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });

    // Initialize the first FAQ item as open
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstIcon = faqItems[0].querySelector('.faq-toggle i');
        firstIcon.classList.remove('fa-plus');
        firstIcon.classList.add('fa-minus');
    }
});