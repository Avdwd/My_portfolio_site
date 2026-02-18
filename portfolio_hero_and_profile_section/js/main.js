
document.addEventListener("DOMContentLoaded", function() {
    // === 1. ЛОГІКА КАРУСЕЛІ ===
    const container = document.getElementById('gallery-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (container && prevBtn && nextBtn) {
        const scrollAmount = 400; 

        nextBtn.addEventListener('click', () => {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // === 2. ЛОГІКА LIGHTBOX (Збільшення фото) ===
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    
    // Знаходимо всі КАРТКИ (слайди), а не просто картинки
    // Це вирішує проблему з перекриттям градієнтом
    const slides = document.querySelectorAll('#gallery-container > div');

    if (lightbox && lightboxImg) {
        
        // Функція відкриття
        const openLightbox = (imgSrc) => {
            lightboxImg.src = imgSrc;
            lightbox.classList.remove('hidden');
            setTimeout(() => {
                lightbox.classList.remove('opacity-0');
                lightboxImg.classList.remove('scale-95');
                lightboxImg.classList.add('scale-100');
            }, 10);
            document.body.style.overflow = 'hidden'; 
        };

        // Функція закриття
        const closeLightbox = () => {
            lightbox.classList.add('opacity-0');
            lightboxImg.classList.remove('scale-100');
            lightboxImg.classList.add('scale-95');
            setTimeout(() => {
                lightbox.classList.add('hidden');
                lightboxImg.src = ''; 
                document.body.style.overflow = ''; 
            }, 300);
        };

        // Додаємо логіку до кожного слайда
        slides.forEach(slide => {
            // Робимо курсор "лупою" для всього слайда
            slide.style.cursor = 'zoom-in';

            // Змінні для відстеження: це клік чи гортання?
            let isDragging = false;
            let startX = 0;

            slide.addEventListener('mousedown', (e) => {
                isDragging = false;
                startX = e.clientX;
            });

            slide.addEventListener('mouseup', (e) => {
                // Якщо курсор змістився менше ніж на 5px - це клік. Якщо більше - це свайп.
                const diff = Math.abs(e.clientX - startX);
                if (diff < 5) {
                    // Шукаємо картинку всередині цього слайда
                    const img = slide.querySelector('img');
                    if (img) {
                        openLightbox(img.src);
                    }
                }
            });
        });

        // Закриття
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                closeLightbox();
            }
        });
    }
});
