"use client";

import { createTicket, uploadTicketFiles } from "@/lib/actions/ticket";
import { useUserStore } from "@/lib/store/userStore";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

const allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf", ".doc", ".docx"];

export default function NewTicket() {
  const user = useUserStore((state) => state.user);

  const router = useRouter();

  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState<"High" | "Low" | "Medium">("High");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 5) {
      setError("Max 5 files can be uploaded.");
      toast.error("Max 5 files can be uploaded.");
      return;
    }
    for (const file of selectedFiles) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Maximum upload size is 2M per file.");
        toast.error("Maximum upload size is 2M per file.");
        return;
      }
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        setError("Invalid file type.");
        toast.error("Invalid file type.");
        return;
      }
    }
    setFiles([...files, ...selectedFiles]);
  };

  const handleAddNew = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return toast.error("No user found. Please log in.")
    
    try {
      startTransition(async () => {
        let uploadedFiles: { url: string, fileId: string }[] = []
        if (files.length > 0) {
          uploadedFiles = await uploadTicketFiles(files)
        }

        await createTicket({ uid: user.uid, subject, priority, status: "Open", message, sender: "user", files: uploadedFiles, userEmail: user.email, userName: user.userName })

        setError("")
        setFiles([]);
        setSubject("")
        setMessage("")

        toast.success("Ticket added successfully.")

        router.push("/user/ticket");
      })

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error ocurred. Please try again."
      )
    }
  };

  if (error) toast.error(error)

  return (
    <div className="flex justify-center bg-[#f3f3fa] pb-8">
      <form
        className="bg-white rounded-xl shadow p-8 w-full max-w-2xl border"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">New Ticket</h2>
        <div className="mb-4">
          <label className="block text-gray-500 mb-1">Subject</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 mb-1">Priority</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value as "High" | "Low" | "Medium")}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 mb-1">Message</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[120px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="mb-2 flex flex-col lg:flex-row items-center">
          <label className="block text-gray-500 mr-2">Attachments</label>
          <span className="text-red-500 text-sm text-center">
            Max 5 files can be uploaded. Maximum upload size is 2M
          </span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input
            id="fileInput"
            type="file"
            className="hidden"
            multiple
            accept={allowedExtensions.join(",")}
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="border px-2 py-1 rounded text-xs"
            onClick={handleAddNew}
          >
            + Add New
          </button>
        </div>
        {files.length > 0 && (
          <div className="mb-2">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <span>{file.name}</span>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleRemoveFile(idx)}
                  disabled={isPending}
                  style={{ cursor: isPending ? "not-allowed" : "pointer" }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mb-2">
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="No file chosen"
            value={files.map((f) => f.name).join(", ")}
            readOnly
            disabled
          />
        </div>
        <div className="text-gray-500 text-sm mb-4 text-center">
          Allowed File Extensions: {allowedExtensions.join(", ")}
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-gray-200 border border-black rounded py-2 text-lg flex items-center justify-center gap-2 hover:bg-gray-300"
          disabled={isPending}
          style={{ cursor: isPending ? "not-allowed" : "pointer" }}
        >
          {isPending ? "Submitting..." : "Submit" }
          <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
          >
              <path
              d="M8 12h8m0 0l-4-4m4 4l-4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
              />
          </svg>
        </button>
      </form>
    </div>
  );
}