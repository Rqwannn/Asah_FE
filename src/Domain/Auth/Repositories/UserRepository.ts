import { UserModel } from "../Models/User";

export interface UserRepository {
	getUsers(): Promise<UserModel[]>;
}
