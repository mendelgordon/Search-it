import "./App.css";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export function App() {
	const [isLoading, setLoading] = useState(true);

	const loaderElement = document.querySelector(".loader-container");
	if (loaderElement) {
		loaderElement.remove();
		setLoading(!isLoading);
	}

	return (
		<div className="App">
			<nav>
				<ul>
					<li>
						<Link to={"/"}>Home</Link>
					</li>
					<li>
						<Link to={"/searchposts"}>Search Posts</Link>
					</li>
					<li>
						<Link to={"/searchsubreddits"}>Search Subreddits</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
}
