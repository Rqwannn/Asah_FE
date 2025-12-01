export class TutorialModel {
	constructor(
		public readonly id: number,
		public developer_journey_id: number,
		public title: string,
		public type: string,
		public content: string,
		public requirements: string[],
		public submit_only_requirements: boolean,
		public position: number,
		public status: string,
		public trial: boolean,
		public author_id: number,
		public is_main_module: boolean,
		public createdAt: string,
		public updatedAt: string
	) {}
}
