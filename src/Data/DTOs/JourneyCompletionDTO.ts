export interface JourneyCompletionDTO {
	id: number;
	user_id: string;
	journey_id: number;
	enrolling_times: number;
	enrollments_at: string[];
	last_enrolled_at: string | null;
	study_duration: number;
	avg_submission_rating: number;
	createdAt: string;
	updatedAt: string;
}

export interface JourneyCompletionResponse {
	status: string;
	data: JourneyCompletionDTO[];
}
