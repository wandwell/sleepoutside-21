import ExternalServices from './ExternalServices.mjs';
import ProductListing from './ProductList.mjs';
import { getParams, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const category = getParams('category');
const dataSource = new ExternalServices();
const parentElement = document.querySelector('.product-list');
const productList = new ProductListing(category, dataSource, parentElement); //map template html and insert into parent list element

productList.init();
