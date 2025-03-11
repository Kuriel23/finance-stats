"use client";

import { Player } from "@lordicon/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRef } from "react";

const home = require("@/icons/home.json");
const growth = require("@/icons/growth.json");
const moon = require("@/icons/moon.json");
const reports = require("@/icons/reports.json");
const sun = require("@/icons/sun.json");
const users = require("@/icons/users.json");

export default function Sidebar() {
	const homeRef = useRef<Player>(null);
	const growthRef = useRef<Player>(null);
	const modeRef = useRef<Player>(null);
	const reportsRef = useRef<Player>(null);
	const usersRef = useRef<Player>(null);
	const { setTheme } = useTheme();
	return (
		<nav className="flex flex-col items-center justify-between w-30 h-screen bg-slate-300 dark:bg-slate-700 rounded-r-xl font-bold">
			<div>
				<Link
					href={"#"}
					className="bg-slate-100 dark:bg-slate-900 rounded-xl w-25 flex flex-col items-center justify-center p-2 m-2 aspect-square"
					onMouseEnter={() => homeRef.current?.playFromBeginning()}
				>
					<Player ref={homeRef} icon={home} />
					<p className="text-slate-500 dark:text-slate-300">Overview</p>
				</Link>
				<Link
					href={"#"}
					className="bg-slate-200 dark:bg-slate-900 rounded-xl w-25 flex flex-col items-center justify-center p-2 m-2 aspect-square"
					onMouseEnter={() => growthRef.current?.playFromBeginning()}
				>
					<Player ref={growthRef} icon={growth} />
					<p className="text-slate-500 dark:text-slate-300">Growth</p>
				</Link>
				<Link
					href={"#"}
					className="bg-slate-200 dark:bg-slate-900 rounded-xl w-25 flex flex-col items-center justify-center p-2 m-2 aspect-square"
					onMouseEnter={() => reportsRef.current?.playFromBeginning()}
				>
					<Player ref={reportsRef} icon={reports} />
					<p className="text-slate-500 dark:text-slate-300">Reports</p>
				</Link>
				<Link
					href={"#"}
					className="bg-slate-200 dark:bg-slate-900 rounded-xl w-25 flex flex-col items-center justify-center p-2 m-2 aspect-square"
					onMouseEnter={() => usersRef.current?.playFromBeginning()}
				>
					<Player ref={usersRef} icon={users} />
					<p className="text-slate-500 dark:text-slate-300">Users</p>
				</Link>
			</div>
			<div
				className="cursor-pointer my-5 hidden dark:block"
				onKeyDown={() => setTheme("light")}
				onClick={() => setTheme("light")}
				onMouseEnter={() => modeRef.current?.playFromBeginning()}
			>
				<Player ref={modeRef} icon={moon} size={50} />
			</div>
			<div
				className="cursor-pointer my-5 dark:hidden block"
				onKeyDown={() => setTheme("dark")}
				onClick={() => setTheme("dark")}
				onMouseEnter={() => modeRef.current?.playFromBeginning()}
			>
				<Player ref={modeRef} icon={sun} size={50} />
			</div>
		</nav>
	);
}
