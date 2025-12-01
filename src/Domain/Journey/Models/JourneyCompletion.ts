export class JourneyCompletionModel {
	constructor(
		public readonly id: number,
		public user_id: string,
		public journey_id: number,
		public enrolling_times: number,
		public enrollments_at: string[],
		public last_enrolled_at: string | null,
		public study_duration: number,
		public avg_submission_rating: number,
		public createdAt: string,
		public updatedAt: string
	) {}
}
