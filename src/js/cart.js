import {
  displayCartCount,
  loadHeaderFooter,
  setLocalStorage,
} from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

loadHeaderFooter();

const cart = new ShoppingCart('so-cart', '.product-list');

cart.renderCartContents();

//To add eventlistener to removeFromCart
document.querySelectorAll('.removeFromCart').forEach(element => {
  element.addEventListener('click', (event) => {
    const itemId = parseInt(event.target.getAttribute('data-id'),10);
    cart.removeFromCart(itemId);
    cart.renderCartContents();
    // Dispatch the cartUpdated event
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
  });
});

// Clear cart
document
  .getElementById('clearCartButton')
  .addEventListener('click', function () {
    setLocalStorage('so-cart', []);
    cart.renderCartContents();
    // Dispatch the cartUpdated event
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
  });

 // Listen for cart updates
  document.addEventListener('DOMContentLoaded', () => {
    displayCartCount(); 
  });

