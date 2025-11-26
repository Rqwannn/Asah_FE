import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage } from "./Presentation/UI/Pages/LandingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignInPage from "./Presentation/UI/Pages/Auth/SignInPage";
import SignUpPage from "./Presentation/UI/Pages/Auth/SignUpPage";
import DashboardLayout from "./Presentation/UI/Components/DashboardLayout";
import "remixicon/fonts/remixicon.css";
import CoursePage from "./Presentation/UI/Pages/Dashboard/CoursePage";
import CourseLearningPage from "./Presentation/UI/Pages/Dashboard/CourseLearningPage";
import DailyCheckinPage from "./Presentation/UI/Pages/Dashboard/DailyCheckinPage";
import DashboardPage from "./Presentation/UI/Pages/Dashboard/DashboardPage";
import ProtectedRoute from "./Presentation/UI/Components/ProtectedRoute";
import { ToastProvider } from "./components/ui/use-toast";

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		element: <ProtectedRoute />,
		children: [
			{
				element: <DashboardLayout />,
				children: [
					{
						path: "/",
						element: <DashboardPage />,
					},
					{
						path: "/course",
						element: <CoursePage />,
					},
					{
						path: "/course/learning",
						element: <CourseLearningPage />,
					},
					{
						path: "/daily-checkin",
						element: <DailyCheckinPage />,
					},
				],
			},
		],
	},
	{
		path: "/signin",
		element: <SignInPage />,
	},
	{
		path: "/signup",
		element: <SignUpPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<RouterProvider router={router} />
			</ToastProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
