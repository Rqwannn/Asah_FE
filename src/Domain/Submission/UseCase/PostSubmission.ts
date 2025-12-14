import { SubmissionRepository } from "../Repositories/SubmissionRepository";
import { SubmissionModel } from "../Models/Submission";
import { PostSubmissionRequest } from "@/Data/DTOs/SubmissionDTO";

export class PostSubmission {
  constructor(private repository: SubmissionRepository) {}

  async execute(
    journeyId: number,
    payload: PostSubmissionRequest,
  ): Promise<SubmissionModel> {
    return await this.repository.postSubmission(journeyId, payload);
  }
}
