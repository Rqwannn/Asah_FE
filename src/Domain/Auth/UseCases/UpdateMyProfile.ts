import { UserModel } from "../Models/User";
import { UserRepository } from "../Repositories/UserRepository";

export class UpdateMyProfile {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(data: any): Promise<UserModel> {
    return await this.repository.updateMyProfile(data);
  }
}
