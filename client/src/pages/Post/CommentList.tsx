import React from "react";
import Comment from "./Comment";

export default function CommentList({ comments }: { comments: any[] }) {
	return (
		<div id="comments" className="  my-4" style={{ height: "80%" }}>
			{comments.map(c => (
				<Comment text={c.text} />
			))}
		</div>
	);
}
