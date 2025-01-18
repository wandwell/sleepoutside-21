import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  document.querySelectorAll('.removeFromCart').forEach(element => {
    element.addEventListener('click', (event) => {
      const itemId = event.target.getAttribute('data-id');
      removeFromCart(itemId)
    });
  });
}

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
  const newItem = `<li class='cart-card divider'>
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

  return newItem;
}

renderCartContents();