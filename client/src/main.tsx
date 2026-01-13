import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/animations.css";
import navLogo from "@/assests/navlogo.png";

const ensureFavicon = () => {
	const existing = document.querySelector<HTMLLinkElement>("link[rel='icon']");
	if (existing) {
		existing.href = navLogo;
		return;
	}
	const link = document.createElement("link");
	link.rel = "icon";
	link.type = "image/png";
	link.href = navLogo;
	document.head.appendChild(link);
};

ensureFavicon();

createRoot(document.getElementById("root")!).render(<App />);
