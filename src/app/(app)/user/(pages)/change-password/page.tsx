"use client";

import { updateUserPassword } from "@/lib/actions/auth";
import { verifyCurrentPassword } from "@/lib/actions/user";
import { useUserStore } from "@/lib/store/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function ChangePassword() {
  const user = useUserStore((state) => state.user);

  const router = useRouter();

  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Session expired. Please log in.")
      return router.push("/sign-in");
    }

    setError("");
    setSuccess("");

    if (!current || !password || !confirm) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

      setIsLoading(true)

    try {
      const { error } = await verifyCurrentPassword(user.email, current);
      if (error) {
        setError("Current password is incorrect.");
        setCurrent("");
        return;
      }

      await updateUserPassword(user.uid, password);
      toast.error("Password changed successfully!")
      setSuccess("Password changed successfully!");
      setCurrent("");
      setPassword("");
      setConfirm("");
      router.push("/sign-in");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center">
      <form
        className="bg-white rounded-xl shadow p-8 w-full max-w-xl border"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <div className="mb-4">
          <label className="block text-gray-500 mb-1">Current Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <button
          type="submit"
          className="w-full bg-gray-200 border border-black rounded py-2 text-lg font-medium hover:bg-gray-300 cursor-pointer"
          disabled={isLoading}
          style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;