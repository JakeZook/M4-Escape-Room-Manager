import React, { useEffect, useState } from "react";

const BB = () => {
	const objectives = [
		{
			name: "Message in a Bottle - 8367",
			weight: 1,
			hints: [
				"What is Kidd holding?",
				"What does the bottle message say? Does anything stand out?",
				"What on that note stands out? Fortune favors a bold pirate.",
			],
		},
	];

	const [gameState, setGameState] = useState("Idle");
	const [secondTimer, setSecondTimer] = useState(0);
	const [minuteTimer, setMinuteTimer] = useState(60);

	useEffect(() => {
		let intervalId;

		if (gameState === "Running") {
			intervalId = setInterval(() => {
				setSecondTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		}

		return () => clearInterval(intervalId);
	}, [gameState]);

	useEffect(() => {
		if (secondTimer === 0 && gameState === "Running") {
			setMinuteTimer(minuteTimer - 1);
			setSecondTimer(59);
		}
		if (minuteTimer === 0 && secondTimer === 0) {
			setGameState("Ended");
			setSecondTimer(0);
			setMinuteTimer(0);
		}
	}, [secondTimer, gameState]);

	const handleStart = () => {
		if (gameState === "Ended") {
			setGameState("Idle");
			setSecondTimer(0);
			setMinuteTimer(60);
		} else {
			setGameState("Running");
		}
	};
	const handlePause = () => {
		if (gameState === "Paused") {
			setGameState("Running");
			return;
		} else setGameState("Paused");
	};

	const handleEnd = () => {
		setGameState("Ended");
	};

	const handleMinus = () => {
		if (gameState !== "Idle" && gameState !== "Ended") {
			setMinuteTimer(minuteTimer - 1);
		}
	};

	const handlePlus = () => {
		if (gameState !== "Idle" && gameState !== "Ended") {
			setMinuteTimer(minuteTimer + 1);
		}
	};

	const getStateColor = () => {
		if (gameState === "Idle" || gameState === "Paused") {
			return "text-warning";
		} else if (gameState === "Running") {
			return "text-green-500";
		} else if (gameState === "Ended") {
			return "text-error";
		}
	};

	return (
		<div className="flex flex-row">
			<div className="card bg-primary shadow-xl p-2">
				<figure className="bg-base-100">
					<h1 className="text-cyan-300 text-3xl p-2">Blackbeard's Brig</h1>
				</figure>
				<div className="card-body items-center">
					<div className="flex items-center">
						<button
							className="btn btn-circle bg-error text-center text-4xl pb-2"
							onClick={handleMinus}
						>
							-
						</button>
						<span className="countdown font-mono text-6xl mr-5 ml-5">
							<span style={{ "--value": minuteTimer }}></span>:
							<span style={{ "--value": secondTimer }}></span>
						</span>
						<button
							className="btn btn-circle bg-success text-center text-4xl pb-2"
							onClick={handlePlus}
						>
							+
						</button>
					</div>
					<div className="bg-base-100 w-3/4 flex justify-center mt-5">
						<h2 className={`card-title ${getStateColor()} text-2xl p-2`}>
							{gameState}
						</h2>
					</div>
					<div className="card-actions mt-5 flex flex-col items-center">
						<button
							onClick={() => handleStart()}
							disabled={
								gameState === "Running" || gameState === "Paused"
									? "disabled"
									: ""
							}
							className="w-28 m-1 btn btn-success text-2xl text-white"
						>
							{gameState === "Ended" ? "Reset" : "Start"}
						</button>
						<button
							onClick={() => handlePause()}
							disabled={
								gameState === "Idle" || gameState === "Ended" ? "disabled" : ""
							}
							className="w-28 m-1 btn btn-accent text-2xl text-white"
						>
							{gameState === "Paused" ? "Resume" : "Pause"}
						</button>
						<button
							onClick={() => handleEnd()}
							disabled={
								gameState === "Idle" ||
								gameState === "Running" ||
								gameState === "Ended"
									? "disabled"
									: ""
							}
							className="w-28 m-1 btn btn-error text-2xl text-white"
						>
							End
						</button>
					</div>
					<div className="bg-base-100 w-full flex justify-center flex-col items-center p-2 mt-3">
						<h2 className="text-2xl text-accent">Clues: 5</h2>
						<h2 className="card-title text-warning text-2xl p-2">
							Progress: 50%
						</h2>
						<progress
							className="progress progress-success w-56"
							value={50}
							max="100"
						></progress>
					</div>
				</div>
			</div>
			<div className="card bg-primary shadow-xl p-2 mx-5">
				<figure className="bg-base-100">
					<h1 className="text-cyan-300 text-3xl p-2">Objectives</h1>
				</figure>
				<div className="card-body items-center">
					{objectives.map((objective) => (
						<div
							key={objective.name}
							className="flex items-center flex-col bg-accent"
						>
							<h2 className="card-title text-md p-2 text-white mb-2">
								{objective.name}
							</h2>
							<div className="bg-base-100">
								{objective.hints.map((hint) => (
									<div className="flex flex-row items-center">
										<p
											key={hint}
											className="text-sm text-white p-2 items-start text-left"
										>
											{hint}
										</p>
										<button className="btn btn-circle">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="bg-primary m-8 p-8 flex-grow">Overrides</div>
		</div>
	);
};

export default BB;
