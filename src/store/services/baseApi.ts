import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";

import type { RootState } from "../index";

const axiosInstance = axios.create({
	baseURL: "http://localhost:8000",
	headers: {},
});

const axiosBaseQuery =
	(
		{ baseUrl }: { baseUrl: string } = { baseUrl: "" },
	): BaseQueryFn<
		{
			url: string;
			method: AxiosRequestConfig["method"];
			data?: AxiosRequestConfig["data"];
			params?: AxiosRequestConfig["params"];
		},
		unknown,
		unknown
	> =>
	async ({ url, method, data, params }, { getState }) => {
		try {
			const { token } = (getState() as RootState).auth;
			const result = await axiosInstance({
				url: baseUrl + url,
				method,
				data,
				params,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return { data: result.data };
		} catch (axiosError) {
			const err = axiosError as AxiosError;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};

// eslint-disable-next-line import/prefer-default-export
export const baseApi = createApi({
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({}),
	tagTypes: ["User"],
	refetchOnMountOrArgChange: 60,
});
