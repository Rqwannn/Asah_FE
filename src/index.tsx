import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage } from "./Presentation/UI/Pages/LandingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardLayout from "./Presentation/UI/Components/DashboardLayout";
import "remixicon/fonts/remixicon.css";
import CoursePage from "./Presentation/UI/Pages/Dashboard/CoursePage";
import CourseTutorialPage from "./Presentation/UI/Pages/Dashboard/CourseTutorialPage";
import JourneyDetailPage from "./Presentation/UI/Pages/Dashboard/JourneyDetailPage";
import DailyCheckinPage from "./Presentation/UI/Pages/Dashboard/DailyCheckinPage";
import DashboardPage from "./Presentation/UI/Pages/Dashboard/DashboardPage";
import SettingsPage from "./Presentation/UI/Pages/Dashboard/Settings";
import ProtectedRoute from "./Presentation/UI/Components/ProtectedRoute";
import { ToastProvider } from "./components/ui/use-toast";
import SignInPage from "./Presentation/UI/Pages/auth/SignInPage";
import SignUpPage from "./Presentation/UI/Pages/auth/SignUpPage";

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
						path: "/course/:id",
						element: <JourneyDetailPage />,
					},
					{
						path: "/course/learning/:id",
						element: <CourseTutorialPage />,
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
		element: <DashboardLayout />,
		children: [
			{
				path: "/settings",
				element: <SettingsPage />,
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
