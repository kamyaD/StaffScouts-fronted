import { baseApi } from "@/store/services/baseApi";

import type { ICandidates } from "../../types";

type CandidatesResponse = ICandidates[];

export const usersApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		candidates: build.query<CandidatesResponse, void>({
			query: () => ({
				url: "/candidates",
				method: "get",
			}),
			providesTags: (result = []) => [
				...result.map(({ id }) => ({ type: "Users", id } as const)),
				{ type: "Users" as const, id: "LIST" },
			],
		}),
	}),
	overrideExisting: false,
});

export const { useCandidatesQuery } = usersApi;
