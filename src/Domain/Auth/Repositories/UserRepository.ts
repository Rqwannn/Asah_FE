import { UserModel } from "../Models/User";

export interface UserRepository {
  getUsers(): Promise<UserModel[]>;
  updateMyProfile(data: any): Promise<UserModel>;
  updateMyPrediction(data: any): Promise<UserModel>;
}
