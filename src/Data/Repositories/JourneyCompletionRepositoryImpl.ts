import { JourneyCompletionModel } from "../../Domain/Journey/Models/JourneyCompletion";
import { JourneyCompletionRepository } from "../../Domain/Journey/Repository/JourneyCompletionRepository";
import { JourneyCompletionDataSource } from "../DataSources/JourneyCompletionDataSource";

export class JourneyCompletionRepositoryImpl
	implements JourneyCompletionRepository
{
	constructor(private dataSource: JourneyCompletionDataSource) {}

	async getCompletion(
		journeyId: string
	): Promise<JourneyCompletionModel | null> {
		const response = await this.dataSource.getCompletion(journeyId);
		if (response.data.length === 0) {
			return null;
		}
		const dto = response.data[0];
		return new JourneyCompletionModel(
			dto.id,
			dto.user_id,
			dto.journey_id,
			dto.enrolling_times,
			dto.enrollments_at,
			dto.last_enrolled_at,
			dto.study_duration,
			dto.avg_submission_rating,
			dto.createdAt,
			dto.updatedAt
		);
	}
}
