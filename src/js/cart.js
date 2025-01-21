import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (cartItems != null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
  }

  //display superscript numbers to the backpack icon
  const cartCount = itemsTotalQuantity(cartItems);
  updateCartCount(cartCount); 
  
  // Assuming you have the element saved in a variable
  const cartFooter = document.querySelector('.cart-footer');
  // To show the footer, remove the 'hide' class
  cartFooter.classList.remove('hide');


  // Calculate the total price
  const totalPrice = calculateTotalPrice(cartItems);

  // Update the cart total
  const cartTotalElement = document.querySelector('.cart-total');
  cartTotalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

  
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
}

//funciton to count the total quantity of all items in cart
function itemsTotalQuantity() {
  const cartItems = getLocalStorage('so-cart');
  let totalQuantity = 0;
  const itemCount = cartItems.reduce((accumulator, item) => {
    accumulator[item.Id] = (accumulator[item.Id] || 0) + 1; 
    totalQuantity ++;
    return accumulator;
  }, {});
  return totalQuantity;
}

//function to add a superscript number to the backpack icon
function updateCartCount(count) {
  // Select the cart element
  const cartElement = document.querySelector('.cart');

  // Check if a badge already exists
  let badge = cartElement.querySelector('.cart-count');
  if (!badge) {
    // Create a badge if it doesn't exist
    badge = document.createElement('span');
    badge.classList.add('cart-count');
    cartElement.appendChild(badge);
  }

  // Update the badge text with the count
  badge.textContent = count;
}



//function to remove items from cart
function removeFromCart(itemId) {
  const cartItems = getLocalStorage('so-cart');

  let itemRemoved = false; //only remove the first occurance of multiple items with same product Id

  //filter(item => item.Id != itemId);
  const newCartList = cartItems.filter(item => {
    if (!itemRemoved && itemId == item.Id) {
      itemRemoved = true;
      return false;//false means be excluded from cart
    }
    return true;//true means item.Id != itemId && not removed yet so can be kept in cart
  
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
    <p class='cart-card__quantity'>qty: 1 <span class='removeFromCart' data-id='${item.Id}'>❌<span></p>
  </div>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;
}

renderCartContents();
// Clear cart
document.getElementById('clearCartButton').addEventListener('click', function() {
  setLocalStorage('so-cart', []);
  renderCartContents();
  updateCartCount(0);
});
