// Obtener el formulario y el div de mensaje de pago confirmado
const paymentForm = document.getElementById('paymentForm');
const paymentMessage = document.getElementById('paymentMessage');

// Agregar evento al enviar el formulario
paymentForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que la página se recargue al enviar el formulario
    
    // Mostrar el mensaje de pago confirmado
    paymentMessage.style.display = 'block';
    paymentForm.style.display = 'none'; // Ocultar el formulario
    
    // Redirigir a la página de pago confirmado después de 3 segundos
    setTimeout(function () {
        window.location.href = "pago_confirmado.html";
    }, 3000); // Cambiar a la página de pago confirmado después de 3 segundos
});
