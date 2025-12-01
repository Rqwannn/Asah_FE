import { TutorialModel } from "../../Domain/Tutorial/Models/Tutorial";
import { TutorialRepository } from "../../Domain/Tutorial/Repository/TutorialRepository";
import { TutorialDataSource } from "../DataSources/TutorialDataSource";

export class TutorialRepositoryImpl implements TutorialRepository {
	constructor(private dataSource: TutorialDataSource) {}

	async getTutorials(journeyId: string): Promise<TutorialModel[]> {
		const response = await this.dataSource.getTutorials(journeyId);
		return response.data.map(
			(dto) =>
				new TutorialModel(
					dto.id,
					dto.developer_journey_id,
					dto.title,
					dto.type,
					dto.content,
					dto.requirements,
					dto.submit_only_requirements,
					dto.position,
					dto.status,
					dto.trial,
					dto.author_id,
					dto.is_main_module,
					dto.createdAt,
					dto.updatedAt
				)
		);
	}
}
