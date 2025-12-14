import { JourneyCompletionModel } from "../Models/JourneyCompletion";

export interface JourneyCompletionRepository {
  getCompletion(journeyId: string): Promise<JourneyCompletionModel | null>;
  getUserCompletions(): Promise<JourneyCompletionModel[]>;
  postCompletion(
    journeyId: number,
    rating: number,
    duration: number,
  ): Promise<JourneyCompletionModel>;
  putCompletion(
    journeyId: number,
    payload: {
      enrollments_at?: string;
      last_enrolled_at: string;
      study_duration?: number;
    },
  ): Promise<JourneyCompletionModel>;
}
