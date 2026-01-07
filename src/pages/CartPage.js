import CartActionSection from "../components/cart/CartActionSection";
import CartHeader from "../components/cart/CartHeader";
import CartList from "../components/cart/CartList";

const cart = `
    <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
      <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">    
        ${CartHeader()}
        ${CartList()}
        ${CartActionSection()}
      </div>
    </div>
  `;

export default function CartPage() {
  return cart;
}
