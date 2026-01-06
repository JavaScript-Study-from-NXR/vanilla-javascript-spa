import { Icon } from "../assets/icons";

function ProductRating(rating = 0) {
  return `
  ${Array.from({ length: 5 }, (_, idx) => {
    return Icon.Star(`w-4 h-4 ${idx < rating ? "text-yellow-400" : "text-gray-300"}`);
  }).join("\n")}
  `;
}

export { ProductRating };
