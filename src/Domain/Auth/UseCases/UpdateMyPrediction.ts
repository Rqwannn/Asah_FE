import { UserRepository } from "../../Repositories/UserRepository";
import { UserModel } from "../../Models/User";

export class UpdateMyPrediction {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(data: any): Promise<UserModel> {
    return await this.repository.updateMyPrediction(data);
  }
}
