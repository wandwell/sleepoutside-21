import {
  displayCartCount,
  loadHeaderFooter,
  setLocalStorage,
} from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

loadHeaderFooter();

const cart = new ShoppingCart('so-cart', '.product-list');

cart.renderCartContents();

// Clear cart
document
  .getElementById('clearCartButton')
  .addEventListener('click', function () {
    setLocalStorage('so-cart', []);
    cart.renderCartContents();
    displayCartCount();
  });
