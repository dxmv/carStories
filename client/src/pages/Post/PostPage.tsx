import React from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";
import Description from "./Description";

export default function PostPage() {
	return (
		<div className="w-screen flex justify-center  px-20 py-12 h-screen ">
			<div className="w-3/6 h-5/6 flex flex-col border-2">
				<div className="p-4 flex items-center overflow-hidden">
					<span className="rounded-full bg-black w-8 h-8 mr-2"></span>
					<p className="text-lg">user</p>
				</div>
				<div>
					<img
						src="https://economictimes.indiatimes.com/thumb/msid-94422013,width-736,height-736,resizemode-4,imgsize-24360/andrew-tate-.jpg?from=mdr"
						alt="Tate"
						className="h-full w-full"
					/>
				</div>
			</div>
			<div className="ml-5 w-1/5 rounded-md h-5/6 border-2 px-3 py-5 overflow-y-hidden">
				<Description text="Precizno" />
				<div id="comments" className="  my-4" style={{ height: "80%" }}>
					<Comment text={"Test"} />
					<Comment text={"Test"} />
					<Comment text={"Test"} />
					<Comment text={"Test"} />
				</div>
				<AddComment />
			</div>
		</div>
	);
}
