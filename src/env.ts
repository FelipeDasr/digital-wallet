import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
	HOST: z.string().optional(),
	PORT: z.string().default("5000"),
	DATABASE_URL: z.string().url(),
	POSTGRES_USER: z.string(),
	POSTGRES_PASSWORD: z.string(),
	POSTGRES_DB: z.string(),
	JWT_SECRET: z.string().min(1, { message: "JWT_SECRET must be defined" }),
	JWT_REFRESH_SECRET: z.string().min(1, {
		message: "JWT_REFRESH_SECRET must be defined",
	}),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
	console.error(
		"Environment variables",
		JSON.stringify(parsedEnv.error.flatten().fieldErrors),
	);

	process.exit(1);
}

export const env = parsedEnv.data;
