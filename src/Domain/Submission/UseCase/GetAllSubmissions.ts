import { SubmissionRepository } from "../Repositories/SubmissionRepository";
import { GetSubmissionsResponse } from "@/Data/DTOs/SubmissionDTO";

export class GetAllSubmissions {
  constructor(private repository: SubmissionRepository) {}

  async execute(params?: any): Promise<GetSubmissionsResponse> {
    return await this.repository.getAllSubmissions(params);
  }
}
