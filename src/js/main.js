//import ProductData from './ProductData.mjs';
//import ProductListing from './ProductList.mjs';
import { loadHeaderFooter, displayCartCount } from './utils.mjs';

//const dataSource = new ProductData('tents');
//const parentElement = document.querySelector('.product-list');
//const productList = new ProductListing('tents', dataSource, parentElement); //map template html and insert into parent list element

//productList.init();

loadHeaderFooter();
//display cart items quantity
document.addEventListener('DOMContentLoaded', () => {
    displayCartCount(); // Initialize the cart count on page load
  });
