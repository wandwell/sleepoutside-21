import ProductData from './ProductData.mjs';
import ProductListing from './ProductListing.mjs';

const listElement = document.querySelector(".product-list")

const dataSource = new ProductData('tents');
const productList = new ProductListing('tents', dataSource, listElement);

productList.init();