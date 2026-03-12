// Simple animation for cards on scroll
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.destination-card, .service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // District items click functionality
    const districtItems = document.querySelectorAll('.district-item');
    districtItems.forEach(item => {
        item.addEventListener('click', function() {
            alert(`Redirecting to ${this.textContent} district information page`);
        });
    });
    
    // Search functionality
    const searchButton = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');
    
    searchButton.addEventListener('click', function() {
        if (searchInput.value.trim() !== '') {
            alert(`Searching for: ${searchInput.value}`);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && searchInput.value.trim() !== '') {
            alert(`Searching for: ${searchInput.value}`);
        }
    });
});
