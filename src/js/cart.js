import {displayCartCount, loadHeaderFooter, setLocalStorage} from './utils.mjs';

import ShoppingCart from './ShoppingCart.mjs';


loadHeaderFooter();
const cart = new ShoppingCart('so-cart', '.product-list');

// Initial render
cart.renderCartContents();
displayCartCount();


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


