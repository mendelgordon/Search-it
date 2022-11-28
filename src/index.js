import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./error-page";
import { SearchPosts } from "./SearchPosts";
import { SearchSubreddits } from "./SearchSubreddits";
import { DisplaySubreddit } from "./DisplaySubreddit";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/searchposts",
				element: <SearchPosts />,
			},
			{
				path: "/searchsubreddits",
				element: <SearchSubreddits />,
			},
			{
				path: "/r/:subreddit",
				element: <DisplaySubreddit />,
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
