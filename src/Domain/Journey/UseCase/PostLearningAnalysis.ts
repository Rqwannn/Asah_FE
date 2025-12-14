import { LearningAnalysisRepository } from "../Repository/LearningAnalysisRepository";
import { LearningAnalysisRequestDTO } from "../../../Data/DTOs/LearningAnalysisDTO";

export class PostLearningAnalysis {
  private repository: LearningAnalysisRepository;

  constructor(repository: LearningAnalysisRepository) {
    this.repository = repository;
  }

  async execute(payload: LearningAnalysisRequestDTO): Promise<any> {
    try {
      const response = await this.repository.postLearningAnalysis(payload);

      // The repository (via DataSource) now returns the Result object directly.
      // So 'response' IS the prediction data.

      // Save directly to local storage (legacy support / immediate availability)
      if (response) {
        if (response.predicted_label) {
          localStorage.setItem(
            "learning_analysis_label",
            response.predicted_label,
          );
        }
        if (response.lime_visualization) {
          localStorage.setItem(
            "lime_visualization",
            response.lime_visualization,
          );
        }
        if (response.confidence_visualization) {
          localStorage.setItem(
            "confidence_visualization",
            response.confidence_visualization,
          );
        }
      }

      return response;
    } catch (error) {
      console.error("Failed to post learning analysis:", error);
      throw error;
    }
  }
}
