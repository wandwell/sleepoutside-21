import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  //retrive current cart
  let cart = getLocalStorage("so-cart");
  //turn it from string into an array so that it can hold multiple cart items
  if (!Array.isArray(cart)) {
    cart = [];
  }

  //check if the profduct is an item in cart
  const cartItemIndex = cart.findIndex((item) => item.Id === product.Id);

  //if existed in the cart, then add quantity
  if (cartItemIndex >= 0) {
    cart[cartItemIndex].quantity += 1;
  }
  //if not existed, set product quantity to 1 and push object to array
  else {
    product.quantity = 1;
    cart.push(product);
  }

  //save the updated cart back to local storage
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
