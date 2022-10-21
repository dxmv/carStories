import React from "react";
import ProfilePost from "./ProfilePost";

export default function Profile() {
	return (
		<div className="flex justify-center items-center pt-12 w-full flex-col">
			<div className="border-b-2 w-4/5 mb-12 flex pb-5">
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVTOI9-C3K2YmsfQky8spcOPrjMvyETgvX8A&usqp=CAU"
					className="rounded-full"
					alt="User"
				/>
				<div className="flex flex-col ml-5">
					<p className="mb-5 text-3xl font-bold">dima</p>
					<p className="mb-5 text-lg font-light">dima@gmail.com</p>
					<p className="w-4/5 text-lg mb-5">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas
						tellus rutrum tellus pellentesque eu. Tristique et egestas quis
						ipsum suspendisse ultrices gravida dictum. Risus feugiat in ante.
					</p>
					<div className="flex ">
						<p className="mr-5 font-bold">Posts 5</p>
						<p className="font-bold">Likes 5</p>
					</div>
				</div>
			</div>
			<div className="grid w-4/5 grid-cols-5 gap-5">
				<ProfilePost image="https://ichef.bbci.co.uk/news/976/cpsprodpb/6524/production/_127029852_gettyimages-453656491.jpg" />
				<ProfilePost image="https://ichef.bbci.co.uk/news/976/cpsprodpb/6524/production/_127029852_gettyimages-453656491.jpg" />
				<ProfilePost image="https://ichef.bbci.co.uk/news/976/cpsprodpb/6524/production/_127029852_gettyimages-453656491.jpg" />
				<ProfilePost image="https://ichef.bbci.co.uk/news/976/cpsprodpb/6524/production/_127029852_gettyimages-453656491.jpg" />
				<ProfilePost image="https://ichef.bbci.co.uk/news/976/cpsprodpb/6524/production/_127029852_gettyimages-453656491.jpg" />
				<ProfilePost image="https://ichef.bbci.co.uk/news/976/cpsprodpb/6524/production/_127029852_gettyimages-453656491.jpg" />
			</div>
		</div>
	);
}
