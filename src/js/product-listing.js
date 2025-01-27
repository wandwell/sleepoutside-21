import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import { getParams, loadHeaderFooter, displayCartCount } from './utils.mjs';

loadHeaderFooter();

const category = getParams('category');
const dataSource = new ProductData();
const parentElement = document.querySelector('.product-list');
const productList = new ProductListing(category, dataSource, parentElement); //map template html and insert into parent list element

productList.init();

document.addEventListener('DOMContentLoaded', () => {
    displayCartCount(); // Initialize the cart count on page load
  });
