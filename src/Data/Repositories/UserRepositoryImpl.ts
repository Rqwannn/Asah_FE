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

  async updateMyProfile(data: any): Promise<UserModel> {
    return await this.datasource.updateMe(data);
  }

  async updateMyPrediction(data: any): Promise<UserModel> {
    return await this.datasource.updatePrediction(data);
  }
}
