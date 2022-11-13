import { Post } from "../../types";
import { apiSlice } from "./apiSlice";

export const postSlice = apiSlice.injectEndpoints({
	endpoints: build => ({
		getPostById: build.query<Post, number>({
			query: id => ({ url: `/posts/${id}` }),
		}),
		getAllPosts: build.query<Post[], void>({
			query: () => ({ url: "posts" }),
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetPostByIdQuery,
	useLazyGetPostByIdQuery,
	useGetAllPostsQuery,
} = postSlice;
