import { useFetch } from "../hooks";
import { getProduct } from "../api/productApi";
import { ProductDetailView, ProductIndicator, RelatedProducts } from "../components/ProductDetail";

import Products from "../mocks/items.json";

function ProductDetail() {
  const productId = window.location.pathname.split("/").pop();

  const { data: product, isLoading: prodLoading } = useFetch({
    defaultData: {},
    fetchFunc: () => getProduct(productId),
    key: "product-detail",
  });
  // const { data: relatedProducts, isLoading: relLoading } = useFetch(null, () => getProducts({page: 1, limit: 20, category1: product.}));

  const relatedProducts = Products.filter((prod) => {
    return prod.category1 === product?.category1 && prod.productId !== productId;
  });

  return `
  <main class="max-w-md mx-auto px-4 py-4">
  ${
    prodLoading
      ? ProductIndicator()
      : `
    ${ProductDetailView({ product })}
    ${RelatedProducts({ relatedProducts })}
    `
  }
  
  </main>
  `;
}

export default ProductDetail;
