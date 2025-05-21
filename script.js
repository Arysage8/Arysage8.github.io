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
