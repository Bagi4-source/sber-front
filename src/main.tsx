import { createRoot } from "react-dom/client";
import "./index.css";
import { DemoPage } from "./pages";
import { Provider } from "react-redux";
import { store } from "src/store/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <DemoPage />
  </Provider>,
);
