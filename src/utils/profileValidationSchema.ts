import * as z from "zod";

const validationSchema = z.object({
	job_title: z
		.string()
		.min(5, "Please enter a valid name")
		.max(50, "Please enter a valid name"),
	speciality: z.string(),
	skills: z.string(),
	specialitySkills: z
		.string()
		.array()
		.nonempty({ message: "Kindly add at least one skill to your speciality" }),
	personal_statement: z
		.string()
		.refine((value) => value.trim().split(/\s+/).length <= 10, {
			message: "Personal statement should be less than 10 words",
		})
		.refine(
			(value) => {
				// regular expression to match phone numbers
				const phoneRegex =
					/(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
				// exclude strings that contain phone numbers
				return !phoneRegex.test(value);
			},
			{ message: "Cannot contain phone numbers" },
		),
	videoURL: z.optional(z.string()),
	personal: z.string(),
});

export const profileValidationSchema = validationSchema.partial();

export type ProfileInputSchema = z.infer<typeof profileValidationSchema>;
