import {
	ConfigureStoreOptions,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import { baseApi } from "./services/baseApi";
import { usersApi } from "./services/users";
import { notificationsSlice } from "./slices/notifications";
import { snackSlice } from "./slices/snack";

const rootReducer = combineReducers({
	[snackSlice.name]: snackSlice.reducer,
	[notificationsSlice.name]: notificationsSlice.reducer,
	[usersApi.reducerPath]: usersApi.reducer,
});

const createStore = (
	options?: ConfigureStoreOptions["preloadedState"] | undefined,
) =>
	configureStore({
		reducer: rootReducer,
		devTools: true,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(baseApi.middleware),
		...options,
	});

export const store = createStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;