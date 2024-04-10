import React, { useRef } from "react";

function BBHints() {
	const mediaRef = useRef(null);

	const toggleFullScreen = () => {
		const mediaElement = mediaRef.current;

		if (mediaElement.requestFullscreen) {
			if (!document.fullscreenElement) {
				mediaElement.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		} else if (mediaElement.webkitRequestFullscreen) {
			if (!document.webkitFullscreenElement) {
				mediaElement.webkitRequestFullscreen();
			} else {
				document.webkitExitFullscreen();
			}
		} else if (mediaElement.msRequestFullscreen) {
			if (!document.msFullscreenElement) {
				mediaElement.msRequestFullscreen();
			} else {
				document.msExitFullscreen();
			}
		}
	};

	return (
		<div className="relative w-screen h-screen">
			<video
				ref={mediaRef}
				className="w-full h-full object-cover"
				loop
				autoPlay
				muted
				src="https://www.w3schools.com/html/mov_bbb.mp4"
				onDoubleClick={toggleFullScreen}
			></video>
			<div className="absolute top-0 left-0 flex items-center justify-center">
				<h1 className="text-white text-4xl font-bold">Fuck you, Auric</h1>
			</div>
		</div>
	);
}

export default BBHints;
