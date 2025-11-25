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
import DashboardPage from "./Presentation/UI/Pages/Dashboard/DashboardPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
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
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
);
