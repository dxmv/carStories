import { Post } from "../../types";
import { apiSlice } from "./apiSlice";

export const postSlice = apiSlice.injectEndpoints({
	endpoints: build => ({
		getPostById: build.query<Post, string>({
			query: id => ({ url: `/posts/${id}` }),
		}),
		getAllPosts: build.query<Post[], void>({
			query: () => ({ url: "posts" }),
		}),
		// Mutations
		createPost: build.mutation<Post, FormData>({
			query: body => ({
				url: "/posts/",
				method: "POST",
				body,
			}),
		}),
		changeCaption: build.mutation<Post, { id: string; caption: string }>({
			query: ({ id, caption }) => ({
				url: `/posts/${id}`,
				method: "PUT",
				body: { caption: caption },
			}),
		}),
		deletePost: build.mutation<Post, string>({
			query: id => ({
				url: `/posts/${id}`,
				method: "DELETE",
			}),
		}),
		likePost: build.mutation<Post, { id: string }>({
			query: ({ id }) => ({
				url: `/posts/like/${id}`,
				method: "PATCH",
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetPostByIdQuery,
	useLazyGetPostByIdQuery,
	useGetAllPostsQuery,
	useLikePostMutation,
	useCreatePostMutation,
	useDeletePostMutation,
} = postSlice;
