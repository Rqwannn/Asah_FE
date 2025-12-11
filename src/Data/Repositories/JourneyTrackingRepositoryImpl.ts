import { JourneyTrackingRepository } from "@/Domain/Journey/Repository/JourneyTrackingRepository";
import { JourneyTrackingModel } from "@/Domain/Journey/Models/JourneyTracking";
import { JourneyTrackingDataSource } from "../DataSources/JourneyTrackingDataSource";

export class JourneyTrackingRepositoryImpl
	implements JourneyTrackingRepository
{
	private dataSource: JourneyTrackingDataSource;

	constructor(dataSource: JourneyTrackingDataSource) {
		this.dataSource = dataSource;
	}

	async getTrackings(journeyId: string): Promise<JourneyTrackingModel[]> {
		const response = await this.dataSource.getTrackings(journeyId);
		return response.data.map((item) => ({
			id: item.id,
			journeyId: item.id_journey,
			tutorialId: item.id_tutorial,
			developerId: item.developer_id,
			status: item.status,
		}));
	}

	async postTracking(
		journeyId: number,
		tutorialId: number,
		status: number
	): Promise<JourneyTrackingModel> {
		const response = await this.dataSource.postTracking(
			journeyId,
			tutorialId,
			status
		);
		const data = response.data;
		return {
			id: data.id,
			journeyId: data.journey_id,
			tutorialId: data.tutorial_id,
			developerId: data.developer_id,
			status: data.status,
		};
	}
}
