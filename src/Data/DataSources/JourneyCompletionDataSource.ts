import { Http } from "@/Services/Http";
import {
  JourneyCompletionResponse,
  PostJourneyCompletionResponse,
} from "../DTOs/JourneyCompletionDTO";

export class JourneyCompletionDataSource {
  async getCompletion(journeyId: string): Promise<JourneyCompletionResponse> {
    const response = await Http.get<JourneyCompletionResponse>(
      `/journeys/${journeyId}/completions`,
    );
    return response.data;
  }

  async getUserCompletions(): Promise<JourneyCompletionResponse> {
    const response = await Http.get<JourneyCompletionResponse>(
      `/journeys/completions`,
    );
    return response.data;
  }

  async postCompletion(
    journeyId: number,
    rating: number,
    duration: number,
  ): Promise<PostJourneyCompletionResponse> {
    const response = await Http.post<PostJourneyCompletionResponse>(
      `/journeys/${journeyId}/completions`,
      {
        avg_submission_rating: rating,
        study_duration: duration,
      },
    );
    return response.data;
  }
}
