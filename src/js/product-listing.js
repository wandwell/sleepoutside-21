import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import { getParams, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const category = getParams('category');
const dataSource = new ProductData();
const parentElement = document.querySelector('.product-list');
const productList = new ProductListing(category, dataSource, parentElement); //map template html and insert into parent list element

productList.init();
