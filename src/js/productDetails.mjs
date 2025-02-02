import { alertMessage, getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

//create template for html
function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <div class="carousel-container"></div>
    <div class="carousel-dots"></div>
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

function carouselImageTemplate(image){
  return `<div class="slides">
  <img src=${image.Src} alt=${image.alt}>
  </div>`;
};
    


export default class ProductDetails {
  //constructor
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.slideIndex = 1;
  }

  async init() {
    //load product based on ID and source
    this.product = await this.dataSource.findProductById(this.productId);

    //generate and render product details
    this.renderProductDetails("main");
    this.imageList = this.createImageList();
    renderListWithTemplate(
      carouselImageTemplate, 
      document.querySelector('.carousel-container'),
      this.imageList
    );

    this.showSlides();

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
    alertMessage(`${this.product.NameWithoutBrand} was added to your cart!`);
    setLocalStorage("so-cart", cartItems);
    // Provide feedback to the user
    //alert(`${this.product.name} has been added to your cart.`);
  }

  //generate the HTML to display our product
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterbegin",
      productDetailsTemplate(this.product),
      this.createImageList()
    );
  }

  createImageList(){
    let imageList = [];
    let imageNum = 1;

    let image0 = {
      'Src': this.product.Images.PrimaryLarge,
      'Alt': this.product.Name,
      'Num': imageNum
    };
    imageList.push(image0);

    imageNum ++;
    this.product.Images.ExtraImages.forEach(img => {
      let image = {
        'Src': img.Src,
        'Alt': this.product.Name,
        'Num': imageNum
      };

      imageNum ++;
      imageList.push(image);
    });

    return imageList;
  }

  showSlides() {
    let i;
    let slides = document.getElementsByClassName("slides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) {this.slideIndex = 1}
    slides[this.slideIndex - 1].style.display = "block";
    setTimeout(() => this.showSlides(), 2000);
  };
  

}
