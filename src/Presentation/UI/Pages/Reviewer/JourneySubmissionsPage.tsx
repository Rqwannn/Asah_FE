import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSubmissionsFactory,
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
  DialogTrigger,
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

const JourneySubmissionsPage = () => {
  const { id } = useParams<{ id: string }>();
  const journeyId = Number(id);
  const { data: submissionsResponse, isLoading } =
    useGetSubmissionsFactory(journeyId);
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
        journeyId,
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
      <h1 className="mb-6 text-2xl font-bold">Journey Submissions</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>App Link</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
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
                <TableCell
                  className="max-w-[200px] truncate"
                  title={submission.app_comment}
                >
                  {submission.app_comment}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      submission.status === "passed"
                        ? "default" // Map to success color if customized, or default
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
                <TableCell>{submission.rating || "-"}</TableCell>
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
                <TableCell colSpan={7} className="h-24 text-center">
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

export default JourneySubmissionsPage;
