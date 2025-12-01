import { JourneyCompletionModel } from "../Models/JourneyCompletion";
import { JourneyCompletionRepository } from "../Repository/JourneyCompletionRepository";

export class GetJourneyCompletion {
	constructor(private repository: JourneyCompletionRepository) {}

	async execute(journeyId: string): Promise<JourneyCompletionModel | null> {
		return this.repository.getCompletion(journeyId);
	}
}
