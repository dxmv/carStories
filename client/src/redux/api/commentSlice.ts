import { Post, Comment } from "../../types";
import { apiSlice } from "./apiSlice";

export const commentSlice = apiSlice.injectEndpoints({
	endpoints: build => ({
		getCommentById: build.query<Comment, { id: string }>({
			query: body => ({
				url: `/comments/${body.id}`,
			}),
		}),
		createComment: build.mutation<Comment, { text: string; id: string }>({
			query: body => ({
				url: `/comments/${body.id}`,
				method: "POST",
				body: { text: body.text },
			}),
		}),
	}),
});

export const { useGetCommentByIdQuery, useCreateCommentMutation } =
	commentSlice;
