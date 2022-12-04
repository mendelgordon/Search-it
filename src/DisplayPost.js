import "./DisplayPost.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { convertTime } from "./features/time";

export function DisplayPost() {
	const { subreddit, id } = useParams();
	const [json, setJson] = useState(null);

	useEffect(() => {
		fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}.json?raw_json=1`)
			.then((response) => response.json())
			.then((json) => setJson(json));
	}, [subreddit, id]);

	const displayPost = (json) => {
		const post = json[0].data.children[0].data;
		return (
			<div>
				{post.url && <img src={post.url} alt={post.title} loading="lazy" />}
				{post.title && <p className="title">{post.title}</p>}
				{post.selftext && <p className="text">{post.selftext}</p>}
				{post.created && post.author && (
					<p className="date">
						Posted {convertTime(post.created)} by {post.author} - {post.ups - post.downs} Points
					</p>
				)}
			</div>
		);
	};

	const displayComments = (json) => {
		const commentsJson = json[1].data.children;
		const flattenComments = (commentsJson) => {
			const comments = [];
			for (let i = 0; i < commentsJson.length; i++) {
				comments.push(commentsJson[i].data);
				if (commentsJson[i].data.replies) {
					comments.push(...flattenComments(commentsJson[i].data.replies.data.children));
				}
			}
			return comments;
		};

		return flattenComments(commentsJson).map((comment, index) => {
			return (
				<div
					key={index}
					style={{
						marginLeft: `${comment.depth * 10}px`,
					}}
				>
					{comment.body && <p className="text">{comment.body}</p>}
					{comment.created && comment.author && (
						<p className="date">
							Posted {convertTime(comment.created)} by {comment.author} - {comment.ups - comment.downs} Points
						</p>
					)}
				</div>
			);
		});
	};

	return (
		<div className="display-post">
			<header>
				<h2>
					<a href={"/r/" + subreddit}>r/{subreddit}</a>
				</h2>
				{json && displayPost(json)}
			</header>
			<main>
				<h3>Comments</h3>
				{json && displayComments(json)}
			</main>
		</div>
	);
}
