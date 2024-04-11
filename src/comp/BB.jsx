import React, { useEffect, useState, useRef } from "react";

const BB = () => {
	const objectives = [
		{
			name: "Message in a Bottle - 8367",
			hints: [
				"What is Kidd holding?",
				"What does the bottle message say? Does anything stand out?",
				"What on that note stands out? Fortune favors a bold pirate.",
			],
		},
		{
			name: "Scratchy Compass - RATS",
			hints: [
				`You're close to answering Kidd's final riddle. These "PEST" creep out even the toughest of pirates. Do you see any in the brig?`,
			],
		},
		{
			name: "Message in a Bottle - 8367",
			hints: [
				"What is Kidd holding?",
				"What does the bottle message say? Does anything stand out?",
				"What on that note stands out? Fortune favors a bold pirate.",
			],
		},
		{
			name: "Scratchy Compass - RATS",
			hints: [
				`You're close to answering Kidd's final riddle. These "PEST" creep out even the toughest of pirates. Do you see any in the brig?`,
			],
		},
		{
			name: "Message in a Bottle - 8367",
			hints: [
				"What is Kidd holding?",
				"What does the bottle message say? Does anything stand out?",
				"What on that note stands out? Fortune favors a bold pirate.",
			],
		},
		{
			name: "Scratchy Compass - RATS",
			hints: [
				`You're close to answering Kidd's final riddle. These "PEST" creep out even the toughest of pirates. Do you see any in the brig?`,
			],
		},
	];

	const [gameState, setGameState] = useState("Idle");
	const [secondTimer, setSecondTimer] = useState(0);
	const [minuteTimer, setMinuteTimer] = useState(60);
	const [hints, setHints] = useState(0);
	const [progress, setProgress] = useState(0);
	const [toggleObj, setToggleObj] = useState(objectives.map(() => true));
	const [toggleHints, setToggleHints] = useState(
		objectives.map((objective) => objective.hints.map(() => true))
	);
	const [log, setLog] = useState([]);

	const endOfListRef = useRef(null);

	const scrollToBottom = () => {
		endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [log]);

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

	useEffect(() => {
		if (progress === 100) {
			setGameState("Ended");
		}
	}, [progress]);

	const handleStart = () => {
		if (gameState === "Ended") {
			setLog([]);
			setGameState("Idle");
			setSecondTimer(0);
			setMinuteTimer(60);
			setHints(0);
			setProgress(0);
			setToggleObj(objectives.map(() => true));
			setToggleHints(
				objectives.map((objective) => objective.hints.map(() => true))
			);
		} else {
			setGameState("Running");
			addLog("Game Started");
		}
	};
	const handlePause = () => {
		if (gameState === "Paused") {
			addLog("Game Resumed");
			setGameState("Running");
			return;
		} else {
			addLog("Game Paused");
			setGameState("Paused");
		}
	};

	const handleEnd = () => {
		addLog("Game Ended");
		setGameState("Ended");
	};

	const handleMinus = () => {
		if (gameState !== "Idle" && gameState !== "Ended") {
			addLog("Timer manually decreased by 1 minute");
			setMinuteTimer(minuteTimer - 1);
		}
	};

	const handlePlus = () => {
		if (gameState !== "Idle" && gameState !== "Ended") {
			addLog("Timer manually increased by 1 minute");
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

	const handleOpenHints = () => {
		const path = "/BB/Hint-Screen";

		const url = window.location.origin + path;

		window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
	};

	const toggleObjective = (index) => {
		if (gameState === "Running" || gameState === "Paused") {
			if (toggleObj[index] === true) {
				addLog(`${objectives[index].name} complete`);
			}

			setToggleObj((prevStates) => {
				const newStates = [...prevStates];
				newStates[index] = !newStates[index];

				const completedObjectives = newStates.filter((obj) => !obj).length;
				const totalObjectives = newStates.length;
				const newProgress = Math.round(
					(completedObjectives / totalObjectives) * 100
				);
				setProgress(newProgress);

				return newStates;
			});
		} else return;
	};

	const updateHints = (hint, hintIndex, objIndex) => {
		if (gameState === "Running" || gameState === "Paused") {
			addLog(`Sent: ${hint}`);
			setHints((prevHints) => prevHints + 1);
			setToggleHints((prevHints) => {
				const newHints = [...prevHints];
				newHints[objIndex][hintIndex] = false;
				return newHints;
			});
		} else return;
	};

	const addLog = (message) => {
		setLog((prevLogs) => [
			...prevLogs,
			{ message, timestamp: new Date().toLocaleTimeString() },
		]);
	};

	return (
		<div className="flex flex-row justify-around">
			<div className="card bg-primary shadow-xl p-2 mx-2 w-80">
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
					<div className="bg-base-100 w-3/4 flex justify-center mt-5 badge p-5">
						<h2 className={`card-title ${getStateColor()} text-2xl p-2`}>
							{gameState}
						</h2>
					</div>
					<div className="card-actions my-5 flex flex-col items-center">
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
					<div className="bg-base-100 w-full h-32 flex justify-center flex-col items-center p-2 mt-5 badge">
						<h2 className="text-2xl text-accent">Hints: {hints}</h2>
						<h2 className="card-title text-warning text-2xl p-2">
							Progress: {progress}%
						</h2>
						<progress
							className="progress progress-success w-56"
							value={progress}
							max="100"
						></progress>
					</div>
				</div>
			</div>
			<div
				className="card bg-primary shadow-xl p-2 mx-2"
				style={styles.objContainer}
			>
				<figure className="bg-base-100">
					<h1 className="text-cyan-300 text-3xl p-2">Objectives</h1>
				</figure>
				<div
					className="overflow-y-scroll no-scrollbar"
					style={styles.objectives}
				>
					{objectives.map((objective, index) => (
						<div key={index} className="card-bod m-2.5 flex flex-col">
							<div className="flex items-center justify-between">
								<h2
									className={`card-title text-2xl text-white justify-between w-full px-2 ${
										toggleObj[index] ? `bg-error` : `bg-success`
									}`}
								>
									{objective.name}
									<input
										type="checkbox"
										className="toggle toggle-md"
										checked={toggleObj[index]}
										onChange={() => toggleObjective(index)}
									/>
								</h2>
							</div>
							{toggleObj[index] && (
								<div className="flex flex-col">
									{objective.hints.map((hint, hintIndex) => (
										<div
											key={hintIndex}
											className="text-white bg-base-300 flex flex-row justify-between border-b-2 border-accent items-center"
										>
											<p
												onClick={() => updateHints(hint, hintIndex, index)}
												className={`p-2 text-left cursor-pointer ${
													toggleHints[index][hintIndex]
														? `text-white`
														: `text-gray-500`
												}`}
											>
												{hint}
											</p>
										</div>
									))}
								</div>
							)}
						</div>
					))}
				</div>
				<div
					className="flex flex-row justify-center"
					style={styles.msgContainer}
				>
					<textarea
						className="textarea textarea-info w-full bg-base-300 mr-2 text-xl"
						placeholder="Type your message here..."
					></textarea>
					<div className="flex flex-col justify-around">
						<button className="btn btn-success">Send Hint</button>
						<button className="btn btn-accent">Send Msg</button>
						<button className="btn btn-error">Clear</button>
					</div>
				</div>
			</div>
			<div className="card bg-primary shadow-xl p-2 mx-2 w-80">
				<figure className="bg-base-100">
					<h1 className="text-cyan-300 text-3xl p-2">Game Master</h1>
				</figure>
				<div
					role="tablist"
					className="tabs tabs-boxed mt-2"
					style={styles.tabContainer}
				>
					<input
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab"
						aria-label="Events"
					/>
					<div role="tabpanel" className="tab-content p-10">
						<div className="flex flex-col items-center">
							<button className="btn btn-accent max-w-28 m-2">Chime</button>
							<button className="btn btn-info max-w-28 m-2">Hint Screen</button>
							<button className="btn btn-success max-w-28 m-2">
								+5 minutes
							</button>
							<button className="btn btn-error max-w-28 m-2">-5 minutes</button>
						</div>
					</div>

					<input
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab"
						aria-label="Overrides"
					/>
					<div role="tabpanel" className="tab-content p-10">
						<div className="flex flex-col items-center">
							<button className="btn btn-accent max-w-28 m-2">Puzzle 1</button>
							<button className="btn btn-accent max-w-28 m-2">Puzzle 2</button>
							<button className="btn btn-accent max-w-28 m-2">puzzle 3</button>
							<button className="btn btn-accent max-w-28 m-2">puzzle 4</button>
						</div>
					</div>

					<input
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab"
						aria-label="Log"
					/>
					<div role="tabpanel" className="tab-content p-10">
						<div className="flex flex-col overflow-y-auto no-scrollbar max-h-72">
							<ul className="list-disc">
								{log.map((logEntry, index) => (
									<li key={index} className="text-white">
										<span className="text-warning">[{logEntry.timestamp}]</span>{" "}
										{logEntry.message}
									</li>
								))}
								<div ref={endOfListRef} />
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const styles = {
	objectives: {
		maxHeight: "450px",
	},
	objContainer: {
		width: "1000px",
	},
	msgContainer: {
		position: "absolute",
		bottom: "5px",
		width: "590px",
	},
	tabContainer: {
		maxHeight: "400px",
	},
};

export default BB;
