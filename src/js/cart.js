import {displayCartCount, loadHeaderFooter, setLocalStorage} from './utils.mjs';

import ShoppingCart from './ShoppingCart.mjs';


loadHeaderFooter();

const cart = new ShoppingCart('so-cart', '.product-list');

//Preserve User Input Before Rendering
function preserveCartInputValues() {
    const inputs = document.querySelectorAll('.cart-card__quantity-input');
    const inputValues = {};
  
    inputs.forEach(input => {
      const itemId = parseInt(input.getAttribute('data-id'), 10);
      inputValues[itemId] = parseInt(input.value, 10) || 0;
    });
  
    return inputValues;
}
 
//Reapply Input Values After Rendering
function reapplyCartInputValues(inputValues) {
    const inputs = document.querySelectorAll('.cart-card__quantity-input');
  
    inputs.forEach(input => {
      const itemId = parseInt(input.getAttribute('data-id'), 10);
      if (inputValues[itemId] !== undefined) {
        input.value = inputValues[itemId];
      }
    });
}

//intergration of perserving value and reapplying value
function renderCartWithPreservation(cart) {
  const inputValues = preserveCartInputValues(); // Preserve inputs
  cart.renderCartContents();                     // Re-render cart
  reapplyCartInputValues(inputValues);            //Reapply input values

  //Update item totals dynamically
  const cartItems = getLocalStorage(cart.key) || [];
  cartItems.forEach(item => {
      const itemElement = document.querySelector(`#quantity-${item.Id}`).closest('.cart-card');
      const itemTotalElement = itemElement.querySelector('.item-total');
      if (itemTotalElement) {
          itemTotalElement.textContent = `$${(item.FinalPrice * item.Quantity).toFixed(2)}`;
      }
  });

  // Recalculate the cart total
  const totalPrice = cart.calculateTotalPrice();
  document.querySelector('.cart-total').textContent = `Total: $${totalPrice.toFixed(2)}`;

  // Update cart count
  displayCartCount();
}

// Initial render
renderCartWithPreservation(cart);

//listen for changes to the quantity input and update the cart accordingly
document.querySelector('.product-list').addEventListener('input', (event) => {
  if (event.target.classList.contains('cart-card__quantity-input')) {
      const itemId = parseInt(event.target.getAttribute('data-id'), 10);
      const newQuantity = parseInt(event.target.value, 10);

      if (!isNaN(newQuantity) && newQuantity >= 0) {
          cart.updateItemQuantity(itemId, newQuantity); // Update the cart in storage
          renderCartWithPreservation(cart);
      }
  }
});

// Clear cart
document
  .getElementById('clearCartButton')
  .addEventListener('click', function () {
    setLocalStorage('so-cart', []);
    renderCartWithPreservation(cart);
    // Dispatch the cartUpdated event
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
  });

 // Listen for cart updates
  document.addEventListener('DOMContentLoaded', () => {
    displayCartCount(); 
  });


