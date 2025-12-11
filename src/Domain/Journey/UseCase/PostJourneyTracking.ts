import { JourneyTrackingRepository } from "../Repository/JourneyTrackingRepository";
import { JourneyTrackingModel } from "../Models/JourneyTracking";

export class PostJourneyTracking {
	private repository: JourneyTrackingRepository;

	constructor(repository: JourneyTrackingRepository) {
		this.repository = repository;
	}

	async execute(
		journeyId: number,
		tutorialId: number,
		status: number
	): Promise<JourneyTrackingModel> {
		return this.repository.postTracking(journeyId, tutorialId, status);
	}
}
