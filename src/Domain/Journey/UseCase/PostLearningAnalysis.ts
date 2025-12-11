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
			if (response.result && response.result.predicted_label) {
				localStorage.setItem(
					"learning_analysis_label",
					response.result.predicted_label
				);
			}
		} catch (error) {
			console.error("Failed to post learning analysis:", error);
			// Optionally rethrow or handle error silently depending on requirements.
			// Since this is a side-effect of completion, we might not want to block the UI if it fails.
			// However, logging is important.
		}
	}
}
