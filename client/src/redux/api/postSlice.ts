import { Post } from "../../types";
import { apiSlice } from "./apiSlice";

export const postSlice = apiSlice.injectEndpoints({
	endpoints: build => ({
		getPostById: build.query<Post, number>({
			query: id => ({ url: `/posts/${id}` }),
			transformResponse: (response: { data: Post }, meta, arg) => response.data,
		}),
	}),
	overrideExisting: false,
});

export const { useGetPostByIdQuery } = postSlice;
