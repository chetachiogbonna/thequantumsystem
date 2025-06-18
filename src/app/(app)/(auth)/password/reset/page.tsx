"use client";

import { sendOtp } from "@/lib/actions/sendOPT";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner"
import { getUserByEmailAction } from "./action";
import { isValidEmail } from "@/lib/utils";

function ResetPassword() {
    const router = useRouter();

    const [email, setEmail] = useState("");

    const [isPending, setIsPending] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!isValidEmail(email)) {
          return toast.error("Please enter a valid email address.")
        }
        
        setIsPending(true)

        try {
          const userToUpdatePassword = await getUserByEmailAction(email)
          const { error, success } = await sendOtp("reset", userToUpdatePassword.email, userToUpdatePassword.userName)
          if (error) {
              toast.error(error)
              return;
          }
          localStorage.setItem("the-quantum-system-user", JSON.stringify(userToUpdatePassword))
          if (success) {
              return router.push("/password/reset/code-verify");
          }
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : "An error occured. Please try again."
          )
        } finally {
          setIsPending(false);
        }
    }

  return (
    <section className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-md">
        <form className="bg-white rounded-lg shadow-sm p-8 space-y-6" onSubmit={handleSubmit}>
          <div className="text-gray-600 text-sm leading-relaxed">
            To recover your account please provide your email or username to find your account.
          </div>

          <div className="space-y-2">
            <label htmlFor="reset-input" className="block text-gray-600 text-sm">
              Email or Username
            </label>
            <input 
              id="reset-input" 
              required
              type="text" 
              autoComplete="off" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={isPending}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-100 border-2 border-black text-[15px]"
            disabled={isPending}
            style={{ cursor: isPending ? "not-allowed" : "pointer" }}
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default ResetPassword