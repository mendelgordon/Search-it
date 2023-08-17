import { DisplayPost } from "../DisplayPost";
import { SearchPosts } from "../SearchPosts";
import { SearchSubreddits } from "../SearchSubreddits";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// it renders App without crashing
it("renders all components without crashing", () => {
	render(<DisplayPost />);
	render(
		<MemoryRouter>
			<Routes>
				<Route path="/searchposts" element={<SearchPosts />} />
			</Routes>
		</MemoryRouter>
	);
	render(
		<MemoryRouter>
			<Routes>
				<Route path="/searchposts" element={<SearchSubreddits />} />
			</Routes>
		</MemoryRouter>
	);
});
