import { createTRPCRouter, publicProcedure } from "../trpc";

export const jobsRouter = createTRPCRouter({
	getJobs: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.jobs.findMany();
	}),
});
