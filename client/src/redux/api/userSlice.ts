import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		example: build.query({
			query: () => "test",
		}),
	}),
	overrideExisting: false,
});

export const { useExampleQuery } = userApi;
