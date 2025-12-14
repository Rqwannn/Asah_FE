import { SubmissionRepository } from "../Repositories/SubmissionRepository";
import { GetSubmissionsResponse } from "@/Data/DTOs/SubmissionDTO";

export class GetSubmissions {
  constructor(private repository: SubmissionRepository) {}

  async execute(
    journeyId: number,
    params?: any,
  ): Promise<GetSubmissionsResponse> {
    return await this.repository.getSubmissions(journeyId, params);
  }
}
