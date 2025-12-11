export interface JourneyTrackingResponseDTO {
	id: number;
	id_journey: number;
	id_tutorial: number;
	developer_id: string;
	status: string;
}

export interface PostJourneyTrackingResponseDTO {
	id: number;
	journey_id: number;
	tutorial_id: number;
	developer_id: string;
	status: string;
	updatedAt: string;
	createdAt: string;
	last_viewed: string | null;
	first_opened_at: string | null;
	completed_at: string | null;
	developer_journey_status_hash: string | null;
}

export interface GetJourneyTrackingsResponse {
	status: string;
	message: string;
	data: JourneyTrackingResponseDTO[];
	pagination: {
		total: number;
		page: number;
		limit: number;
	};
}

export interface PostJourneyTrackingResponse {
	status: string;
	message: string;
	data: PostJourneyTrackingResponseDTO;
}
