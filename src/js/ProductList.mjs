import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return <li class="product-card">
    <a href="product_pages/index.html?product=">
    <img src="" alt=""/>
    <h3 class="card__brand"></h3>
    <h2 class="card__name"></h2>
    <p class="product-card__price">$</p></a>
  </li>
}

export default class ProductListing {
    constructor(category, datasource, listElement){
        this.category = category;
        this.datasource = datasource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.datasource.getData();
        this.renderList(list);
    }

    renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
   }

};