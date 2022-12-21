import { baseApi } from "./baseApi";

export interface Users {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;

	[x: string]: any;
}

type UsersResponse = Users[];

export const usersApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<Users, Partial<Users>>({
			query: ({ ...body }) => ({
				url: "/api-user-login/",
				method: "post",
				body,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
		}),
		// createUser: build.mutation<Users, Partial<Users>>({
		// 	query: ({ ...body }) => ({
		// 		url: "api/users/query",
		// 		method: "POST",
		// 		body,
		// 	}),
		// 	invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
		// }),
		// getUsers: build.query<UsersResponse, void>({
		// 	query: () => ({ url: "/api/users/query", method: "GET" }),
		// 	providesTags: (result) =>
		// 		result
		// 			? [
		// 					...result.map(({ id }) => ({
		// 						type: "Users" as const,
		// 						id,
		// 					})),
		// 					{ type: "Users", id: "LIST" },
		// 			  ]
		// 			: [{ type: "Users", id: "LIST" }],
		// }),
		// updateUser: build.mutation<Users, Partial<Users>>({
		// 	query: ({ ...patch }) => ({
		// 		url: "api/users/query",
		// 		method: "PUT",
		// 		body: patch,
		// 	}),
		// 	invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
		// }),
		// deleteUser: build.mutation<any, any>({
		// 	query: (id) => ({
		// 		url: `api/users/${id}`,
		// 		method: "DELETE",
		// 	}),
		// 	invalidatesTags: (result, error, id) => [{ type: "Users", id }],
		// }),
	}),
	overrideExisting: false,
});

// export const { useLoginMutation } = usersApi;
