import { typeORMDataSource } from "@infra/database/typeorm/typeorm.service";
import { DataSource } from "typeorm";

const getDataSource = () => {
	const options = {
		...typeORMDataSource,
		migrations: ["src/infra/database/typeorm/migrations/*.ts"],
	};

	return new DataSource(options);
};

export default getDataSource();
