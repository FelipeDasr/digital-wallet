import { AuthenticatedUserDataDTO } from "@application/users/dtos/authenticated-user-data.dto";
import { CreateUserDTO } from "@application/users/dtos/create-user.dto";

import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

import { CreateUserUseCase } from "@application/users/use-cases/create-user/create-user.use-case";

import { AuthenticateUserDTO } from "@application/users/dtos/authenticate-user.dto";
import { AuthenticateUserUseCase } from "@application/users/use-cases/authenticate-user/authenticate-user.use-case";
import { IsPublic } from "@common/decorators/is-public.decorator";

@Controller("auth")
@ApiTags("Auth")
@IsPublic()
export class AuthController {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly authenticateUserUseCase: AuthenticateUserUseCase,
	) {}

	@ApiOperation({
		description: "Create a new user",
	})
	@ApiResponse({
		status: HttpStatus.CREATED,
		type: AuthenticatedUserDataDTO,
	})
	@Post("signup")
	public async signup(@Body() data: CreateUserDTO, @Res() res: Response) {
		const response = await this.createUserUseCase.execute(data);
		return res.status(HttpStatus.CREATED).send(response);
	}

	@ApiOperation({
		description: "Authenticate a user",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: AuthenticatedUserDataDTO,
	})
	@Post("signin")
	public async signin(@Body() data: AuthenticateUserDTO, @Res() res: Response) {
		const response = await this.authenticateUserUseCase.execute(data);
		return res.status(HttpStatus.CREATED).send(response);
	}
}
