import { UserModel } from "./User";

export class AuthSessionModel {
	constructor(public readonly token: string, public readonly user: UserModel) {}
}
