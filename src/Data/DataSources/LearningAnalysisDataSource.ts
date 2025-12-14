import axios from "axios";
import {
  LearningAnalysisRequestDTO,
  LearningAnalysisResultDTO,
} from "../DTOs/LearningAnalysisDTO";

export class LearningAnalysisDataSource {
  private readonly baseUrl = "http://0.0.0.0:8020/api";

  async postLearningAnalysis(
    payload: LearningAnalysisRequestDTO,
  ): Promise<LearningAnalysisResultDTO> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/learning_analysis`,
        payload,
      );

      // Response from Backend Wrapper (Standard)
      // { status: "success", data: [ { DATA: { result: ... } } ] }
      if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        const aiResponseArray = response.data.data;
        if (
          aiResponseArray.length > 0 &&
          aiResponseArray[0].DATA &&
          aiResponseArray[0].DATA.result
        ) {
          return aiResponseArray[0].DATA.result;
        }
      }

      // Fallback: Direct AI Response (if backend proxy is raw)
      // [ { DATA: { result: ... } } ]
      if (Array.isArray(response.data) && response.data.length > 0) {
        const firstItem = response.data[0];
        if (firstItem.DATA && firstItem.DATA.result) {
          return firstItem.DATA.result;
        }
      }

      // Fallback generic
      return response.data;
    } catch (error) {
      console.error("Error posting learning analysis:", error);
      throw error;
    }
  }
}
