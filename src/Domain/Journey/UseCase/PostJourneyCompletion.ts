import { JourneyCompletionRepository } from "../Repository/JourneyCompletionRepository";
import { JourneyCompletionModel } from "../Models/JourneyCompletion";

export class PostJourneyCompletion {
	private repository: JourneyCompletionRepository;

	constructor(repository: JourneyCompletionRepository) {
		this.repository = repository;
	}

	async execute(
		journeyId: number,
		rating: number = 0,
		duration: number = 0
	): Promise<JourneyCompletionModel> {
		return this.repository.postCompletion(journeyId, rating, duration);
	}
}
