document.addEventListener('DOMContentLoaded', () => {
    // Carousel functionality
    let currentIndex = 0;
    const carouselImages = document.querySelectorAll('.carousel img');
    const totalImages = carouselImages.length;

    function showNextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarouselPosition();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarouselPosition();
    }

    function updateCarouselPosition() {
        const offset = -currentIndex * 100; // Desplaza una imagen a la vez
        document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
    }

    // Cambiar imagen cada 3 segundos
    setInterval(showNextImage, 3000);

    // Navbar toggle functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar ul');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cierra el menú al hacer clic en un enlace
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});
