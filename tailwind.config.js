/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				Theme: {
					primary: "#374151",

					secondary: "#10b981",

					accent: "#0096f8",

					neutral: "#2563eb",

					"base-100": "#111827",

					info: "#bef264",

					success: "#166534",

					warning: "#eab308",

					error: "#cf284d",
				},
			},
		],
	},
	plugins: [require("daisyui")],
};
