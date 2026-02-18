document.addEventListener("DOMContentLoaded", function() {
    // Знаходимо елементи каруселі
    const container = document.getElementById('gallery-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Перевіряємо, чи існують ці елементи на сторінці (щоб не було помилок)
    if (container && prevBtn && nextBtn) {
        
        // На скільки пікселів гортати: 400px (ширина картки) + 24px (gap-6) = 424px
        const scrollAmount = 424; 

        nextBtn.addEventListener('click', () => {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }
});