import { SubmissionDataSource } from "@/Data/DataSources/SubmissionDataSource";
import { SubmissionRepository } from "@/Domain/Submission/Repositories/SubmissionRepository";
import { SubmissionModel } from "@/Domain/Submission/Models/Submission";
import {
  PostSubmissionRequest,
  PutSubmissionRequest,
  GetSubmissionsResponse,
} from "@/Data/DTOs/SubmissionDTO";

export class SubmissionRepositoryImpl implements SubmissionRepository {
  constructor(private dataSource: SubmissionDataSource) {}

  async postSubmission(
    journeyId: number,
    payload: PostSubmissionRequest,
  ): Promise<SubmissionModel> {
    return await this.dataSource.postSubmission(journeyId, payload);
  }

  async getSubmissions(
    journeyId: number,
    params?: any,
  ): Promise<GetSubmissionsResponse> {
    return await this.dataSource.getSubmissions(journeyId, params);
  }

  async getAllSubmissions(params?: any): Promise<GetSubmissionsResponse> {
    return await this.dataSource.getAllSubmissions(params);
  }

  async updateSubmission(
    journeyId: number,
    submissionId: number,
    payload: PutSubmissionRequest,
  ): Promise<SubmissionModel> {
    return await this.dataSource.updateSubmission(
      journeyId,
      submissionId,
      payload,
    );
  }
}
