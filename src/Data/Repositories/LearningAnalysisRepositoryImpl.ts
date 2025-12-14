import { LearningAnalysisDataSource } from "../DataSources/LearningAnalysisDataSource";
import {
  LearningAnalysisRequestDTO,
  LearningAnalysisResultDTO,
} from "../DTOs/LearningAnalysisDTO";
import { LearningAnalysisRepository } from "../../Domain/Journey/Repository/LearningAnalysisRepository";

export class LearningAnalysisRepositoryImpl implements LearningAnalysisRepository {
  private dataSource: LearningAnalysisDataSource;

  constructor(dataSource: LearningAnalysisDataSource) {
    this.dataSource = dataSource;
  }

  async postLearningAnalysis(
    payload: LearningAnalysisRequestDTO,
  ): Promise<LearningAnalysisResultDTO> {
    return this.dataSource.postLearningAnalysis(payload);
  }
}
