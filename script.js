document.addEventListener('DOMContentLoaded', () => {
    // Mostrar modal de promociones al cargar la página
    const promoModal = document.getElementById('promoModal');
    if (promoModal) {
        promoModal.style.display = 'flex';
    }

    // Mostrar modal de login o registro según la URL
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    if (action === 'login') {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.style.display = 'flex';
    } else if (action === 'register') {
        const registerModal = document.getElementById('registerModal');
        if (registerModal) registerModal.style.display = 'flex';
    }

    // Verificar si el usuario está logueado
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginRegister = document.getElementById('loginRegister');
    const profile = document.getElementById('profile');
    if (loggedInUser && loginRegister && profile) {
        loginRegister.style.display = 'none';
        profile.style.display = 'flex';
    }

    // Inicializar el carrito
    updateCartCount();
});

// Cerrar modales
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

// Manejar búsqueda
function handleSearch() {
    const searchInput = document.getElementById('searchInput') || document.getElementById('searchios');
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
        if (query.includes('coaches') || query.includes('entrenadores')) {
            window.location.href = 'coaches.html';
        } else if (query.includes('torneos') || query.includes('competencias')) {
            window.location.href = 'torneos.html';
        } else if (query.includes('ayuda') || query.includes('soporte')) {
            window.location.href = 'ayuda.html';
        } else if (query.includes('informacion') || query.includes('quienes somos')) {
            window.location.href = 'informacion.html';
        } else {
            alert('No se encontraron resultados para: ' + query);
        }
    } else {
        alert('Por favor, ingrese un término de búsqueda.');
    }
}

// Manejar login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('¡Inicio de sesión exitoso!');
        closeModal('loginModal');
        window.location.href = 'perfil_usuario.html';
    } else {
        alert('Correo o contraseña incorrectos.');
    }
}

// Manejar registro
function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const phone = document.getElementById('registerPhone').value;
    const location = document.getElementById('registerLocation').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
        alert('Este correo ya está registrado.');
        return;
    }

    const newUser = { name, email, password, phone, location };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    alert('¡Registro exitoso!');
    closeModal('registerModal');
    window.location.href = 'perfil_usuario.html';
}

// Carrito de compras
function addToCart(coachName, price, hours) {
    hours = parseInt(hours) || 1;
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existingItem = cart.find(item => item.coachName === coachName);
    if (existingItem) {
        existingItem.hours += hours;
    } else {
        cart.push({ coachName, price, hours });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${hours} hora(s) de ${coachName} añadida(s) al carrito.`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.hours, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartItems) {
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>El carrito está vacío.</p>';
            if (cartTotal) cartTotal.textContent = 'Total: $0 USD';
            return;
        }

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.coachName}</h4>
                    <p>Precio por hora: $${item.price} USD</p>
                    <div class="cart-item-quantity">
                        <label for="quantity-${index}">Horas:</label>
                        <input type="number" id="quantity-${index}" value="${item.hours}" min="1" onchange="updateQuantity(${index}, this.value)">
                    </div>
                </div>
                <div class="cart-item-actions">
                    <p>Subtotal: $${item.price * item.hours} USD</p>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Eliminar</button>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });

        const total = cart.reduce((sum, item) => sum + item.price * item.hours, 0);
        if (cartTotal) cartTotal.textContent = `Total: $${total} USD`;
    }

    updateCartCount();
}

function updateQuantity(index, hours) {
    hours = parseInt(hours);
    if (hours < 1) hours = 1;
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart[index].hours = hours;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.hours, 0);
    localStorage.setItem('cartTotal', total);
    window.location.href = 'pago.html';
}