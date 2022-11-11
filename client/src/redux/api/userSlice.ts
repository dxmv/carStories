import { User } from "../../types";
import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<
			{ token: string },
			{ username: string; password: string }
		>({
			query: user => ({
				url: "/login",
				method: "POST",
				body: user,
			}),
		}),
		getUserById: build.query<User, { id: string }>({
			query: id => ({
				url: `/users/${id}`,
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useLoginMutation, useGetUserByIdQuery } = userApi;
