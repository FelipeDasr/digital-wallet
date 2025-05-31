import { WalletsRepository } from "@application/wallets/repositories/wallets.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindUserWalletUseCase {
	constructor(private readonly walletsRepository: WalletsRepository) {}

	public async execute(userId: string) {
		return await this.walletsRepository.findByUserId(userId);
	}
}
