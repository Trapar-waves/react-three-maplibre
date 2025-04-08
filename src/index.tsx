import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <App />,
  );
}
