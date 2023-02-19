import * as z from "zod";

export const profileValidationSchema = z.object({
	job_title: z
		.string()
		.min(5, "Please enter a valid name")
		.max(50, "Please enter a valid name"),
});
