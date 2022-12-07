import "./styles/DisplayPost.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { convertTime } from "./features/time";
import { Interweave } from "interweave";
import { Loader } from "./features/loader";

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

		const mainPost = () => {
			if (post.post_hint === "image") {
				return <img src={post.url} alt={post.title} />;
			} else if (post.url.includes(".gifv")) {
				return <video src={post.preview.reddit_video_preview.fallback_url} controls />;
			} else if (post.post_hint === "hosted:video") {
				return <video src={post.media.reddit_video.fallback_url} controls />;
			} else if (post.post_hint === "rich:video") {
				return <Interweave content={post.secure_media_embed.content} allowAttributes="true" allowElements="true" />;
			} else if (post.post_hint === "link" || !post.url.includes("/r/")) {
				return <a href={post.url}>{(post.thumbnail && post.thumbnail !== "default") || post.preview ? <img src={post.thumbnail || (post.preview && post.preview.images[0].resolutions[0].url)} alt="" /> : "Click here to view"}</a>;
			} else if (post.post_hint === "video") {
				return <video src={post.media.reddit_video.fallback_url} controls />;
			} else {
				return <p className="text">{post.selftext}</p>;
			}
		};

		return (
			<div>
				{post.title && <p className="title">{post.title}</p>}
				{mainPost()}
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
			if (!comment.body) {
				return null;
			}
			return (
				<div key={index} depth={comment.depth}>
					{comment.body && <p className="text"><Interweave content={comment.body} allowAttributes="true" allowElements="true" /></p>}
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
				{(json && displayPost(json)) || <Loader />}
			</header>
			<main>
				{json && <h3>Comments</h3>}
				{json && displayComments(json)}
			</main>
		</div>
	);
}
