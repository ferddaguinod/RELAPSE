function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function addToCart(productName, price, imageSrc) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existingItem = cart.find(item => item.name.toLowerCase() === productName.toLowerCase());
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ 
            name: productName, 
            price: price, 
            image: imageSrc.trim(), 
            quantity: 1 
        });
    }


    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let cartTotalContainer = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" width="50">
                <h4>${item.name}</h4>
                <p>₱${item.price} x ${item.quantity} = ₱${item.price * item.quantity}</p>
                <button onclick="increaseQuantity(${index})">+</button>
                <button onclick="decreaseQuantity(${index})">-</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartTotalContainer.textContent = total;
}

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}


function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
    updateCartCount();
}

function toggleLike(button) {
    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        button.innerHTML = '♡'; // Empty heart
    } else {
        button.classList.add('liked');
        button.innerHTML = '❤️'; // Filled heart
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (document.getElementById('cart-items')) {
        displayCart();
    }
});
