import { JourneyTrackingModel } from "../Models/JourneyTracking";

export interface JourneyTrackingRepository {
	getTrackings(journeyId: string): Promise<JourneyTrackingModel[]>;
	postTracking(
		journeyId: number,
		tutorialId: number,
		status: number
	): Promise<JourneyTrackingModel>;
}
