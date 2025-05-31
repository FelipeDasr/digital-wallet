import { typeORMDataSource } from "@infra/database/typeorm/typeorm.service";
import { DataSource } from "typeorm";

export default new DataSource(typeORMDataSource);
