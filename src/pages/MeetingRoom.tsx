import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MeetingRoomView from "@/components/meeting/MeetingRoomView";
import { getUserInfoFromCookie } from "@/services/auth";

const MeetingRoom = () => {
	const { bookingId } = useParams<{ bookingId: string }>();
	const navigate = useNavigate();

	useEffect(() => {
		const user = getUserInfoFromCookie();
		if (!user?.id) {
			navigate("/login", { replace: true });
		}
	}, [navigate]);

	if (!bookingId) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-muted-foreground">Invalid meeting link.</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			<MeetingRoomView bookingId={bookingId} />
		</div>
	);
};

export default MeetingRoom;
