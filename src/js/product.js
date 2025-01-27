import {getParams,loadHeaderFooter,displayCartCount} from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './productDetails.mjs';

const dataSource = new ProductData('tents');
const productId = getParams('product');

const product = new ProductDetails(productId, dataSource);

product.init();
loadHeaderFooter();
document.addEventListener('DOMContentLoaded', () => {
  displayCartCount(); // Initialize the cart count on page load
});

