import ReactDOM from "react-dom/client";
import App from "./app";
import "./global.css";

const rootElement = document.querySelector("#root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <App />,
  );
}
