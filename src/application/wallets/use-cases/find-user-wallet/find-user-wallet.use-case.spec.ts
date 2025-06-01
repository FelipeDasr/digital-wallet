import { WalletEntity } from "@application/wallets/entities/wallet.entity";
import { WalletsRepositoryMock } from "@test/mocks/repositories/wallets.repository.mock";
import { FindUserWalletUseCase } from "./find-user-wallet.use-case";

describe("FindUserWalletUseCase", () => {
	const walletsRepository = new WalletsRepositoryMock();
	const useCase = new FindUserWalletUseCase(walletsRepository);

	const userId = "user-id";
	const wallet = {
		id: "user-1",
		balance: 100,
		user_id: "user-1",
	} as WalletEntity;

	it("should call findByUserId with the correct userId", async () => {
		jest.spyOn(walletsRepository, "findByUserId").mockResolvedValueOnce(wallet);

		const resukt = await useCase.execute(userId);

		expect(walletsRepository.findByUserId).toHaveBeenCalledWith(userId);
		expect(resukt).toEqual(wallet);
	});
});
