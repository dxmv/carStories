import { Comment } from "../../types";
import { apiSlice } from "./apiSlice";

export const commentSlice = apiSlice.injectEndpoints({
	endpoints: build => ({
		sendResetMail: build.mutation<void, void>({
			query: () => ({
				url: "/auth/sendMail",
				method: "PATCH",
			}),
		}),
	}),
});

export const { useSendResetMailMutation } = commentSlice;
