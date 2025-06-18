"use client";

import { useUserStore } from "@/lib/store/userStore";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { storeUserKycDocumentAction } from "./action";
import { useRouter } from "next/navigation";
import { deletePhoto, uploadKycPhoto } from "@/lib/actions/user";

function KycForm() {
    const router = useRouter();

    const { user, setUser } = useUserStore((state) => state);

    const [kycType, setKycType] = useState("")
    const [kycFile, setKycFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user?.uid) {
            toast.error("Session expired. Please log in.");
            router.push("/sign-in");
            return;
        }

        if (user?.kyc?.status === "pending") {
            return toast.error("KYC has been submitted already and is under review.")
        }

        if (user?.kyc?.status === "approved") {
            return toast.error("KYC has already been approved.")
        }

        if (!kycType || !kycFile) {
            toast.error("Please select a document type and upload a file.");
            return;
        }

        setIsLoading(true);
        try {
            if (user.kyc?.status === "rejected") {
                await deletePhoto(user.uid);
            }

            const kycUrl = await uploadKycPhoto(kycFile, user.uid);
            const updatedData = await storeUserKycDocumentAction(user.uid, kycType, kycUrl);
            setUser({ ...user, kyc: updatedData.kyc } as User);
            setKycFile(null);
            setKycType("");
            toast.success("KYC document uploaded successfully.");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "An unexpected error occurred."    
            );
        } finally {
            setIsLoading(false);
        }
    };
  return (
    <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex-1 min-w-[0]">
            <div className="mb-6">
            <p className="mb-4 text-sm sm:text-base">
                In order to receive and send funds with your TheQuantumSystem.org account, the law requires us to collect identifying information on our clients and keep it up to date.
            </p>
            <p className="text-sm sm:text-base">
                TheQuantumSystem.org follows the regulations as required for KYC Verification. All data uploaded by customers are fully encrypted and will never be shared with third-parties.
            </p>
            </div>
            <hr className="my-4" />
            <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-center text-gray-400 mb-1 text-sm">Choose Document Type</label>
                <select required value={kycType} onChange={(e) => setKycType(e.target.value)} className="w-full border-2 border-[#b3d6fc] rounded-md px-3 py-2 focus:outline-none focus:border-[#42a5f5] text-gray-700 text-base">
                <option value="">Select One</option>
                <option value="passport">Passport</option>
                <option value="nationalId">National ID</option>
                <option value="driversLicense">Driver&apos;s License</option>
                </select>
            </div>
            <div>
                <label className="block text-center text-gray-400 mb-1 text-sm">Upload Document</label>
                <input
                    type="file"
                    onChange={(e) => setKycFile(e.target.files && e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    required
                    className="w-full border rounded px-3 py-2 bg-white text-xs sm:text-base"
                />
                <div className="text-xs text-gray-400 mt-1 text-center">
                Supported mimes: jpg, jpeg, png, pdf, doc, docx
                </div>
            </div>
            <div className="flex justify-center pt-2">
                <button
                type="submit"
                className="bg-[#21ce99] cursor-pointer text-white font-semibold px-8 py-2 rounded-lg shadow hover:bg-[#1bbd85] transition w-full sm:w-auto"
                style={{ cursor: isLoading ? "not-allowed" : "pointer"}}
                >
                    {isLoading ? "Uploading..." : "Upload"}
                </button>
            </div>
            </form>
        </div>
        
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex-1 min-w-[0]">
            <p className="mb-4 text-sm sm:text-base">
            In order to combat fraud and follow required rules and regulations, qfspatriotledger.com partnered up with JUMIO, a U.S company that provides <span className="font-semibold">REAL-TIME</span> end-to-end identity verification in over 200 countries.
            </p>
            <p className="mb-4 text-sm sm:text-base">
            The verification process may take a few days. During this process and once verification is complete you won’t be able to edit your name on your payments profile.
            </p>
            <div>
            <span className="font-semibold text-[#3d2067]">Tips on submitting documents:</span>
            <ul className="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                <li>Capture the entire document including all four corners.</li>
                <li>Your image must be readable, in focus, and free of reflections and glare.</li>
                <li>Incomplete or obstructed documents or dark or blurry photos won’t be accepted.</li>
                <li>To prevent abuse, we allow a limited number of verification attempts.</li>
                <li>Uploading documents or photos other than what is requested may result in account suspension.</li>
            </ul>
            </div>
        </div>
    </div>
  )
}

export default KycForm