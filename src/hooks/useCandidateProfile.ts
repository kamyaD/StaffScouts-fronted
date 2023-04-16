import useRequest from "@/hooks/useRequest";
import useStore from "@/store/index";
import type { AxiosError } from "axios";

import type { ICandidateProfile } from "../types";

export default function useCandidateProfile() {
	const { displaySnackMessage } = useStore();
	const {
		data,
		error,
	}: {
		data: ICandidateProfile | undefined;
		error?: AxiosError;
	} = useRequest({
		url: "/api/profile",
	});

	if (error) {
		displaySnackMessage({
			message: (error as any).response.data.message,
			severity: "error",
		});
	}

	return {
		loading: !data && !error,
		profile: data,
	};
}

// status: "error" | "idle" | "loading" | "success"
