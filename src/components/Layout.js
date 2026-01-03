import Footer from "./Footer";
import Header from "./Header";

export default function Layout(children) {
  return `
  
  ${Header()}
  <div class="bg-gray-50 ">
  ${children}
  </div>
  ${Footer()}
  `;
}
