/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				darkerBlue: "#2ec4b6",
				lighterBlue: "#cbf3f0",
				darkerOrange: "#ff9f1c",
				lighterOrange: "#ffbf69",
			},
		},
	},
	plugins: [],
};
