import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TodosPage } from "./Presentation/UI/Pages/TodosPage";
import { LandingPage } from "./Presentation/UI/Pages/LandingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignInPage from "./Presentation/UI/Pages/auth/SignInPage";
import SignUpPage from "./Presentation/UI/Pages/auth/SignUpPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/todos",
		element: <TodosPage />,
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
