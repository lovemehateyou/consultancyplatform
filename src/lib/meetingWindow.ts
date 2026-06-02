const JOIN_EARLY_MINUTES = 10;
const JOIN_LATE_MINUTES = 15;

export const isWithinMeetingJoinWindow = (
	slotStart?: string | null,
	slotEnd?: string | null,
	now = new Date(),
): boolean => {
	if (!slotStart) return false;

	const start = new Date(slotStart);
	const end = slotEnd ? new Date(slotEnd) : new Date(start.getTime() + 60 * 60 * 1000);

	if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
		return false;
	}

	const windowStart = start.getTime() - JOIN_EARLY_MINUTES * 60 * 1000;
	const windowEnd = end.getTime() + JOIN_LATE_MINUTES * 60 * 1000;

	return now.getTime() >= windowStart && now.getTime() <= windowEnd;
};

export const getMeetingJoinPath = (bookingId: string) => `/meeting/${bookingId}`;
