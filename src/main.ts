import "reflect-metadata";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { env } from "./env";

async function bootstrap() {
	try {
		const app = await NestFactory.create<NestFastifyApplication>(
			AppModule,
			new FastifyAdapter({
				maxParamLength: 3000,
			}),
		);

		const fastifyInstance = app.getHttpAdapter().getInstance();

		// biome-ignore lint/suspicious/noExplicitAny: use fastify
		fastifyInstance.addHook("onRequest", (request: any, reply: any, done) => {
			reply.setHeader = function (key, value) {
				return this.raw.setHeader(key, value);
			};

			reply.end = function () {
				this.raw.end();
			};
			request.res = reply;

			done();
		});

		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
				transform: true,
			}),
		);

		const config = new DocumentBuilder()
			.setTitle("Teste Técnico - Adriano Cobuccio")
			.setDescription("Documentação da API do teste Técnico")
			.setVersion("1.0")
			.addBearerAuth()
			.build();

		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup("/api-docs", app, document);

		app.enableCors({
			origin: "*",
			methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS", "HEAD"],
			credentials: true,
		});

		const host = env.HOST || "0.0.0.0";

		await app.listen(env.PORT, host);
		const serverAddress = `http://${host}:${env.PORT}`;

		console.info(
			`\nServer is running at: ${serverAddress}\n` +
				`Swagger documentation is available at: ${serverAddress}/api-docs\n`,
		);
	} catch (error) {
		console.error(`\nServer ${error.message} \n`);
		process.exit(1);
	}
}

bootstrap();
