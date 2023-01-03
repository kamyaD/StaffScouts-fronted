import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	esbuild: {
		minifySyntax: true,
	},
	server: {
		port: 3000,
	},
});
