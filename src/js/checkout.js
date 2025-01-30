import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const myCheckout = new CheckoutProcess('so-cart', '.orderSummary');

myCheckout.init();

document.querySelector('#zip')
    .addEventListener(
        'blur', 
        myCheckout.calculateOrderTotal.bind(myCheckout)
    );

document.querySelector("#checkoutSubmit")
    .addEventListener("click", (e) => {
        e.preventDefault();

        myCheckout.checkout();
});