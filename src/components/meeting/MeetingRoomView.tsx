import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { Button } from "@/components/ui/button";
import { getMeetingToken } from "@/services/bookings";

const ZEGO_SERVER =
	import.meta.env.VITE_ZEGO_SERVER || "wss://webliveroom-api.zego.im/ws";

interface MeetingRoomViewProps {
	bookingId: string;
}

const MeetingRoomView = ({ bookingId }: MeetingRoomViewProps) => {
	const navigate = useNavigate();
	const localContainerRef = useRef<HTMLDivElement>(null);
	const remoteContainerRef = useRef<HTMLDivElement>(null);
	const engineRef = useRef<ZegoExpressEngine | null>(null);
	const localStreamRef = useRef<MediaStream | null>(null);
	const publishStreamIdRef = useRef<string | null>(null);
	const remoteVideosRef = useRef<Map<string, HTMLVideoElement>>(new Map());

	const [status, setStatus] = useState("Connecting to session...");
	const [error, setError] = useState<string | null>(null);

	const cleanup = useCallback(async () => {
		const zg = engineRef.current;
		const localStream = localStreamRef.current;
		const publishStreamId = publishStreamIdRef.current;

		if (zg) {
			if (publishStreamId) {
				zg.stopPublishingStream(publishStreamId);
			}
			remoteVideosRef.current.forEach((_, streamId) => {
				zg.stopPlayingStream(streamId);
			});
			remoteVideosRef.current.clear();
			if (localStream) {
				zg.destroyStream(localStream);
			}
			await zg.logoutRoom();
			zg.off("roomStreamUpdate");
		}

		engineRef.current = null;
		localStreamRef.current = null;
		publishStreamIdRef.current = null;
	}, []);

	const handleLeave = useCallback(async () => {
		await cleanup();
		navigate(-1);
	}, [cleanup, navigate]);

	useEffect(() => {
		let cancelled = false;

		const joinMeeting = async () => {
			try {
				const response = await getMeetingToken(bookingId);
				if (cancelled) return;

				const credentials = response.data;
				const zg = new ZegoExpressEngine(credentials.appId, ZEGO_SERVER);
				engineRef.current = zg;

				const requirements = await zg.checkSystemRequirements("webRTC");
				const supportsWebRTC =
					requirements.result === true || requirements.webRTC === true;

				if (!supportsWebRTC) {
					const needsSecureContext =
						!window.isSecureContext &&
						location.hostname !== "localhost" &&
						location.hostname !== "127.0.0.1";

					throw new Error(
						needsSecureContext
							? "WebRTC requires HTTPS or localhost. Open the app via https:// or http://localhost."
							: "This browser does not support WebRTC video calls.",
					);
				}

				zg.on(
					"roomStreamUpdate",
					async (
						_roomId: string,
						updateType: "ADD" | "DELETE",
						streamList: { streamID: string }[],
					) => {
						if (updateType === "ADD") {
							for (const stream of streamList) {
								if (stream.streamID === publishStreamIdRef.current) continue;
								if (remoteVideosRef.current.has(stream.streamID)) continue;

								const remoteMedia = await zg.startPlayingStream(stream.streamID);
								const video = document.createElement("video");
								video.autoplay = true;
								video.playsInline = true;
								video.muted = false;
								video.srcObject = remoteMedia;
								remoteVideosRef.current.set(stream.streamID, video);
								remoteContainerRef.current?.appendChild(video);
							}
						} else if (updateType === "DELETE") {
							for (const stream of streamList) {
								zg.stopPlayingStream(stream.streamID);
								const video = remoteVideosRef.current.get(stream.streamID);
								video?.remove();
								remoteVideosRef.current.delete(stream.streamID);
							}
						}
					},
				);

				const loggedIn = await zg.loginRoom(
					credentials.roomId,
					credentials.token,
					{ userID: credentials.userId, userName: credentials.userName },
					{ userUpdate: true },
				);

				if (!loggedIn) {
					throw new Error("Failed to join the meeting room.");
				}

				const localStream = await zg.createStream();
				localStreamRef.current = localStream;

				const publishStreamId = `${credentials.userId.replace(/[^a-zA-Z0-9_-]/g, "")}_main`;
				publishStreamIdRef.current = publishStreamId;
				zg.startPublishingStream(publishStreamId, localStream);

				if (localContainerRef.current) {
					const localVideo = document.createElement("video");
					localVideo.autoplay = true;
					localVideo.playsInline = true;
					localVideo.muted = true;
					localVideo.srcObject = localStream;
					localContainerRef.current.appendChild(localVideo);
				}

				if (!cancelled) {
					setStatus("Connected");
				}
			} catch (joinError) {
				if (!cancelled) {
					const message =
						joinError instanceof Error
							? joinError.message
							: "Unable to join the meeting.";
					setError(message);
				}
			}
		};

		joinMeeting();

		return () => {
			cancelled = true;
			cleanup();
		};
	}, [bookingId, cleanup]);

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6 text-center">
				<p className="text-destructive font-medium">{error}</p>
				<Button variant="outline" onClick={() => navigate(-1)}>
					Go back
				</Button>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 p-4 md:p-6 max-w-5xl mx-auto w-full">
			<div className="flex items-center justify-between gap-3">
				<div>
					<h1 className="text-xl font-semibold text-foreground">Video consultation</h1>
					<p className="text-sm text-muted-foreground">{status}</p>
				</div>
				<Button variant="destructive" onClick={handleLeave}>
					Leave meeting
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<p className="text-sm font-medium text-muted-foreground">You</p>
					<div
						ref={localContainerRef}
						className="aspect-video rounded-lg border border-border bg-muted overflow-hidden [&_video]:w-full [&_video]:h-full [&_video]:object-cover"
					/>
				</div>
				<div className="space-y-2">
					<p className="text-sm font-medium text-muted-foreground">Participant</p>
					<div
						ref={remoteContainerRef}
						className="aspect-video rounded-lg border border-border bg-muted overflow-hidden [&_video]:w-full [&_video]:h-full [&_video]:object-cover"
					/>
				</div>
			</div>
		</div>
	);
};

export default MeetingRoomView;
