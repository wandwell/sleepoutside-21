import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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

    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        
        if (cartItems !== null) {
            const htmlItems = cartItems.map((item) => cartItemTemplate(item));
            document.querySelector(this.parentSelector).innerHTML = htmlItems.join('');
        }
        
        // Assuming you have the element saved in a variable
        const cartFooter = document.querySelector('.cart-footer');
        // To show the footer, remove the 'hide' class
        cartFooter.classList.remove('hide');
        
        
        // Calculate the total price
        const totalPrice = calculateTotalPrice(cartItems, this.parentSelector);
        
        // Update the cart total
        const cartTotalElement = document.querySelector('.cart-total');
        cartTotalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;  
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
        } else {
          console.error(`Item with ID ${itemId} not found in cart.`);
        }
    }    

    //fetch a single item by itemId
    getCartItem(itemId) {
        const cartItems = getLocalStorage(this.key) || [];
        return cartItems.find(item => item.Id === itemId);
    }
    
    //  to calculate the total price of items in the cart
    calculateTotalPrice() {
        const cartItems = getLocalStorage(this.key) || [];
        return cartItems.reduce((total, item) => total + item.FinalPrice * item.Quantity, 0);
    }

}