import { loadHeaderFooter, alertMessage } from "./utils.mjs";
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

      const formElement = document.forms["checkout"]; // Get the checkout form element

      // Form validation
      if (!formElement.checkValidity()) {
        formElement.reportValidity(); // Display error message

        // Custom alert message
        alertMessage("Please fill in all fields correctly.", true);

        return; // Prevent submission if validation fails
      }

      myCheckout.checkout();
    });