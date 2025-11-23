import { UserDTO } from "./../../DTOs/AuthDTO";
import { UserModel } from "../../../Domain/Auth/Models/User";
import { Http } from "../../../Services/Http";

export interface UserDataSource {
	getUsers(): Promise<UserModel[]>;
}

export class UserDataSourceImpl implements UserDataSource {
	async getUsers(): Promise<UserModel[]> {
		const res = await Http.get<UserDTO[]>("/users");
		return res.data.map((x) => this.mapToModel(x));
	}

	mapToModel(dto: UserDTO): UserModel {
		return {
			id: dto.id,
			username: dto.username,
			email: dto.email,
			skills: dto.skills,
			discovers: dto.discovers,
		};
	}
}
