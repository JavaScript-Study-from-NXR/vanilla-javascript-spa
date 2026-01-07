import { ProductFilter } from "../components/Products/ProductFilter";

function ProductList() {
  return `
  <main class="max-w-md mx-auto px-4 py-4">
    ${ProductFilter()}
  </main>
  `;
}

export default ProductList;
