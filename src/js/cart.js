import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  // Assuming you have the element saved in a variable
  const cartFooter = document.querySelector('.cart-footer');

  // Calculate the total price
  const totalPrice = calculateTotalPrice(cartItems);

  // Update the cart total
  const cartTotalElement = document.querySelector('.cart-total');
  cartTotalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

  // To show the footer, remove the 'hide' class
  cartFooter.classList.remove('hide');
  
  //To add eventlistener to removeFromCart
  document.querySelectorAll('.removeFromCart').forEach(element => {
    element.addEventListener('click', (event) => {
      const itemId = event.target.getAttribute('data-id');
      removeFromCart(itemId);
    });
  });
}

// Function to calculate the total price of items in the cart
function calculateTotalPrice(cartItems) {
  return cartItems.reduce((total, item) => total + item.FinalPrice, 0);
};
//function to remove items from cart
function removeFromCart(itemId) {
  const cartItems = getLocalStorage('so-cart');
  let newCartList = [];
  cartItems.forEach(item => {
    if (item.Id != itemId) {
      newCartList.push(item);
    }
  });
  setLocalStorage('so-cart', newCartList);
  renderCartContents();
}

function cartItemTemplate(item) {
  return `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <div>
    <p class='cart-card__quantity'>qty: 1<span class='removeFromCart' data-id='${item.Id}'>❌<span></p>
  </div>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;
};

renderCartContents();

// Clear cart
document.getElementById('clearCartButton').addEventListener('click', function() {
  localStorage.removeItem('so-cart');  
  window.location.reload(); 
});