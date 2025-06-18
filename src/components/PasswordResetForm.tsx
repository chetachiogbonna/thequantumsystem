"use client"

import { updateUserPasswordAction } from "@/app/(app)/(auth)/password/reset/[passwordResetCode]/action"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"

type PasswordResetFormProps = { 
  userId: string, 
  error: string | undefined, 
  success: boolean | undefined, 
  email: string 
}

export default function PasswordResetForm({ userId, error, success, email }: PasswordResetFormProps) {
  const router = useRouter();

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    try {
      if (!userId) {
        toast("User not found.")
        return router.push("/password/reset");
      }

      if (error || !success) {
        toast.error(error)
        return router.push("/password/reset");
      }

      const localData = JSON.parse(localStorage.getItem("the-quantum-system-user") || "{}");
      if (!localData.email || !localData.uid) {
        toast.error("Missing user session. Please restart password reset.");
        return router.push("/password/reset");
      }

      if (localData.email !== email || localData.uid !== userId) {
        toast.error("Invalid URL. Please restart password reset.");
        return router.push("/password/reset");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Session error. Please try again."
      );
      router.push("/password/reset");
    }
  }, [router, error, success, userId, email]);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (password !== confirmPassword) return toast.error("Passwords do not match.")
      startTransition(async () => {
        await updateUserPasswordAction(userId, password);
        localStorage.removeItem("the-quantum-system-user");
        router.push("/sign-in");
      })
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occured. Please try again."
      )
    }
  }

  return (
    <div className="p-4 max-w 5xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-md p-6">
        <div className="space-y-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            Your account is verified successfully. Now you can change your password. Please enter a strong password and
            don&apos;t share it with anyone.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-600 text-sm">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-gray-600 text-sm">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isPending}
              style={{ cursor: isPending ? "not-allowed" : "pointer" }}
            >
              {isPending ? "Submitting..." : "Submit" }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}