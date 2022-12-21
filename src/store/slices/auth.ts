import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../index";
import { User, authApi } from "../services/auth";

type AuthState = {
	user: User | null;
	token: string | null;
};

export const authSlice = createSlice({
	name: "auth",
	initialState: { user: null, token: null } as AuthState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.token;
				delete payload.token;
				state.user = payload;
			},
		);
	},
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
