export function FooterContainer(children) {
  return `
  <footer class="bg-white shadow-sm sticky top-0 z-40">
    ${children()}
  </footer>
  `;
}
