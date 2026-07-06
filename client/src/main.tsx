import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/Store.ts";
import { Theme } from "./components/Theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Theme>
        <App />
      </Theme>
    </Provider>
  </StrictMode>,
);
