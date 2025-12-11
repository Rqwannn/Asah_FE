export interface JourneyTrackingModel {
	id: number;
	journeyId: number;
	tutorialId: number;
	developerId: string;
	status: string | number | boolean;
}
