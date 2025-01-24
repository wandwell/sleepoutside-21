import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

export async function renderProductList(category, parentSelector) {
  const dataSource = new ProductData(category);
  const parentElement = document.querySelector(parentSelector);
  const productList = new ProductListing(category, dataSource, parentElement);

  try {
    await productList.init();
  } catch (err) {
    console.error("Error loading product list:", err);
  }
}

function getCategoryFromURL() {
  return getParams("category") || "tents";
}

document.addEventListener("DOMContentLoaded", () => {
  const category = getCategoryFromURL();
  document.querySelector(".category-title").textContent =
    category.charAt(0).toUpperCase() + category.slice(1);

  // 제품 리스트 렌더링 호출 (예시)
  loadProductList(category);
});

function loadProductList(category) {
  console.log(`Loading products for: ${category}`);
  // 제품 목록 렌더링
  renderProductList(category, ".product-list").catch((err) =>
    console.error("Error loading product list:", err),
  );
}
