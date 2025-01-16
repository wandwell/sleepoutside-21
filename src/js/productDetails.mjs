import {getLocalStorage, setLocalStorage} from './utils.mjs';

export default class ProductDetails {
    //constructor
    constructor(productId, dataSource) {
        this.productId  = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    
    async init() {
        //load product based on ID and source
        this.product = this.dataSource.getElementById(this.productId);

        //generate and render product details
        this.renderProductDetails();

        // event handler for add to cart button
        document.getElementById('addToCart')
        .addEventListener('click', this.addToCart.bind(this)); 
        
    
        //click button to add items to cart function
        addProductToCart() {
            //retrieve current cart items
            let cartItems = getLocalStorage('so-cart');
            //create an array to hold cart items
            if (!Array.isArray(cartItems)) {
                cartItems = [];
            };
            //add current product to cart
            cartItems.push(this.product);
            //save the updated cart items array into LocalStorage
            setLocalStorage('so-cart', cartItems);
            // Provide feedback to the user
            //alert(`${this.product.name} has been added to your cart.`);
        }
        //generate the HTML to display our product
        renderProductDetails(this.productId){
            
        }
    }
}

