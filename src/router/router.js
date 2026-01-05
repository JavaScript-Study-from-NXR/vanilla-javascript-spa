// 현재 주소를 가져와서, 해당하는 페이지로 render해주기
import { render } from "../render/render";
import Layout from "../components/Layout";
import CartPage from "../pages/CartPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ProductsPage from "../pages/ProductsPage";
import NotFound from "../pages/NotFound";
// 동적 라우팅을 위해 패턴 기반으로 변경
const routes = [
  {
    path: /^\/$/,
    component: ProductsPage,
  },
  {
    path: /^\/products$/,
    component: ProductsPage,
  },
  {
    path: /^\/product\/([^/]+)$/,
    component: ProductDetailPage,
  },
  {
    path: /^\/cart$/,
    component: CartPage,
  },
];
export async function router() {
  const path = window.location.pathname;

  for (const route of routes) {
    //일치하는 path를 찾아서 컴포넌트 반환
    const match = path.match(route.path);
    if (match) {
      const Page = route.component;
      const params = match.slice(1);

      render(Layout(await Page(...params)));
      return;
    }
  }
  render(NotFound());
}
