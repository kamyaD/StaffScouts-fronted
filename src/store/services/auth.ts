import { baseApi } from "./baseApi";

export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	phoneNumber: string;

	[x: string]: any;
}

export interface UserResponse {
	data: {
		user: Partial<User>;
		token: string;
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
