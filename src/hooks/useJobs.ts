import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

import type { IJobs } from "../types";

const fetchJobs = async (): Promise<IJobs> => {
	const { data } = await axios.get("/jobs/");
	return data;
};

const useJobs = () => {
	return useQuery({
		queryKey: ["jobs"],
		queryFn: () => fetchJobs(),
	});
};

export { useJobs, fetchJobs };
