import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const staggeredBaseQuery = retry(fetchBaseQuery({ baseUrl: "/" }), {
	maxRetries: 5,
	// prepareHeaders: (headers) => {
	// 	return headers;
	// },
});

export const baseApi = createApi({
	baseQuery: staggeredBaseQuery,
	endpoints: () => ({}),
	tagTypes: ["Users"],
});
