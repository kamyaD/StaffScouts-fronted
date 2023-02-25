import type { IProfileResponse, IUserResponse } from "@/lib/types";
import { create } from "zustand";

export type Severity = "success" | "error";

export interface SnackMessage {
	message: string;
	severity?: Severity;
}

type Store = {
	authUser: IUserResponse | null;
	requestLoading: boolean;
	setAuthUser: (user: IUserResponse | null) => void;
	setRequestLoading: (isLoading: boolean) => void;
	snack: SnackMessage;
	displaySnackMessage: (snack: SnackMessage) => void;
	resetSnack: () => void;
	setUploadingImage: (isUploading: boolean) => void;
	uploadingImage: boolean;
	profile: Partial<IProfileResponse> | null;
	setProfile: (profile: Partial<IProfileResponse> | null) => void;
};

const useStore = create<Store>((set) => ({
	authUser: null,
	requestLoading: false,
	setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
	setRequestLoading: (isLoading) =>
		set((state) => ({ ...state, requestLoading: isLoading })),
	snack: {
		message: "",
		severity: "success",
	},
	displaySnackMessage: (snack: SnackMessage) =>
		set((state) => ({
			...state,
			snack,
		})),
	resetSnack: () =>
		set((state) => ({ ...state, snack: { message: "", severity: "success" } })),
	uploadingImage: false,
	setUploadingImage: (isUploading) =>
		set((state) => ({ ...state, uploadingImage: isUploading })),
	profile: null,
	setProfile: (profile) => set((state) => ({ ...state, profile })),
}));

export default useStore;
