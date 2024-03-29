import * as z from "zod";

const validationSchema = z.object({
	website: z.string(),
	country: z.string(),
	speciality: z.string(),
	skills: z.string(),
	specialitySkills: z
		.string()
		.array()
		.nonempty({ message: "Kindly add at least one skill to your speciality" }),
	personal_statement: z
		.string()
		.refine((value) => value.trim().split(/\s+/).length <= 500, {
			message: "Personal statement should be less than 500 words",
		})
		.refine(
			(value) => {
				// regular expression to match email
				const emailRegex = new RegExp(
					/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
					"gm",
				);
				// exclude strings that contain email
				return !emailRegex.test(value);
			},
			{ message: "Cannot contain email in text" },
		)
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
	education: z.string(),
	institution: z.string(),
	education_level: z.string(),
	course: z.string(),
	from_date: z.string(),
	to_date: z.string(),
	company: z.string(),
	job_title: z
		.string()
		.min(5, "Please enter a valid name")
		.max(50, "Please enter a valid name"),
	job_description: z.string(),
	achievements: z.string(),
	experiences_id: z.number(),
	work_experience: z.string(),
	project_title: z.string(),
	project_description: z.string(),
	portfolio: z.string(),
	profile_pic: z.string(),
});

export const profileValidationSchema = validationSchema.partial();

export type ProfileInputSchema = z.infer<typeof profileValidationSchema>;
