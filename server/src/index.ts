import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

// @ts-ignore
BigInt.prototype["toJSON"] = function () {
	return parseInt(this.toString());
};

app.use(express.json());

// function toJson(data: any[] | undefined) {
// 	if (data !== undefined) {
// 		let intCount = 0,
// 			repCount = 0;
// 		const json = JSON.stringify(data, (_, v) => {
// 			if (typeof v === "bigint") {
// 				intCount++;
// 				return `${v}#bigint`;
// 			}
// 			return v;
// 		});
// 		const res = json.replace(/"(-?\d+)#bigint"/g, (_, a) => {
// 			repCount++;
// 			return a;
// 		});
// 		if (repCount > intCount) {
// 			// You have a string somewhere that looks like "123#bigint";
// 			throw new Error(`BigInt serialization conflict with a string value.`);
// 		}
// 		return res;
// 	}
// }

app.get("/users", async (req, res) => {
	const users = await prisma.users.findMany();
	res.json(users);
});

const server = app.listen(8081, () =>
	console.log(`
🚀 Server ready at: http://localhost:8081`),
);
