import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
        <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
    </li>`;
};

function loadTitle(category){
    let titleElement = document.querySelector('.category-title');
    let titleString = "";
    if (category == 'sleeping-bags'){
        let strings = category.split("-");
        strings = strings.map((string) => string.charAt(0).toUpperCase() + string.slice(1));
        titleString = strings.join(" ");
    }else{
        titleString = category.charAt(0).toUpperCase() + category.slice(1);
    };
    titleElement.textContent = titleString;
}

export default class ProductListing {
    constructor(category, datasource, listElement){
        this.category = category;
        this.datasource = datasource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.datasource.getData(this.category);
        let finalList = this.filterList(list);
        this.renderList(finalList);
        loadTitle(this.category);
        const sortOptions = document.getElementById('sortOptions');
        sortOptions.addEventListener('change', this.handleSortChange.bind(this));
    }

    renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list); //map json list ito html <li> template and insert <li></li> without separator into parent <ul> element
    }

    filterList(list) {
        let finalList = [];
        list.forEach(element => {
            if (element.Id != '989CG' && element.Id != '880RT') {
                finalList.push(element)
            };
        });
        return finalList;
    }

    sortList(list, sortBy) {
        return list.sort((a, b) => {
            if (sortBy === 'name') {
                return a.Name.localeCompare(b.Name); // Sort alphabetically by name
            } else if (sortBy === 'price') {
                return a.FinalPrice - b.FinalPrice; // Sort numerically by price
            }
            return 0; // Default no sorting
        });
    }

    // Method to handle sorting when user selects a criterion
    handleSortChange(event) {
        const sortBy = event.target.value;
        const sortedList = this.sortList(this.datasource.getData(this.category), sortBy);
        this.renderList(sortedList);
    }
};

