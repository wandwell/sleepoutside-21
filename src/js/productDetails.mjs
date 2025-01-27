import { getLocalStorage, setLocalStorage} from "./utils.mjs";

//create template for html
function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
    class="divider"
    src="${product.Images.PrimaryLarge}"
    alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  //constructor
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    //load product based on ID and source
    this.product = await this.dataSource.findProductById(this.productId);

    //generate and render product details
    this.renderProductDetails("main");

    // event handler for add to cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  };

  //click button to add items to cart function
  addToCart() {
    //retrieve current cart items
    let cartItems = getLocalStorage("so-cart");
    //create an array to hold cart items
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    //check for duplicates
    let productExists = false;

    cartItems.forEach(item => {
      if(item.Id == this.product.Id){
        productExists = true;
        item.Quantity ++;
      }
    });
    if (productExists == false){
    //add current product to cart
      this.product.Quantity = 1;
      cartItems.push(this.product);
    //save the updated cart items array into LocalStorage
    };
    setLocalStorage("so-cart", cartItems);
    // Dispatch an event to notify cart changes
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
  }

  //generate the HTML to display our product
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterbegin",
      productDetailsTemplate(this.product),
    );
  }

}
