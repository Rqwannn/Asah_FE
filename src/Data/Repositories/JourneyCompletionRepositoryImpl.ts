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

	async postCompletion(
		journeyId: number,
		rating: number,
		duration: number
	): Promise<JourneyCompletionModel> {
		const response = await this.dataSource.postCompletion(
			journeyId,
			rating,
			duration
		);
		const data = response.data;
		return {
			id: data.id,
			user_id: data.user_id,
			journey_id: data.journey_id,
			avg_submission_rating: data.avg_submission_rating,
			study_duration: data.study_duration,
			enrolling_times: data.enrolling_times,
			createdAt: data.createdAt,
			updatedAt: data.updatedAt,
			enrollments_at: data.enrollments_at || [],
			last_enrolled_at: data.last_enrolled_at,
		};
	}
}
