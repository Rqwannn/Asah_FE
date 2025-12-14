import { SubmissionRepository } from "../Repositories/SubmissionRepository";
import { SubmissionModel } from "../Models/Submission";
import { PutSubmissionRequest } from "@/Data/DTOs/SubmissionDTO";

export class PutSubmission {
  constructor(private repository: SubmissionRepository) {}

  async execute(
    journeyId: number,
    submissionId: number,
    payload: PutSubmissionRequest,
  ): Promise<SubmissionModel> {
    return await this.repository.updateSubmission(
      journeyId,
      submissionId,
      payload,
    );
  }
}
