import { Comment } from "../../types";
import { apiSlice } from "./apiSlice";

export const commentSlice = apiSlice.injectEndpoints({
	endpoints: build => ({
		getCommentById: build.query<Comment, string>({
			query: id => ({
				url: `/comments/${id}`,
			}),
		}),
		createComment: build.mutation<Comment, { text: string; id: string }>({
			query: body => ({
				url: `/comments/${body.id}`,
				method: "POST",
				body: { text: body.text },
			}),
		}),
		deleteComment: build.mutation<void, string>({
			query: id => ({
				url: `/comments/${id}`,
				method: "DELETE",
			}),
		}),
		likeComment: build.mutation<Comment, string>({
			query: id => ({
				url: `/comments/like/${id}`,
				method: "PATCH",
			}),
		}),
		editComment: build.mutation<Comment, { id: string; text: string }>({
			query: params => ({
				url: `/comments/${params.id}`,
				body: { text: params.text },
				method: "PATCH",
			}),
		}),
	}),
});

export const {
	useGetCommentByIdQuery,
	useCreateCommentMutation,
	useDeleteCommentMutation,
	useLikeCommentMutation,
	useEditCommentMutation,
} = commentSlice;
