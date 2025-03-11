import React from "react";
import * as d3 from "d3";

const rawData = [
	{ topic: "Marketing", value: 692 },
	{ topic: "Support", value: 269 },
	{ topic: "Quality", value: 780 },
	{ topic: "Prices", value: 449 },
];
const maxValue = Math.max(...rawData.map((d) => d.value));
const numAxes = rawData.length;

export function RadarChart() {
	const radius = 150;
	const angleSlice = (Math.PI * 2) / numAxes;

	// Scale for the radius
	const rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);

	// Create the radar line
	const radarLine = d3
		.lineRadial<{ value: number }>()
		.radius((d) => rScale(d.value))
		.angle((d, i) => i * angleSlice)
		.curve(d3.curveLinearClosed); // Ensure the path is closed

	// Generate the radar chart path
	const radarPath = radarLine(rawData);

	return (
		<div className="relative mt-8 mb-2">
			<svg
				viewBox={`0 0 ${radius * 2} ${radius * 2}`}
				className="max-w-[18rem] mx-auto overflow-visible"
				role="img"
				aria-label="chart"
			>
				<g transform={`translate(${radius}, ${radius})`}>
					{/* Draw concentric circles */}
					{[...Array(5)].map((_, i) => (
						<circle
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							cx={0}
							cy={0}
							r={(radius / 5) * (i + 1)}
							fill="none"
							className="stroke-gray-800 dark:stroke-gray-200"
							strokeWidth="0.5"
						/>
					))}

					{/* Draw axes */}
					{rawData.map((d, i) => (
						<line
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							x1={0}
							y1={0}
							x2={rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2)}
							y2={rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2)}
							className="stroke-lime-500 dark:stroke-lime-700"
						/>
					))}

					{/* Draw the radar chart path */}
					<path
						d={radarPath || ""}
						strokeWidth="1"
						className="stroke-lime-600 fill-lime-300/70"
					/>

					{/* Add labels for each axis */}
					{rawData.map((d, i) => (
						<text
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							x={
								(rScale(maxValue) + 10) * Math.cos(angleSlice * i - Math.PI / 2)
							}
							y={
								(rScale(maxValue) + 10) * Math.sin(angleSlice * i - Math.PI / 2)
							}
							textAnchor="middle"
							fontSize="14px"
							className="fill-lime-700 dark:fill-lime-300"
						>
							{d.topic}
						</text>
					))}
				</g>
			</svg>
		</div>
	);
}
