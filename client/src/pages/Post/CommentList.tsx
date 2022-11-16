import React from "react";
import Comment from "./Comment";
import { Comment as CommentType } from "../../types";

export default function CommentList({ comments }: { comments: CommentType[] }) {
	return (
		<div id="comments" className="  my-4" style={{ height: "80%" }}>
			{comments.map(c => (
				<Comment key={c.commentId} id={`${c.commentId}`} />
			))}
		</div>
	);
}
