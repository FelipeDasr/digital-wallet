import { ReallocateWalletBalancesDTO } from "@application/wallets/dtos/reallocate-wallet-balances.dto";
import { DatabaseTransactionManager } from "@infra/database/types/transactions.props";
import { WalletsRepositoryMock } from "@test/mocks/repositories/wallets.repository.mock";
import { ReallocateWalletBalancesUseCase } from "./reallocate-wallet-balances.use-case";

describe("ReallocateWalletBalancesUseCase", () => {
	const walletsRepository = new WalletsRepositoryMock();
	const useCase = new ReallocateWalletBalancesUseCase(walletsRepository);
	const mockTransaction = {} as DatabaseTransactionManager;

	beforeAll(() => {
		jest.spyOn(walletsRepository, "incrementBalanceById").mockResolvedValue();
	});

	it("should call incrementBalanceById for both source and destination wallets", async () => {
		const dto: ReallocateWalletBalancesDTO = {
			sourceWalletId: "source-id",
			destinationWalletId: "dest-id",
			amount: 50,
			dbTransaction: mockTransaction,
		};

		await useCase.execute(dto);

		expect(walletsRepository.incrementBalanceById).toHaveBeenCalledWith(
			"source-id",
			-50,
			mockTransaction,
		);
		expect(walletsRepository.incrementBalanceById).toHaveBeenCalledWith(
			"dest-id",
			50,
			mockTransaction,
		);
		expect(walletsRepository.incrementBalanceById).toHaveBeenCalledTimes(2);
	});
});
