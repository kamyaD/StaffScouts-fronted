import { baseApi } from "@/store/services/baseApi";

import type { IJobs } from "../../types";

type JobsResponse = IJobs[];

export const jobsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllJobs: builder.query<JobsResponse, void>({
			query: () => ({
				url: "/jobs",
				method: "get",
			}),
			providesTags: (result = []) => [
				...result.map(({ id }) => ({ type: "Jobs", id } as const)),
				{ type: "Jobs" as const, id: "LIST" },
			],
		}),
	}),
});

export const { useGetAllJobsQuery } = jobsApi;
