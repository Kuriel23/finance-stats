import Link from "next/link";

export default function NotFound() {
	return (
		<div className="w-full h-screen p-5 flex flex-col items-center justify-center gap-5">
			<h2 className="text-slate-500 dark:text-slate-300 text-2xl">Not Found</h2>
			<p className="text-slate-600 dark:text-slate-200 text-2xl">
				Could not find the requested page.
			</p>
			<Link href="/" className="bg-slate-300 text-slate-600 dark:bg-slate-600 dark:text-slate-200 text-2xl p-2 rounded-md">
				Return to Home
			</Link>
		</div>
	);
}