"use client";

import { sendOtp } from '@/lib/actions/sendOPT';
import { verifyOtp } from '@/lib/actions/verifyOTP';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

function CodeVerify() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [uid, setUid] = useState('');
  const [userName, setUserName] = useState('');

  const router = useRouter();

  useEffect(() => {
    try {
      const localData = JSON.parse(localStorage.getItem("the-quantum-system-user") || "{}");
      if (!localData.email || !localData.uid || !localData.userName) {
        toast.error("Missing user session. Please restart password reset.");
        return router.push("/password/reset");
      }

      setUserEmail(localData.email);
      setUid(localData.uid);
      setUserName(localData.userName);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Session error. Please try again."
      );
      router.push("/password/reset");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!code) return toast.error("Please input a code.");
    if (!userEmail || !uid || !userName) return;

    setIsLoading(true);
    try {
      const { success, successCode, error } = await verifyOtp({
        type: "reset",
        email: userEmail,
        code,
        uid
      });

      if (error) return toast.error(error);
      if (success) {
        router.push(`/password/reset/${successCode}/?id=${uid}&email=${userEmail}`);
        return;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      setCode('');
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    if (!userEmail || !uid || !userName) return;

    setResending(true);
    try {
      const { error, success } = await sendOtp("reset", userEmail, userName);
      if (error) return toast.error(error);
      if (success) toast.success("Code sent again. Check your email.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred."
        );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="mb-6 text-gray-500 text-base">
          A 6-digit verification code was sent to your email address:{" "}
          {userEmail ? `${userEmail.split("@")[0][0]}****@gmail.com` : ""}
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="text-gray-600 font-medium" htmlFor="code">
            Verification Code
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <div className="mt-6 text-gray-400 text-sm text-center">
          If you didn’t get a code,{" "}
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

export default CodeVerify;