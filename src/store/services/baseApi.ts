import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const staggeredBaseQuery = retry(fetchBaseQuery({ baseUrl: "/" }), {
	maxRetries: 5,
});

export const baseApi = createApi({
	baseQuery: staggeredBaseQuery,
	endpoints: () => ({}),
	tagTypes: ["Users"],
});
