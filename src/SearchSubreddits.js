import "./SearchPosts.css";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { Form, useSearchParams } from "react-router-dom";
import { gtag, install } from "ga-gtag";
import { Loader } from "./features/loader";

install("G-XYL8BTY99J");

export function SearchSubreddits() {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q") || "";
	const [search, setSearch] = useState(query);
	const [searchResults, setSearchResults] = useState([]);
	const [showAll, setShowAll] = useState(false);
	const queryParams = showAll ? "&include_over_18=on" : "";

	const handleQueryParams = () => {
		setShowAll(!showAll);
	};

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	useEffect(() => {
		gtag("event", "search", {
			event_category: "search",
			event_label: "search",
			value: search,
		});
		fetch(`https://www.reddit.com/subreddits/search.json?q=${search}${queryParams}&raw_json=1`)
			.then((response) => response.json())
			.then((json) => setSearchResults(json));
	}, [search, queryParams]);

	const displayResults = (searchResults) => {
		if (searchResults.length <= 2) {
			return;
		}

		const subreddits = [];
		const descriptions = [];
		const urls = [];
		const subscribers = [];
		const data = searchResults.data.children;

		for (let i = 0; i < data.length; i++) {
			subreddits[i] = data[i].data.display_name_prefixed;
			descriptions[i] = data[i].data.public_description;
			urls[i] = data[i].data.url;
			subscribers[i] = data[i].data.subscribers;
		}

		return subreddits.map((subreddit, index) => {
			return (
				<div key={index}>
					<a href={urls[index]}>
						<b>{subreddit}</b>
						<p>{descriptions[index]}</p>
						<p>{subscribers[index]} subscribers</p>
					</a>
				</div>
			);
		});
	};

	const breakpointColumnsObj = {
		default: 4,
		1100: 3,
		700: 2,
		450: 1,
	};

	return (
		<div className="App">
			<header className="App-header">
				<Form action="/searchsubreddits" method="get">
					<input type="text" name="q" placeholder="Search" value={search} onChange={handleSearch} />
					<label htmlFor="showAll" className="showAll">
						Show all
					</label>
					<input type="checkbox" id="showAll" name="showAll" value={showAll} onChange={handleQueryParams} />
				</Form>
			</header>
			<main>
				<Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
					{displayResults(searchResults) || <Loader />}
				</Masonry>
			</main>
		</div>
	);
}
