import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard("jwt") {
	constructor(private readonly _: Reflector) {
		super();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		return (await super.canActivate(context)) as boolean;
	}
}
