import { Http } from "@/Services/Http";
import {
	GetJourneyTrackingsResponse,
	PostJourneyTrackingResponse,
} from "../DTOs/JourneyTrackingDTO";

export class JourneyTrackingDataSource {
	async getTrackings(journeyId: string): Promise<GetJourneyTrackingsResponse> {
		const response = await Http.get<GetJourneyTrackingsResponse>(
			`/journeys/${journeyId}/tutorials/trackings`
		);
		return response.data;
	}

	async postTracking(
		journeyId: number,
		tutorialId: number,
		status: number
	): Promise<PostJourneyTrackingResponse> {
		const response = await Http.post<PostJourneyTrackingResponse>(
			`/journeys/tutorials/trackings`,
			{
				journey_id: journeyId,
				tutorial_id: tutorialId,
				status,
			}
		);
		return response.data;
	}
}
