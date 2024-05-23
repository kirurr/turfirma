import TopNav from "@/app/ui/top-nav";
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<TopNav />
			<h1>main layout</h1>
			{children}
		</main>
	);
}

