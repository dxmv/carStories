export interface User {
	userId: number;
	username: string;
	email: string;
	password: string;
	image: string;
	bio: string;
	posts: Post[];
	followedBy: User[];
	following: User[];
	likedPosts: Post[];
	comments: Comment[];
	likedComments: Comment[];
}

export interface Post {
	postId: number;
	image: string;
	caption: string;
	creator: User;
	likes: User[];
	comments: Comment[];
}

export interface Comment {
	commentId: number;
	text: string;
	post: Post;
	user: User;
	likedBy: User[];
}
