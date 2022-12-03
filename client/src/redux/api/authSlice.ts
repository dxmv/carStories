import { Comment, User } from "../../types";
import { apiSlice } from "./apiSlice";

export const commentSlice = apiSlice.injectEndpoints({
	endpoints: build => ({
		sendResetMail: build.mutation<void, void>({
			query: () => ({
				url: "/auth/sendMail",
				method: "PATCH",
			}),
		}),
		resetPassword: build.mutation<
			User,
			{ token: string; password: string; oldPassword: string }
		>({
			query: params => ({
				url: "auth/resetPassword/",
				method: "PATCH",
				body: {
					token: params.token,
					password: params.password,
					oldPassword: params.oldPassword,
				},
			}),
		}),
	}),
});

export const { useSendResetMailMutation, useResetPasswordMutation } =
	commentSlice;
