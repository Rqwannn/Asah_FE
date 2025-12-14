import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetAllSubmissionsFactory,
  usePutSubmissionFactory,
} from "@/App/Factories/useSubmissionFactory";
import { SubmissionDTO, PutSubmissionRequest } from "@/Data/DTOs/SubmissionDTO";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "../../../../components/ui/badge";
import { ExternalLink, SquarePen } from "lucide-react";

const AllSubmissionsPage = () => {
  const { data: submissionsResponse, isLoading } =
    useGetAllSubmissionsFactory();
  const { mutate: updateSubmission, isPending: isUpdating } =
    usePutSubmissionFactory();
  const { toast } = useToast();

  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionDTO | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form State
  const [status, setStatus] = useState<"passed" | "failed">("passed");
  const [rating, setRating] = useState<number>(5);
  const [note, setNote] = useState("");
  const [adminComment, setAdminComment] = useState("");

  const handleReviewClick = (submission: SubmissionDTO) => {
    setSelectedSubmission(submission);
    setStatus(
      submission.status === "submitted"
        ? "passed"
        : (submission.status as "passed" | "failed"),
    );
    setRating(submission.rating || 5);
    setNote(submission.note || "");
    setAdminComment(submission.admin_comment || "");
    setIsDialogOpen(true);
  };

  const handleSubmitReview = () => {
    if (!selectedSubmission) return;

    if (!note.trim()) {
      toast("Note is required.", "error");
      return;
    }

    const payload: PutSubmissionRequest = {
      status,
      rating,
      note,
      admin_comment: adminComment,
    };

    updateSubmission(
      {
        journeyId: selectedSubmission.journey_id,
        submissionId: selectedSubmission.id,
        payload,
      },
      {
        onSuccess: () => {
          toast("Review submitted successfully.", "success");
          setIsDialogOpen(false);
          setSelectedSubmission(null);
        },
        onError: () => {
          toast("Failed to submit review.", "error");
        },
      },
    );
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading submissions...</div>;
  }

  const submissions = submissionsResponse?.data?.data || [];

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-2xl font-bold">All Submissions</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task / Quiz</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>App Link</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">
                  {/* Assuming quizTutorial is available via include in backend or we might need DTO update to type it properly */}
                  {(submission as any).quizTutorial?.title ||
                    `Journey ${submission.journey_id}`}
                </TableCell>
                <TableCell>{submission.submitter_id}</TableCell>
                <TableCell>
                  <a
                    href={submission.app_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    View App <ExternalLink className="h-3 w-3" />
                  </a>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      submission.status === "passed"
                        ? "default"
                        : submission.status === "failed"
                          ? "destructive"
                          : "secondary"
                    }
                    className={
                      submission.status === "passed"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : ""
                    }
                  >
                    {submission.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(submission.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReviewClick(submission)}
                  >
                    <SquarePen className="mr-2 h-4 w-4" />
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {submissions.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No submissions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Review Submission</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(val: string) =>
                  setStatus(val as "passed" | "failed")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passed">Passed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="note">Message to Student</Label>
              <Textarea
                id="note"
                placeholder="Great job! ..."
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="adminComment">Admin Comment (Internal)</Label>
              <Textarea
                id="adminComment"
                placeholder="Verified..."
                rows={2}
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={isUpdating} onClick={handleSubmitReview}>
              {isUpdating ? "Saving..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllSubmissionsPage;
