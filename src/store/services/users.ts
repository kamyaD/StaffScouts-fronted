import type { ICandidates } from "../../types";
import { baseDevApi } from "./baseDevApi";

type CandidatesResponse = ICandidates[];

export const usersApi = baseDevApi.injectEndpoints({
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
