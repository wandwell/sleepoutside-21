import { displayCartCount, getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    return `
      <li class='cart-card divider'>
        <a href='#' class='cart-card__image'>
          <img src='${item.Image}' alt='${item.Name}' />
        </a>
        <a href='#'>
          <h2 class='card__name'>${item.Name}</h2>
        </a>
        <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
        <div>
          <label for='quantity-${item.Id}'>Quantity:</label>
          <input
            type='number'
            id='quantity-${item.Id}'
            class='cart-card__quantity-input'
            value='${item.Quantity}'
            data-id='${item.Id}'
          />
        </div>
        <p>Total: <span class="item-total">$${(item.FinalPrice * item.Quantity).toFixed(2)}</span></p>
      </li>`;
}
  
export default class ShoppingCart{
  constructor(key, parentSelector){
      this.key = key;
      this.parentSelector = parentSelector;
  }
  //  to calculate the total price of items in the cart
  calculateTotalPrice() {
    const cartItems = getLocalStorage(this.key) || [];
    return cartItems.reduce((total, item) => total + item.FinalPrice * item.Quantity, 0);
  }
  
//render cart contents
  renderCartContents() {
    const cartItems = getLocalStorage(this.key) || [];
    const cartContainer = document.querySelector(this.parentSelector);

      if (cartContainer && cartItems) {
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        cartContainer.innerHTML = htmlItems.join('');
    }
      
    const cartFooter = document.querySelector('.cart-footer');
    // To show the footer, remove the 'hide' class
    cartFooter.classList.remove('hide');

    //display total price in cart-footer section
    const totalPrice = this.calculateTotalPrice();
    const cartTotalElement = document.querySelector('.cart-total');
    cartTotalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;  
    
    this.attachQuantityUpdateListeners();
    //totals of a single items
    this.updateItemTotals(cartItems);
    //quantity in cart
    displayCartCount();
}

  // Attach event listeners to quantity inputs
  attachQuantityUpdateListeners() {
    const cartContainer = document.querySelector(this.parentSelector);

    if (cartContainer) {
        let debounceTimer;

        cartContainer.addEventListener('input', (event) => {
            if (event.target.classList.contains('cart-card__quantity-input')) {
                const itemId = parseInt(event.target.dataset.id, 10);
                const newQuantity = parseInt(event.target.value, 10) || 0;

                if (newQuantity < 0) {
                    alert("Quantity cannot be negative.");
                    event.target.value = 1;
                    return;
                }

                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    // Update the specific item's quantity in localStorage
                    this.updateItemQuantity(itemId, newQuantity);

                    // Update the item's total in the DOM dynamically
                    const cartItems = getLocalStorage(this.key) || [];
                    const updatedItem = cartItems.find(item => item.Id === itemId);
                    if (updatedItem) {
                        const itemElement = document.querySelector(`#quantity-${itemId}`).closest('.cart-card');
                        const itemTotalElement = itemElement.querySelector('.item-total');
                        itemTotalElement.textContent = `$${(updatedItem.FinalPrice * updatedItem.Quantity).toFixed(2)}`;
                    }

                    // Update the overall cart total dynamically
                    const cartTotalElement = document.querySelector('.cart-total');
                    const totalPrice = this.calculateTotalPrice();
                    cartTotalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
                }, 300);
            }
        });
    }
  }

    // to update the quantity of an item in the car
  updateItemQuantity(itemId, newQuantity) {
    let cartItems = getLocalStorage(this.key) || [];
    const itemIndex = cartItems.findIndex(item => item.Id === itemId);
  
    if (itemIndex !== -1) {
      if (newQuantity === 0) {
        // Remove item from cart if quantity is 0
        cartItems.splice(itemIndex, 1);
      } else {
        // Update item quantity
        cartItems[itemIndex].Quantity = newQuantity;
      }
      setLocalStorage(this.key, cartItems);
    }  else {
      console.error(`Item with ID ${itemId} not found in cart.`);
    }
      // Dispatch the cartUpdated event
      const event = new Event('cartUpdated');
      window.dispatchEvent(event);
  }    

  // Dynamically update item totals
 updateItemTotals(cartItems) {
    cartItems.forEach(item => {
      const quantityInput = document.querySelector(`#quantity-${item.Id}`);
      if (quantityInput) {
        const itemElement = quantityInput.closest('.cart-card');
        if (itemElement) {
          const itemTotalElement = itemElement.querySelector('.item-total');
          if (itemTotalElement) {
            itemTotalElement.textContent = `$${(item.FinalPrice * item.Quantity).toFixed(2)}`;
          }
        }
      }
    });
  }      
}