import {
  LearningAnalysisRequestDTO,
  LearningAnalysisResultDTO,
} from "../../../Data/DTOs/LearningAnalysisDTO";

export interface LearningAnalysisRepository {
  postLearningAnalysis(
    payload: LearningAnalysisRequestDTO,
  ): Promise<LearningAnalysisResultDTO>;
}
