import { UserModel } from "../../Domain/Auth/Models/User";
import { UserRepository } from "../../Domain/Auth/Repositories/UserRepository";
import { UserDataSource } from "../DataSources/User/UserAPIDataSource";

export class UserRepositoryImpl implements UserRepository {
	datasource: UserDataSource;

	constructor(datasource: UserDataSource) {
		this.datasource = datasource;
	}

	async getUsers(): Promise<UserModel[]> {
		return await this.datasource.getUsers();
	}
}
