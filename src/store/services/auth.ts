import { baseApi } from "./baseApi";

export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
}

export interface UserResponse {
	data: {
		id: string;
		token: string;
		username: string;
	};
}

export interface LoginRequest {
	username: string;
	password: string;
}

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<UserResponse, LoginRequest>({
			query: (credentials) => ({
				url: "/api-user-login/",
				method: "post",
				data: credentials,
			}),
		}),
	}),
});

export const { useLoginMutation } = authApi;
