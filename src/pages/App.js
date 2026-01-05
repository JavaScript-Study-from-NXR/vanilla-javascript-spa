import { Footer, Header } from "../components/Layout";
import { RouteMain } from "../routes";

export function App() {
  return `
  <div class="bg-gray-50">
    ${Header()}
    ${RouteMain()}
    ${Footer()}
  </div>
  `;
}
