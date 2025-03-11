import { pie, arc, type PieArcDatum } from "d3";

type Item = { name: string; value: number };
const data: Item[] = [
	{ name: "Ads", value: 29.5 },
	{ name: "Food", value: 22.1 },
	{ name: "Salary", value: 48.4 },
];

export function DonutChartCenterText() {
	const radius = 420; // Chart base dimensions
	const gap = 0.01; // Gap between slices
	const lightStrokeEffect = 10; // 3d light effect around the slice

	// Pie layout and arc generator
	const pieLayout = pie<Item>()
		.value((d) => d.value)
		.padAngle(gap); // Creates a gap between slices

	// Adjust innerRadius to create a donut shape
	const innerRadius = radius / 1.625;
	const arcGenerator = arc<PieArcDatum<Item>>()
		.innerRadius(innerRadius)
		.outerRadius(radius)
		.cornerRadius(lightStrokeEffect + 2); // Apply rounded corners

	// Create an arc generator for the clip path that matches the outer path of the arc
	const arcClip =
		arc<PieArcDatum<Item>>()
			.innerRadius(innerRadius + lightStrokeEffect / 2)
			.outerRadius(radius)
			.cornerRadius(lightStrokeEffect + 2) || undefined;

	const labelRadius = radius * 0.825;
	const arcLabel = arc<PieArcDatum<Item>>()
		.innerRadius(labelRadius)
		.outerRadius(labelRadius);

	const arcs = pieLayout(data);

	// Calculate the angle for each slice
	function computeAngle(d: PieArcDatum<Item>) {
		return ((d.endAngle - d.startAngle) * 180) / Math.PI;
	}

	// Minimum angle to display text
	const minAngle = 20; // Adjust this value as needed

	const colors = ["#166534", "#F87171", "#C084FC"]; // add more colors if needed

	return (
		<div className="relative">
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="text-center">
					<p className="text-lg text-zinc-500 dark:text-zinc-300">Total</p>
					<p className="text-4xl transition-colors duration-300 font-bold">
						10.084$
					</p>
				</div>
			</div>
			<svg
				viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
				className="max-w-80 mx-auto overflow-visible"
				role="img"
				aria-label="chart"
			>
				{/* Slices */}
				{arcs.map((d, i) => (
					<clipPath
						key={`donut-c1-clip-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							i
						}`}
						id={`donut-c1-clip-${i}`}
					>
						<path d={arcClip(d) || undefined} />
						{/* biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */}
						<linearGradient key={i} id={`donut-c1-gradient-${i}`}>
							<stop offset="55%" stopColor={colors[i]} stopOpacity={0.95} />
						</linearGradient>
					</clipPath>
				))}

				{/* Labels with conditional rendering */}
				{arcs.map((d, i) => {
					const angle = computeAngle(d);
					const centroid = arcLabel.centroid(d);
					if (d.endAngle > Math.PI) {
						centroid[0] += 10;
						centroid[1] += 0;
					} else {
						centroid[0] -= 20;
						centroid[1] -= 0;
					}

					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<g key={i}>
							<g clipPath={`url(#donut-c1-clip-${i})`}>
								<path
									fill={`url(#donut-c1-gradient-${i})`}
									stroke="#ffffff33" // Lighter stroke for a 3D effect
									strokeWidth={lightStrokeEffect} // Adjust stroke width for the desired effect
									d={arcGenerator(d) || undefined}
								/>
							</g>

							<g opacity={angle > minAngle ? 1 : 0}>
								<text
									transform={`translate(${centroid})`}
									textAnchor="middle"
									fontSize={38}
								>
									<tspan y="-0.4em" fontWeight="600" fill="#eee">
										{d.data.name}
									</tspan>
									{angle > minAngle && (
										<tspan x={0} y="0.7em" fillOpacity={0.7} fill="#eee">
											{d.data.value.toLocaleString("en-US")}%
										</tspan>
									)}
								</text>
							</g>
						</g>
					);
				})}
			</svg>
		</div>
	);
}
