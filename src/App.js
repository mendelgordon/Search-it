import "./App.css";
import { Outlet, Link } from "react-router-dom";

export function App() {
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
