import { getLocalStorage } from "./utils.mjs";

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
        const summaryElement = document.querySelector(this.outputSelector +"#cartTotal");
        const itemNumElement = document.querySelector(this.outputSelector + '#num-items');

        this.list.forEach(item => {
            let quantity = item.Quantity;
            let price = item.FinalPrice;
            let subtotal = price * quantity;

            itemNum =+ quantity;
            this.itemTotal =+ subtotal;
        });

        itemNumElement.innerText = itemNum;
        summaryElement.innerText = '$' + this.itemTotal;
    }

    calculateOrderTotal() {
        this.shipping = 10 + (this.itemNum - 1) * 2;
        this.tax = (this.itemTotal * .06).toFixed(2);
        this.orderTotal(
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

}