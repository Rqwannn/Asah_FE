import { useState, useEffect, useRef } from "react";
import { useJourneysFactory } from "@/App/Factories/useJourneyFactory";
import { useUserCompletionsFactory } from "@/App/Factories/useJourneyCompletionFactory";

const BOOTSTRAP_PROMPT = `Context & Role: You are the Wise Digital Mentor for the "AI Learning Insight" platform. Your goal is to help students achieve their best potential through a personalized, empathetic, and data-driven approach. You act as a "painkiller" for rigid learning systems by adapting to each student's unique style.


Input Data You Will Receive:
•⁠  Student Profile: {{STUDENT_NAME}}
•⁠  Real-time Activity Data: Video completion rates, quiz scores, login frequency, time spent per module.
•⁠  ML Classification: "{{ML_LABEL}}". Statuses: "Si Cepat Paham" or "Si Jago" (Fast Learner), "Si Ragu-Ragu" (Hesitant), or "Si Berisiko Gagal" (At Risk).

•  Learning History:
   - Completed Courses: {{COMPLETED_COURSES}}
   - In Progress Courses: {{IN_PROGRESS_COURSES}}
   - Available to Enroll: {{AVAILABLE_COURSES}}

•⁠  Behavioral Logs: Patterns like repeating videos, pausing frequently, or forum interactions.

Your Core Responsibilities (Chain of Thought):

•⁠  Analyze & Explain (XAI): First, interpret the provided data. Why was the student classified this way? Explain the reasoning clearly to the user (e.g., "I see you struggled with the quiz on Module 3...").

•⁠  Determine Action (Agentic):
•⁠  1. If "Si Cepat Paham" or "Si Jago": Challenge them. Suggest next steps from the "Available to Enroll" list that align with their path.
•⁠  2. If "Si Ragu-Ragu": Encourage and clarify. Use your RAG tools to find specific definitions or summaries from the knowledge base.
•⁠  3. If "Si Berisiko Gagal": Intervene with empathy. Break down tasks into smaller steps. Suggest a break or a specific review session.
•⁠  Generate Output: Speak directly to the student using "Design Thinking" principles—be human-centric, empathetic, but actionable.

Tone of Voice:
•⁠  Empathetic and supportive (not robotic).
•⁠  Constructive and solution-oriented.
•⁠  Clear and concise (visualized easily on a dashboard).

Language: Respond in Indonesian (Bahasa Indonesia) that is natural, professional, yet friendly.`;

export const useAgenticAI = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // UI Loading state
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  const [limeVisualization, setLimeVisualization] = useState<string | null>(
    localStorage.getItem("lime_visualization"),
  );
  const [confidenceVisualization, setConfidenceVisualization] = useState<
    string | null
  >(localStorage.getItem("confidence_visualization"));

  // Data Fetching for Context
  const { data: journeys, isLoading: isLoadingJourneys } = useJourneysFactory();
  const { data: completions, isLoading: isLoadingCompletions } =
    useUserCompletionsFactory();

  // Prepare derived data
  const isDataReady =
    !isLoadingJourneys && !isLoadingCompletions && !!journeys && !!completions;

  const completedMap = new Map(
    (completions || []).map((c) => [String(c.journey_id), c]),
  );
  const enrolledJourneyIds = new Set(completedMap.keys());

  // Derive enrolled journeys directly from loaded data
  const myEnrolledJourneys = (journeys || []).filter((j) =>
    enrolledJourneyIds.has(String(j.id)),
  );

  // Available to Enroll (Not in enrolledJourneyIds)
  const availableList =
    (journeys || [])
      .filter((j) => !enrolledJourneyIds.has(String(j.id)))
      .map((j) => j.name)
      .slice(0, 5) // Limit to 5
      .join(", ") || "None";

  const completedList =
    myEnrolledJourneys
      .filter((j) => {
        const comp = completedMap.get(String(j.id));
        return (comp?.avg_submission_rating || 0) > 0;
      })
      .map((j) => j.name)
      .join(", ") || "None";

  const inProgressList =
    myEnrolledJourneys
      .filter((j) => {
        const comp = completedMap.get(String(j.id));
        return (comp?.avg_submission_rating || 0) === 0;
      })
      .map((j) => j.name)
      .join(", ") || "None";

  useEffect(() => {
    if (!isDataReady) return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id || "1273d239-30ed-4bb9-82ff-59e5afa7dbca";
    const username = user.username || "Student";
    const learningLabel =
      localStorage.getItem("learning_analysis_label") || "Si Cepat Paham";

    setIsLoading(true);
    setError(null);

    // Dynamic Prompt Injection
    const dynamicPrompt = BOOTSTRAP_PROMPT.replace("{{STUDENT_NAME}}", username)
      .replace("{{ML_LABEL}}", learningLabel)
      .replace("{{COMPLETED_COURSES}}", completedList)
      .replace("{{IN_PROGRESS_COURSES}}", inProgressList)
      .replace("{{AVAILABLE_COURSES}}", availableList);

    // Connect
    const socket = new WebSocket("ws://localhost:8080/ws");
    ws.current = socket;

    socket.onopen = () => {
      console.log("Agentic AI WS Connected");

      // Register
      socket.send(
        JSON.stringify({
          type: "register",
          user_uuid: userId,
        }),
      );

      // Send Prompt
      socket.send(
        JSON.stringify({
          type: "chat",
          input: dynamicPrompt,
          task: "logistic-agent",
        }),
      );
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "response_stream" && data.output) {
          setResponse((prev) => (prev || "") + data.output);
          setIsLoading(false);
          setError(null);
        } else if (data.type === "error") {
          if (!response) setError(data.output);
          setIsLoading(false);
        }
      } catch (e) {
        console.error("Failed to parse WS message", e);
      }
    };

    socket.onerror = (e) => {
      console.error("Agentic AI WS Error", e);
      setResponse((prev) => {
        if (!prev) setError("Failed to connect to AI Mentor");
        return prev;
      });
      setIsLoading(false);
    };

    return () => {
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close();
      }
    };
  }, [isDataReady, completedList, inProgressList, availableList]);

  return {
    response,
    limeVisualization,
    confidenceVisualization,
    isLoading: isLoading || (!isDataReady && !response),
    error,
  };
};
