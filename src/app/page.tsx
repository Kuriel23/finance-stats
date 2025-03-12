"use client";

import { useEffect, useRef } from "react";
import { createSwapy, type Swapy } from "swapy";
import { DonutChartCenterText } from "./_components/DonutChartCenterText";
import { LineChartPulse } from "./_components/LineChartPulse";
import { PieChart } from "./_components/PieChart";
import { BarChartVertical } from "./_components/BarChartVertical";
import { RadarChart } from "./_components/RadarChart";

export default function Home() {
	const swapyRef = useRef<Swapy | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			swapyRef.current = createSwapy(containerRef.current, {
				animation: "dynamic",
				// swapMode: 'drop',
				autoScrollOnDrag: true,
				enabled: true,
				// dragAxis: 'x',
				// dragOnHold: true
			});

			// swapyRef.current.enable(false)
			// swapyRef.current.destroy()
			// console.log(swapyRef.current.slotItemMap())

			swapyRef.current.onBeforeSwap((event) => {
				console.log("beforeSwap", event);
				// This is for dynamically enabling and disabling swapping.
				// Return true to allow swapping, and return false to prevent swapping.
				return true;
			});
		}
		return () => {
			swapyRef.current?.destroy();
		};
	}, []);
	return (
		<div className="w-full p-5">
			<div className="flex justify-between items-center">
				<h1 className="text-slate-500 dark:text-slate-300 text-2xl">
					Hello, <b>Ellie Armstrong</b>.
				</h1>
				<div className="bg-slate-300 dark:bg-slate-700 cursor-pointer rounded-xl aspect-square h-10 p-1.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 256 256"
						role="img"
						aria-label="logout"
						className="fill-slate-500 dark:fill-slate-300"
					>
						<path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z" />
					</svg>
				</div>
			</div>
			<div
				className="grid md:grid-cols-2 xl:grid-cols-6 my-3 md:gap-5 gap-y-5"
				ref={containerRef}
			>
				<div data-swapy-slot="outgoing" className="xl:col-span-2">
					<div
						className="bg-slate-300 dark:bg-slate-700 rounded-xl p-3 grid grid-cols-1 w-full h-full"
						data-swapy-item="outgoing"
					>
						<p className="text-slate-500 dark:text-slate-300 font-bold text-lg mb-3 w-full text-center">
							Money Outgoing
						</p>
						<DonutChartCenterText />
					</div>
				</div>
				<div data-swapy-slot="sales" className="xl:col-span-2">
					<div
						className="bg-slate-300 dark:bg-slate-700 rounded-xl p-3 grid grid-cols-1 w-full h-full"
						data-swapy-item="sales"
					>
						<p className="text-slate-500 dark:text-slate-300 font-bold text-lg mb-3 w-full text-center">
							Total sales vs clients of the last four years
						</p>
						<LineChartPulse />
					</div>
				</div>
				<div data-swapy-slot="cat" className="md:col-span-2">
					<div
						className="bg-slate-300 dark:bg-slate-700 rounded-xl p-3 grid grid-cols-1 w-full h-full"
						data-swapy-item="cat"
					>
						<p className="text-slate-500 dark:text-slate-300 font-bold text-lg mb-3 w-full text-center">
							What products are being selled?
						</p>
						<PieChart />
					</div>
				</div>
				<div data-swapy-slot="where" className="md:col-span-2 xl:col-span-3">
					<div
						className="bg-slate-300 dark:bg-slate-700 rounded-xl p-3 grid grid-cols-1 w-full h-full"
						data-swapy-item="where"
					>
						<p className="text-slate-500 dark:text-slate-300 font-bold text-lg mb-3 w-full text-center">
							Where people are coming from?
						</p>
						<BarChartVertical />
					</div>
				</div>
				<div data-swapy-slot="why" className="md:col-span-2 xl:col-span-3">
					<div
						className="bg-slate-300 dark:bg-slate-700 rounded-xl p-3 grid grid-cols-1 w-full h-full"
						data-swapy-item="why"
					>
						<p className="text-slate-500 dark:text-slate-300 font-bold text-lg mb-3 w-full text-center">
							Why people are coming to my shop?
						</p>
						<RadarChart />
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-center">
				<p className="text-slate-500 dark:text-slate-300 text-2xl text-center">
					You can drag-and-drop all the charts!
				</p>
				<p className="text-slate-500 dark:text-slate-300 text-2xl text-center">
					Made by{" "}
					<a
						href="https://kurieldev.vercel.app"
						target="_blank"
						className="text-red-500 font-bold"
						rel="noreferrer"
					>
						KurielDev
					</a>
					.
				</p>
			</div>
		</div>
	);
}
