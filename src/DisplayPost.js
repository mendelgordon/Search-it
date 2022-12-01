import "./DisplayPost.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function DisplayPost() {
	const { subreddit, id } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}.json?raw_json=1`)
			.then((response) => response.json())
			.then((json) => json[1].data.children)
			.then((children) => setPost(children));
	}, [subreddit, id]);

	return (
		<div className="App">
			<header className="App-header">
				<i>r/{subreddit}</i>
			</header>
			<main>
				{post && post.map((i, index) => {
					return (
						<div key={index}>
							<p style={{ marginRight: i.data.depth + 'em'}}>{i.data.body}</p>
						</div>
					);
				})}
			</main>
		</div>
	);
}


/*
export function DisplayPost() {
	const { subreddit, id } = useParams();
	const [post, setPost] = useState([]);

	useEffect(() => {
		fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}.json?raw_json=1`)
			.then((response) => response.json())
			.then((json) => setPost(json));
	}, [subreddit, id]);

	const displayPost = (post) => {
		if (post.length === 0) {
			return;
		}

		const body = [];
		const data = post[1].data.children;

		for (let i = 0; i < data.length; i++) {
			body[i] = data[i].data.body;
		}

		return body.map((title, index) => {
			return (
				<div key={index}>
					<p>{title}</p>
				</div>
			);
		});
	};

	return (
		<div className="App">
			<header className="App-header">
				<i>r/{subreddit}</i>
			</header>
			<main>{displayPost(post) || <div>Loading...</div>}</main>
		</div>
	);
}
*/