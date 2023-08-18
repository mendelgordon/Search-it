import "./styles/App.css";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export function App() {
	const [, setLoading] = useState(true);
	const [color, setColor] = useState(localStorage.getItem("color") || "dark-mode");

	const loaderElement = document.querySelector(".loader-container");
	if (loaderElement) {
		loaderElement.remove();
		setLoading(false);
	}

	const darkModeToggle = () => {
		const newMode = color === "dark-mode" ? "light-mode" : "dark-mode";
		setColor(newMode);
		localStorage.setItem("color", newMode);
	};

	return (
		<div className={color + " App"}>
			<nav>
				<ul>
					<li>
						<Link to={"/"}>Search Posts</Link>
					</li>
					<li>
						<Link to={"/searchsubreddits"}>Search Subreddits</Link>
					</li>
				</ul>
				<button onClick={darkModeToggle} type="button" aria-label="Toggle dark mode" title="Toggle dark mode">
					{color === "dark-mode" ? "🌞" : "🌚"}
				</button>
			</nav>
			<Outlet />
		</div>
	);
}
