// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Function to get a parameter from the URL
export function getParams(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param); // Returns the value of the specified parameter
}

export function renderListWithTemplate(
  templateFunction,
  parentElement,
  list,
  position = "afterbegin",
  clear = "false",
) {
  const htmlStringList = list.map(templateFunction);
  if (clear === "true") {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStringList.join("")); // no separator between closing </li> and opening <li>
}

export function convertToText(response) {
  return response.text();
}

export function renderWithTemplate(template, parent, data, callback) {
  parent.appendChild(template);
  // If a callback and data are provided, execute the callback with the data
  if (callback && data) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter() {
  try {
    // Load the header and footer templates
    const headerTemplate = await loadTemplate("../public/partials/header.html");
    const footerTemplate = await loadTemplate("../public/partials/footer.html");

    // Get the header and footer elements from the DOM
    const headerElement = document.getElementById("main-header");
    const footerElement = document.getElementById("main-footer");

    // Insert the actual content of the templates into the DOM
    renderWithTemplate(headerTemplate.content, headerElement);
    renderWithTemplate(footerTemplate.content, footerElement);
    displayCartCount();
  } catch (error) {
    console.error("Error loading header and footer:", error);
  }
}

 //display superscript numbers to the backpack icon
 export function displayCartCount() {
  const cartCount = itemsTotalQuantity();
  updateCartCount(cartCount);
 }

 function itemsTotalQuantity() {
   const cartItems = getLocalStorage('so-cart');
   let totalQuantity = 0;
   const itemCount = cartItems.reduce((accumulator, item) => {
     accumulator[item.Id] = (accumulator[item.Id] || 0) + 1; 
     totalQuantity ++;
     return accumulator;
   }, {});
   return totalQuantity;
 }
 
 //function to add a superscript number to the backpack icon
 function updateCartCount(count) {
   // Select the cart element
   const cartElement = document.querySelector('.cart');
 
   // Check if a badge already exists
   // badge = cartElement.querySelector('.cart-count');
  // if (!badge) {
     // Create a badge if it doesn't exist
    let badge = document.createElement('span');
     badge.classList.add('cart-count');
     cartElement.appendChild(badge);
  // }
 
   // Update the badge text with the count
   badge.textContent = count;
 }
 
