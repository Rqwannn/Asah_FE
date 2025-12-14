import { SubmissionModel } from "../Models/Submission";
import {
  PostSubmissionRequest,
  PutSubmissionRequest,
  GetSubmissionsResponse,
} from "@/Data/DTOs/SubmissionDTO";

export interface SubmissionRepository {
  postSubmission(
    journeyId: number,
    payload: PostSubmissionRequest,
  ): Promise<SubmissionModel>;
  getSubmissions(
    journeyId: number,
    params?: any,
  ): Promise<GetSubmissionsResponse>;
  getAllSubmissions(params?: any): Promise<GetSubmissionsResponse>;
  updateSubmission(
    journeyId: number,
    submissionId: number,
    payload: PutSubmissionRequest,
  ): Promise<SubmissionModel>;
}
