import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./features/error-page";
import { SearchPosts } from "./SearchPosts";
import { SearchSubreddits } from "./SearchSubreddits";
import { DisplayPost } from "./DisplayPost";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <SearchPosts />,
			},
			{
				path: "/searchposts",
				element: <SearchPosts />,
			},
			{
				path: "/searchsubreddits",
				element: <SearchSubreddits />,
			},
			{
				path: "/r/:subreddit/comments/:id/:title",
				element: <DisplayPost />,
			},
		],
	},
]);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
