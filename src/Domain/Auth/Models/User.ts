export class UserModel {
	constructor(
		public readonly id: string,
		public username: string,
		public email: string,
		public skills: string[] = [],
		public discovers: string[] = []
	) {}
}
