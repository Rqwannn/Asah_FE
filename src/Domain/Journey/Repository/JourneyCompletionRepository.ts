import { JourneyCompletionModel } from "../Models/JourneyCompletion";

export interface JourneyCompletionRepository {
	getCompletion(journeyId: string): Promise<JourneyCompletionModel | null>;
}
