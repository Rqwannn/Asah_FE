import { LearningAnalysisDataSource } from "../DataSources/LearningAnalysisDataSource";
import {
	LearningAnalysisRequestDTO,
	LearningAnalysisResponseDTO,
} from "../DTOs/LearningAnalysisDTO";
import { LearningAnalysisRepository } from "../../Domain/Journey/Repository/LearningAnalysisRepository";

export class LearningAnalysisRepositoryImpl
	implements LearningAnalysisRepository
{
	private dataSource: LearningAnalysisDataSource;

	constructor(dataSource: LearningAnalysisDataSource) {
		this.dataSource = dataSource;
	}

	async postLearningAnalysis(
		payload: LearningAnalysisRequestDTO
	): Promise<LearningAnalysisResponseDTO> {
		return this.dataSource.postLearningAnalysis(payload);
	}
}
