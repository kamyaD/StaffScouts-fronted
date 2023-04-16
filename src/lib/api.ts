import type { ProfileInputSchema } from "@/utils/profileValidationSchema";
import type { RegisterInputSchema } from "@/views/Register/components/Form/Form";
import axios from "axios";

import type { CreateProfileTitleInputSchema } from "../pages/create-profile/title";
import type { ICandidateProfile, IJobs, Job, Specialism } from "../types";
import type {
	GenericResponse,
	IJobInterestedResponse,
	JobInterestedDTO,
} from "./types";

const BASE_URL = "/";

export const apiClient = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

apiClient.defaults.headers.common["Content-Type"] = "application/json";

export const signUpUserFn = async (user: RegisterInputSchema) => {
	const response = await apiClient.post<GenericResponse>("/api/register", user);
	return response.data;
};

// export const loginUserFn = async (user: LoginInput) => {
//   const response = await authApi.post<ILoginResponse>('auth/login', user);
//   return response.data;
// };
//
// export const verifyEmailFn = async (verificationCode: string) => {
//   const response = await authApi.get<GenericResponse>(
//     `auth/verifyemail/${verificationCode}`
//   );
//   return response.data;
// };
//
// export const logoutUserFn = async () => {
//   const response = await authApi.get<GenericResponse>('auth/logout');
//   return response.data;
// };
//
export const getMeFn = async (): Promise<ICandidateProfile> => {
	const response = await apiClient.get<ICandidateProfile>(`/api/me`);
	return response.data;
};

export const createProfileFn = async (
	profile: CreateProfileTitleInputSchema,
): Promise<ICandidateProfile> => {
	console.log(
		"Class: , Function: createProfileFn, Line 62 profile():",
		profile,
	);
	const response = await apiClient.post<ICandidateProfile>(
		`/api/profile`,
		profile,
	);
	return response.data;
};

export const updateProfileFn = async (
	profile: ProfileInputSchema,
): Promise<ICandidateProfile> => {
	console.log(
		"Class: , Function: updateProfileFn, Line 69 profile():",
		profile,
	);
	const response = await apiClient.put<ICandidateProfile>(
		`/api/profile`,
		profile,
	);
	return response.data;
};

export const createCandidateJobInterestedFn = async (
	job: JobInterestedDTO,
): Promise<IJobInterestedResponse> => {
	const response = await apiClient.post<IJobInterestedResponse>(
		`/api/mutate/?url=candidate/create-create-job-interested`,
		job,
	);
	return response.data;
};

export const getJobsFn = async (): Promise<IJobs> => {
	const response = await apiClient.get<IJobs>(`${process.env.API_URL}/jobs`);
	return response.data;
};

export const getSpecialityFn = async (): Promise<Array<Specialism>> => {
	const response = await apiClient.get<Array<Specialism>>(
		`${process.env.API_URL}/jobs/list-specialism/`,
	);
	return response.data;
};

export const getUserProfileFn = async (): Promise<Array<Specialism>> => {
	const response = await apiClient.get<Array<Specialism>>(
		`${process.env.API_URL}/jobs/list-specialism/`,
	);
	return response.data;
};

export const getJobsByIdFn = async (id: string | number): Promise<Job> => {
	const response = await apiClient.get<Job>(
		`${process.env.API_URL}/jobs/${id}`,
	);
	return response.data;
};

// export const getJobsInterestedFn = async (): Promise<any> => {
// 	const response = await apiClient.get<any>(`/api/data/query?id=candidate/list-jobs-interested`);
// 	return response.data;
// };

export const getContractTypesFn = async (): Promise<IJobs> => {
	const response = await apiClient.get<IJobs>(
		`${process.env.API_URL}/jobs/list-contract-types/`,
	);
	return response.data;
};

// export const forgotPasswordFn = async (email: string) => {
//   const response = await authApi.post<GenericResponse>('auth/forgotpassword',{email});
//   return response.data;
// };
//
// export const resetPasswordFn = async (data: ResetPasswordInput, resetCode: string) => {
//   const response = await authApi.patch<GenericResponse>(`auth/resetpassword/${resetCode}`, data);
//   return response.data;
// };
