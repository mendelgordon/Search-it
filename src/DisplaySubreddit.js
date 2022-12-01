import "./SearchPosts.css";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { useParams } from "react-router-dom";

export function DisplaySubreddit() {
	const { subreddit } = useParams();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch(`https://www.reddit.com/r/${subreddit}.json?raw_json=1`)
			.then((response) => response.json())
			.then((json) => setPosts(json));
	}, [subreddit]);

	const displayPosts = (posts) => {
		if (posts.length === 0) {
			return;
		}

		const titles = [];
		const texts = [];
		const images = [];
		const urls = [];
		const data = posts.data.children;

		for (let i = 0; i < data.length; i++) {
			titles[i] = data[i].data.title;
			texts[i] = data[i].data.selftext;
			images[i] = data[i].data.preview ? data[i].data.preview.images[0].source.url : "";
			urls[i] = data[i].data.permalink;
		}

		return titles.map((title, index) => {
			return (
				<div key={index}>
					<a href={urls[index]}>
						<img src={images[index]} alt={title} loading="lazy" />
						<p>{title}</p>
						<p className="text">{texts[index]}</p>
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
			<header className="App-header"><i>r/{subreddit}</i></header>
			<main>
				<Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
					{displayPosts(posts) || <div>Loading...</div>}
				</Masonry>
			</main>
		</div>
	);
}
