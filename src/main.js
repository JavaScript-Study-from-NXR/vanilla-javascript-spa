import { navigation } from "./router/navigation.js";
import { router } from "./router/router.js";
import { initCounterEvents } from "./events/counterEvents.js";
import { initProductFilterEvents } from "./events/productFilterEvents.js";
const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

async function main() {
  navigation();
  router();
  initProductFilterEvents();
  initCounterEvents();
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}
