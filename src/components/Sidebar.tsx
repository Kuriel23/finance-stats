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
		<nav className="flex md:flex-col sticky top-0 z-50 items-center justify-between w-screen h-30 md:w-30 md:h-screen bg-slate-300 dark:bg-slate-700 max-md:rounded-b-xl md:rounded-r-xl font-bold p-2">
			<div className="max-md:flex max-md:w-full max-md:justify-between max-md:mr-3">
				<Link
					href={"#"}
					className="bg-slate-100 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center aspect-square p-1 md:p-2 m-2 md:m-2 w-full md:w-25"
					onMouseEnter={() => homeRef.current?.playFromBeginning()}
				>
					<Player ref={homeRef} icon={home} />
					<p className="text-slate-500 dark:text-slate-300">Overview</p>
				</Link>
				<Link
					href={"#"}
					className="bg-slate-200 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center aspect-square p-1 md:p-2 m-2 md:m-2 w-full md:w-25"
					onMouseEnter={() => growthRef.current?.playFromBeginning()}
				>
					<Player ref={growthRef} icon={growth} />
					<p className="text-slate-500 dark:text-slate-300">Growth</p>
				</Link>
				<Link
					href={"#"}
					className="bg-slate-200 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center aspect-square p-1 md:p-2 m-2 md:m-2 w-full md:w-25"
					onMouseEnter={() => reportsRef.current?.playFromBeginning()}
				>
					<Player ref={reportsRef} icon={reports} />
					<p className="text-slate-500 dark:text-slate-300">Reports</p>
				</Link>
				<Link
					href={"#"}
					className="bg-slate-200 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center aspect-square p-1 md:p-2 m-2 md:m-2 w-full md:w-25"
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
