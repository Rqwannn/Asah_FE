import { JourneyCompletionModel } from "../Models/JourneyCompletion";

export interface JourneyCompletionRepository {
  getCompletion(journeyId: string): Promise<JourneyCompletionModel | null>;
  getUserCompletions(): Promise<JourneyCompletionModel[]>;
  postCompletion(
    journeyId: number,
    rating: number,
    duration: number,
  ): Promise<JourneyCompletionModel>;
}
