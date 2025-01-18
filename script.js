document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel img');
    let currentIndex = 0;

    function moveCarousel() {
        currentIndex = (currentIndex + 1) % images.length;
        const offset = -currentIndex * 100; // Mueve el carrusel
        carousel.style.transform = `translateX(${offset}%)`;
    }

    setInterval(moveCarousel, 3000); // Cambia cada 3 segundos
});
