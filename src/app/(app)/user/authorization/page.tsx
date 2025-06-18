"use client";

import { getCurrentUser } from '@/lib/actions/auth';
import { sendOtp } from '@/lib/actions/sendOPT';
import { verifyOtp } from '@/lib/actions/verifyOTP';
import { useUserStore } from '@/lib/store/userStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

function Authorization() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const user = useUserStore((state) => state.user);

  const router = useRouter();

  if (user?.emailVerified) {
    router.back();
    return toast.error("You have already verified your email.");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!code) return toast.error("Please input an OTP code.")

    setIsLoading(true)
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        toast.error("You must be logged in to take this action.")
        return router.push("/sign-in");
      }
      const { success, error } = await verifyOtp({ type: "otp", email: currentUser?.email, code, uid: currentUser?.uid })
      if (error) return toast.error(error)
      if (success) {
        router.push("/user/dashboard");
        return toast.success("Email verified successfully.")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred.")
    } finally {
      setCode("")
      setIsLoading(false)
    }
  }

  const resendOTP = async () => {
    setResending(true)
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        toast.error("You must be logged in to take this action.")
        return router.push("/sign-in");
      }

      const { error, success } = await sendOtp("otp", currentUser?.email, currentUser?.userName)
      if (error) return toast.error(error)
      if (success) {
        return toast.success("OTP has been sent again.", { description: "Check your email." })
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred.")
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="mb-6 text-gray-500 text-base">
          A 6 digit verification code sent to your email address: {user?.email.split("@")[0][0]}****@gmail.com
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="text-gray-600 font-medium" htmlFor="code">
            Verification Code
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            maxLength={6}
            autoComplete="off"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter code"
          />
          <div className="border-b border-dashed border-gray-300 mb-2" />
          <button
            type="submit"
            className="bg-white border border-black py-2 rounded-none text-black font-medium hover:bg-gray-100 transition-colors"
            disabled={isLoading || resending}
            style={{ cursor: isLoading || resending ? "not-allowed" : "pointer" }}
          >
            {isLoading 
              ? "Submitting..."
              : "Submit"
            }
          </button>
        </form>
        <div className="mt-6 text-gray-400 text-sm text-center">
          If you don’t get any code,{' '}
          <button 
            onClick={resendOTP} 
            className="text-blue-500 hover:underline"
            disabled={resending || isLoading}
          >
            {resending ? "Resending..." : "Try again"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Authorization;