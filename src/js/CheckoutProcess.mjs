import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};
  
    formData.forEach(function (value, key) {
      convertedJSON[key] = value;
    });
  
    return convertedJSON;
  };

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return{
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.Quantity
        };
    });
    return simplifiedItems;
};

export default class CheckoutProcess {
    constructor(key, outputSelector){
        this.key = key,
        this.outputSelector = outputSelector;
        this.list=[];
        this.itemNum = 0;
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key)
        this.calculateItemSummary();
    }

    // calculate and display the total amount of the items in the cart, and the number of items.
    calculateItemSummary() {
        const summaryElement = document.querySelector(this.outputSelector + " #cartTotal");
        const itemNumElement = document.querySelector(this.outputSelector + ' #itemNum');

        this.list.forEach(item => {
            let quantity = item.Quantity;
            let price = item.FinalPrice;
            let subtotal = price * quantity;

            this.itemNum =+ quantity;
            this.itemTotal =+ subtotal;
        });

        itemNumElement.innerText = `${this.itemNum}`;
        summaryElement.innerText = '$' + this.itemTotal;
    }

    calculateOrderTotal() {
        this.shipping = 10 + (this.itemNum - 1) * 2;
        this.tax = (this.itemTotal * .06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(this.outputSelector + " #orderTotal");
        
        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    }

    async checkout() {
        const formElement = document.forms["checkout"];

        const json = formDataToJSON(formElement);
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try{
            const res = await services.checkout(json);
            console.log(res);
        } catch(err) {
            console.log(err);
        }
    }

}