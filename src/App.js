import "./App.css";
import { useState } from "react";
import Masonry from "react-masonry-css";

export default function App() {
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	const getSearchResults = async (event) => {
		event.preventDefault();
		const results = await fetch(`https://www.reddit.com/search.json?q=${search}`);
		const json = await results.json();
		setSearchResults(json);
	};

	const displayResults = (searchResults) => {
		if (searchResults.length === 0) {
			return <div>No results</div>;
		}

		const titles = [];
		const images = [];
		const urls = [];
		const domain = "https://www.reddit.com";

		for (let i = 0; i < searchResults.data.children.length; i++) {
			titles[i] = searchResults.data.children[i].data.title;

			if (searchResults.data.children[i].data.preview) {
				images[i] = searchResults.data.children[i].data.preview.images[0].source.url.replace(/&amp;/g, "&");
			} else {
				images[i] = "https://www.redditstatic.com/icon.png";
			}

			urls[i] = domain + searchResults.data.children[i].data.permalink;
		}

		return titles.map((title, index) => {
			return (
				<div key={index}>
					<a href={urls[index]} target="_blank" rel="noreferrer">
						<img src={images[index]} alt={title} />
						{title}
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
				<form>
					<input type="text" placeholder="Search" value={search} onChange={handleSearch} />
					<button type="submit" onClick={getSearchResults}>
						Search
					</button>
				</form>
			</header>
			<main>
				<Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
					{displayResults(searchResults) || <div>No results</div>}
				</Masonry>
			</main>
		</div>
	);
}
