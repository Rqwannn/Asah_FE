import { UserDTO } from "./../../DTOs/AuthDTO";
import { UserModel } from "../../../Domain/Auth/Models/User";
import { Http } from "../../../Services/Http";

export interface UserDataSource {
  getUsers(): Promise<UserModel[]>;
  updateMe(data: any): Promise<UserModel>;
  updatePrediction(data: any): Promise<UserModel>;
}

export class UserDataSourceImpl implements UserDataSource {
  async getUsers(): Promise<UserModel[]> {
    const res = await Http.get<UserDTO[]>("/users");
    return res.data.map((x) => this.mapToModel(x));
  }

  async updateMe(data: any): Promise<UserModel> {
    const res = await Http.put<{ data: UserDTO }>("/users/me", data);
    return this.mapToModel(res.data.data);
  }

  async updatePrediction(data: any): Promise<UserModel> {
    const res = await Http.put<{ data: UserDTO }>("/users/me/prediction", data);
    return this.mapToModel(res.data.data);
  }

  mapToModel(dto: UserDTO): UserModel {
    return {
      id: dto.id,
      username: dto.username,
      email: dto.email,
      skills: dto.skills,
      discovers: dto.discovers,
      predicted_label: dto.predicted_label,
      lime_visualization: dto.lime_visualization,
      confidence_visualization: dto.confidence_visualization,
    };
  }
}
