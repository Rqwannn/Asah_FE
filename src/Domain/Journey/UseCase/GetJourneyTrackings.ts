import { JourneyTrackingRepository } from "../Repository/JourneyTrackingRepository";
import { JourneyTrackingModel } from "../Models/JourneyTracking";

export class GetJourneyTrackings {
	private repository: JourneyTrackingRepository;

	constructor(repository: JourneyTrackingRepository) {
		this.repository = repository;
	}

	async execute(journeyId: string): Promise<JourneyTrackingModel[]> {
		return this.repository.getTrackings(journeyId);
	}
}
