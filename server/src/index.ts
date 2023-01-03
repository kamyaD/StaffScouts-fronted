import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import morgan from "morgan";

const prisma = new PrismaClient();
const app = express();

// @ts-ignore
BigInt.prototype["toJSON"] = function () {
	return parseInt(this.toString());
};

app.use(express.json());
app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
	}),
);
app.use(morgan("dev"));

app.get("/users", async (req, res) => {
	const users = await prisma.users.findMany();
	res.json(users);
});

app.get("/candidates", async (req, res) => {
	const candidates = await prisma.profiles.findMany();
	res.json(candidates);
});

app.get("/jobs", async (req, res) => {
	const jobs = await prisma.jobs.findMany({
		orderBy: {
			created_at: "desc",
		},
		select: {
			jobs_title: true,
			jobs_description: true,
			country: true,
			offered_salary: true,
			contract_type_id: true,
			city: true,
			application_deadline: true,
			created_at: true,
		},
	});
	res.json(jobs);
});

app.listen(8081, () =>
	console.log(`
🚀 Server ready at: http://localhost:8081`),
);
