import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class='cart-card divider'>
<a href='#' class='cart-card__image'>
    <img
        src='${item.Images.PrimaryMedium}'
        alt='${item.Name}'
    />
</a>
<a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
</a>
<p class='cart-card__color'>${item.Colors[0].ColorName}</p>
<div>
    <p class='cart-card__quantity'>qty: ${item.Quantity} <span class='removeFromCart' data-id='${item.Id}'>❌<span></p>
</div>
<p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;
}

//  to calculate the total price of items in the cart
function calculateTotalPrice(cartItems, selector) {
  if (cartItems !== null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(selector).innerHTML = htmlItems.join("");
  }
  return cartItems.reduce((total, item) => total + item.FinalPrice, 0);
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);

    if (cartItems !== null) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.parentSelector).innerHTML =
        htmlItems.join("");
    }

    // Assuming you have the element saved in a variable
    const cartFooter = document.querySelector(".cart-footer");
    // To show the footer, remove the 'hide' class
    cartFooter.classList.remove("hide");

    // Calculate the total price
    const totalPrice = calculateTotalPrice(cartItems, this.parentSelector);

    // Update the cart total
    const cartTotalElement = document.querySelector(".cart-total");
    cartTotalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  // to remove items from cart
  removeFromCart(itemId) {
    const cartItems = getLocalStorage(this.key);

    let itemRemoved = false; //only remove the first occurance of multiple items with same product Id

    //filter(item => item.Id != itemId);
    const newCartList = cartItems.filter((item) => {
      if (!itemRemoved && itemId == item.Id) {
        itemRemoved = true;
        return false; //false means be excluded from cart
      }
      return true; //true means item.Id != itemId && not removed yet so can be kept in cart
    });
    setLocalStorage(this.key, newCartList);
  }
}
