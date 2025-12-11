import {
	LearningAnalysisRequestDTO,
	LearningAnalysisResponseDTO,
} from "../../../Data/DTOs/LearningAnalysisDTO";

export interface LearningAnalysisRepository {
	postLearningAnalysis(
		payload: LearningAnalysisRequestDTO
	): Promise<LearningAnalysisResponseDTO>;
}
