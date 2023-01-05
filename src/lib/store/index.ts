import type { IUser } from "@/lib/types";
import create from "zustand";

export type Severity = "success" | "error";

export interface SnackMessage {
	message: string;
	severity?: Severity;
}

type Store = {
	authUser: IUser | null;
	requestLoading: boolean;
	setAuthUser: (user: IUser | null) => void;
	setRequestLoading: (isLoading: boolean) => void;
	snack: SnackMessage;
	displaySnackMessage: (snack: SnackMessage) => void;
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
}));

export default useStore;
