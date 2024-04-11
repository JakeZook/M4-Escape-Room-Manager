import React from "react";
import { useNavigate } from "react-router-dom";

const games = [
	{
		name: "Blackbeard's Brig",
		description: "A pirate-themed escape room.",
		path: "/BB",
		color: "text-cyan-300",
	},
	{
		name: "Egyptian Tomb",
		description: "An Egyptian-themed escape room.",
		path: "/ET",
		color: "text-fuchsia-500",
	},
	{
		name: "Vampire Hunter",
		description: "A vampire-themed escape room.",
		path: "/VH",
		color: "text-rose-500",
	},
	{
		name: "Speakeasy",
		description: "A 1920s-themed escape room.",
		path: "/SP",
		color: "text-yellow-500",
	},
	{
		name: "Casino Heist",
		description: "A casino-themed escape room.",
		path: "/CH",
		color: "text-green-500",
	},
];

function Home() {
	const navigate = useNavigate();

	const handleGameSelect = (path) => {
		navigate(path);
	};

	return (
		<div className="bg-base-100 min-h-screen flex flex-col justify-start items-center">
			<header className="text-accent text-4xl mb-2">M4</header>
			<h2 className="text-secondary mb-8 text-2xl">
				Mythic Mystery Mastery Monstrosity
			</h2>
			<h3 className="text-2xl mb-3">Select Game:</h3>
			<div className="flex flex-wrap justify-center">
				{games.map((game) => (
					<div
						key={game.name}
						className="w-48 bg-primary shadow-lg rounded-lg overflow-hidden m-4 cursor-pointer transition-transform transform hover:scale-105 hover:bg-secondary"
						onClick={() => handleGameSelect(game.path)}
					>
						<div className="px-4 py-6">
							<h3 className={`text-lg font-semibold text-accent ${game.color}`}>
								{game.name}
							</h3>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;
