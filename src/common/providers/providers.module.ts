import { Module } from "@nestjs/common";
import { HashProvider } from "./hash/types/hash.provider-props";

import { HashProviderImplementation } from "./hash/hash.provider";

@Module({
	providers: [
		{
			provide: HashProvider,
			useClass: HashProviderImplementation,
		},
	],
	exports: [HashProvider],
})
export class ProvidersModule {}
