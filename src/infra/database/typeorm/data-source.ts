import { DataSource } from "typeorm";
import { typeORMDataSource } from "./typeorm.service";

export default new DataSource(typeORMDataSource);
