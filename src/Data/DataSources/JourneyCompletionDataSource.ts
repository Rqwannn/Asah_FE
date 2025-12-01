import { Http } from "@/Services/Http";
import { JourneyCompletionResponse } from "../DTOs/JourneyCompletionDTO";

export class JourneyCompletionDataSource {
	async getCompletion(journeyId: string): Promise<JourneyCompletionResponse> {
		const response = await Http.get<JourneyCompletionResponse>(
			`/journeys/${journeyId}/completions`
		);
		return response.data;
	}
}
