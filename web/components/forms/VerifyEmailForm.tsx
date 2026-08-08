"use client";
import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import {
  useResendEmailVerificationMutation,
  useVerifyEmailMutation,
} from "@/store/api/verificationApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";

interface props {
  email: string;
}
export default function VerifyEmailForm({ email }: props) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendEmail, { isLoading: isResending }] =
    useResendEmailVerificationMutation();
  const handleVerify = async () => {
    try {
      if (otp.length < 6) return;
      await verifyEmail({
        email,
        otp,
      }).unwrap();
      router.push("/login");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  const handleResend = async () => {
    try {
      await resendEmail({
        email,
      }).unwrap();
      setOtp("")
      toast.success("Otp sent successfully")
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-6 border-black border justify-center items-center p-20 bg-card">
        <div className="text-center">
          <h1 className="text-2xl text-bold">Verify your Email</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We sent a verification code to
          </p>
          <p className="font-medium">{email}</p>
        </div>
        <form onSubmit={handleVerify} className="w-full">
          <div className="flex flex-col justify-center items-center gap-5">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              inputMode="numeric"
              autoComplete="one-time-code"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="border h-10 w-10 bg-muted" />
                <InputOTPSlot index={1} className="border h-10 w-10 bg-muted" />
                <InputOTPSlot index={2} className="border h-10 w-10 bg-muted" />
                <InputOTPSlot index={3} className="border h-10 w-10 bg-muted" />
                <InputOTPSlot index={4} className="border h-10 w-10 bg-muted" />
                <InputOTPSlot index={5} className="border h-10 w-10 bg-muted" />
              </InputOTPGroup>
            </InputOTP>
            <Button
              type="submit"
              onClick={handleVerify}
              disabled={otp.length !== 6 || isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </Button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Didn&rbrace;t receive the code?
          </p>

          <Button variant="link" onClick={handleResend} disabled={isResending}>
            {isResending ? "Sending..." : "Resend OTP"}
          </Button>
        </div>
      </div>
    </div>
  );
}
