import axios from "axios";
import {
	LearningAnalysisRequestDTO,
	LearningAnalysisResponseDTO,
} from "../DTOs/LearningAnalysisDTO";

export class LearningAnalysisDataSource {
	private readonly baseUrl = "http://0.0.0.0:8020/api";

	async postLearningAnalysis(
		payload: LearningAnalysisRequestDTO
	): Promise<LearningAnalysisResponseDTO> {
		try {
			const response = await axios.post(
				`${this.baseUrl}/learning_analysis`,
				payload
			);
			// The API returns an array like [{...}, 201], we are interested in the first element's DATA
			// Adjusting based on the user provided example response:
			// [ { STATUS: "CREAD_ACTION", CODE: 201, DATA: { status: 201, message: "...", result: {...} } }, 201 ]

			if (Array.isArray(response.data) && response.data.length > 0) {
				const firstItem = response.data[0];
				if (firstItem.DATA) {
					return firstItem.DATA;
				}
			}

			// Fallback if structure is different but still valid axios response
			return response.data;
		} catch (error) {
			console.error("Error posting learning analysis:", error);
			throw error;
		}
	}
}
