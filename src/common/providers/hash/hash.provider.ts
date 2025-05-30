import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcryptjs";
import { HashProvider } from "./types/hash.provider-props";

@Injectable()
export class HashProviderImplementation implements HashProvider {
	public async hash(password: string): Promise<string> {
		return await hash(password, 12);
	}

	public async compare(
		password: string,
		passwordCompared: string,
	): Promise<boolean> {
		return await compare(password, passwordCompared);
	}
}
