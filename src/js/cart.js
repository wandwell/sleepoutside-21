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
    const itemId = event.target.getAttribute('data-id');
    cart.removeFromCart(itemId);
    cart.renderCartContents();
  });
});

// Clear cart
document
  .getElementById('clearCartButton')
  .addEventListener('click', function () {
    setLocalStorage('so-cart', []);
    cart.renderCartContents();
    displayCartCount();
  });
