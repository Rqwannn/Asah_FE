import { Http } from "@/Services/Http";
import { TutorialResponse } from "../DTOs/TutorialDTO";

export class TutorialDataSource {
	async getTutorials(journeyId: string): Promise<TutorialResponse> {
		const response = await Http.get<TutorialResponse>(
			`/journeys/${journeyId}/tutorials`
		);
		return response.data;
	}
}
