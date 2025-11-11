import { Link } from "react-router-dom";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<nav>
				<h2>Menu</h2>
				<ul>
					<li className="text-[">
						<Link to="/">Users</Link>
					</li>
				</ul>
			</nav>
			{children}
		</>
	);
}
