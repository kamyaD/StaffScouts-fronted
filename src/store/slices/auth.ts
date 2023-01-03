import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../index";
import type { User } from "../services/auth";

type Merge<A, B> = {
	[K in keyof A]: K extends keyof B ? B[K] : A[K];
} & B extends infer O
	? { [K in keyof O]: O[K] }
	: never;

type AuthToken = {
	token: string | null;
};

type AuthState = Merge<AuthToken, Pick<User, "id" | "username">>;

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		username: null,
		id: null,
		token: null,
	} as unknown as AuthState,
	reducers: {
		setCredentials: (
			state,
			{ payload: { username, token, id } }: PayloadAction<AuthState>,
		) => {
			state.username = username;
			state.token = token;
			state.id = id;
		},
	},
	// extraReducers: (builder) => {
	// 	builder.addMatcher(
	// 		authApi.endpoints.login.matchFulfilled,
	// 		(
	// 			state,
	// 			{
	// 				payload: { user, token },
	// 			}: PayloadAction<{ user: User; token: string }>,
	// 		) => {
	// 			state.token = token;
	// 			state.user = user;
	// 		},
	// 	);
	// },
});

export const { setCredentials } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth;
