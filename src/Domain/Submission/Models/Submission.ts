export class SubmissionModel {
  constructor(
    public readonly id: number,
    public journey_id: number,
    public quiz_id: number,
    public submitter_id: string,
    public app_link: string,
    public app_comment: string,
    public status: "submitted" | "passed" | "failed",
    public created_at: string,
    public updated_at: string,
    public admin_comment: string | null,
    public reviewer_id: string | null,
    public rating: number | null,
    public note: string | null,
  ) {}
}
