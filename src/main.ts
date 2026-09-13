import "./style.css";
import { renderApp } from "./ui/app";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  renderApp(app);
}