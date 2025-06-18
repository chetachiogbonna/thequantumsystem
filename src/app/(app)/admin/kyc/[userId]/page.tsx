import { notFound } from 'next/navigation';

import KycButton from '@/components/admin/KycButton';
import { getUserByUidWithWalletStatus } from '@/lib/actions/user';
import Image from 'next/image';
import { AlertOctagon } from 'lucide-react';

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

async function UserKycDetails({ params }: Props) {
  try {
    const userId = (await params).userId;
    const user = await getUserByUidWithWalletStatus(userId);
  
    if (!user) {
      notFound();
    }
  
    return (
      <section className="max-w-5xl mx-auto flex flex-col justify-start">
        <div className="w-full md:w-5/6 lg:w-1/2">
          <h2 className="text-xl font-semibold mb-5">User KYC Details</h2>
  
          <div className="flex flex-col gap-5">
            <Image 
              src={`${user.kyc?.url}&version=${Date.now()}`}
              alt="kyc photo"
              width={500}
              height={500}
            />
  
            <div className="flex justify-between items-center px-4">
              <p className="font-semibold text-lg">
                Current Status: <span>{user.kyc?.status.toLocaleUpperCase()}</span>
              </p>
              <div className="flex gap-2">
                {user.kyc?.status === "approved" ? null : (
                  <KycButton uid={user.uid} label="Approve" kycStatus={user.kyc?.status as string} />
                )}
                <KycButton uid={user.uid} label="Reject" kycStatus={user.kyc?.status as string} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch {
    <div className="w-full flex justify-center items-center gap-1">
      <AlertOctagon color="red" size={15} /> An error occured while loading data. Please check your internet connection and refresh the page.
    </div>
  }
}

export default UserKycDetails;