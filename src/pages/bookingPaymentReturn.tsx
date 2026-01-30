import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyBookingPayment } from "@/services/bookings";
import { useToast } from "@/hooks/use-toast";

const BookingPaymentReturn = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { toast } = useToast();
	const [isVerifying, setIsVerifying] = useState(true);

	useEffect(() => {
		const txRef = searchParams.get("tx_ref") || searchParams.get("trx_ref");
		const status = searchParams.get("status") || "success";

		if (!txRef) {
			setIsVerifying(false);
			return;
		}

		const verify = async () => {
			try {
				await verifyBookingPayment(txRef, status);
				toast({
					title: "Payment confirmed",
					description: "Your booking payment was successful.",
				});
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: "Unable to verify payment.";
				toast({
					title: "Payment verification failed",
					description: message,
					variant: "destructive",
				});
			} finally {
				setIsVerifying(false);
				setTimeout(() => navigate("/consultancy", { replace: true }), 1200);
			}
		};

		verify();
	}, [navigate, searchParams, toast]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="text-center space-y-3">
				<h1 className="text-2xl font-semibold text-foreground">Verifying payment</h1>
				<p className="text-muted-foreground">
					{isVerifying ? "Please wait while we confirm your payment." : "Redirecting..."}
				</p>
			</div>
		</div>
	);
};

export default BookingPaymentReturn;
