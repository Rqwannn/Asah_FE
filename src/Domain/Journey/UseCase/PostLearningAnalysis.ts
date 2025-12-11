import { LearningAnalysisRepository } from "../Repository/LearningAnalysisRepository";
import { LearningAnalysisRequestDTO } from "../../../Data/DTOs/LearningAnalysisDTO";

export class PostLearningAnalysis {
  private repository: LearningAnalysisRepository;

  constructor(repository: LearningAnalysisRepository) {
    this.repository = repository;
  }

  async execute(payload: LearningAnalysisRequestDTO): Promise<void> {
    try {
      const response = await this.repository.postLearningAnalysis(payload);
      // Save the predicted label to local storage
      if (response.result) {
        if (response.result.predicted_label) {
          localStorage.setItem(
            "learning_analysis_label",
            response.result.predicted_label,
          );
        }
        if (response.result.lime_visualization) {
          localStorage.setItem(
            "lime_visualization",
            response.result.lime_visualization,
          );
        }
        if (response.result.confidence_visualization) {
          localStorage.setItem(
            "confidence_visualization",
            response.result.confidence_visualization,
          );
        }
      }
    } catch (error) {
      console.error("Failed to post learning analysis:", error);
      // Optionally rethrow or handle error silently depending on requirements.
      // Since this is a side-effect of completion, we might not want to block the UI if it fails.
      // However, logging is important.
    }
  }
}
