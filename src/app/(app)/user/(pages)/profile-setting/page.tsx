"use client";

import { updateProfileAction } from "./action";
import { useUserStore } from '@/lib/store/userStore';
import { useEffect, useState } from 'react';
import { toast } from "sonner";

function ProfileSettings() {
  const { setUser, user } = useUserStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    state: user?.state || "",
    zipCode: user?.zipCode || "",
    city: user?.city || "",
  });

  useEffect(() => {
    setForm({
      fullName: user?.fullName || "",
      lastName: user?.lastName || "",
      address: user?.address || "",
      state: user?.state || "",
      zipCode: user?.zipCode || "",
      city: user?.city || "",
    });
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    if (!user?.uid) { 
      setIsLoading(false);
      return;
    }
    try {
      const updatedUser = await updateProfileAction(user.uid, form);
      setUser(updatedUser);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occured. Please try again.")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center md:px-8">
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="bg-white rounded-xl shadow-sm p-4 w-full md:max-w-xs md:w-80 mx-auto md:mx-0 md:flex-shrink-0">
          <div className="flex justify-between py-3 border-b">
            <span>Username</span>
            <span className="font-bold">{user?.userName}</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span>Email</span>
            <span className="font-bold text-[#3d2067]">{user?.email}</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span>Mobile</span>
            <span className="font-bold">{user?.phone}</span>
          </div>
          <div className="flex justify-between py-3">
            <span>Country</span>
            <span className="font-bold">{user?.country}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 w-full">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border rounded px-3 py-2 outline-none"
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full border rounded px-3 py-2 outline-none"
            />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border rounded px-3 py-2 outline-none"
            />
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full border rounded px-3 py-2 outline-none"
            />
            <input
              type="text"
              name="zipCode"
              value={form.zipCode}
              onChange={handleChange}
              placeholder="Zip Code"
              className="w-full border rounded px-3 py-2 outline-none"
            />
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border rounded px-3 py-2 outline-none"
            />
            <button
              type="submit"
              className="w-full border border-black py-2 bg-[#f5f5fa] rounded text-black font-medium hover:bg-gray-100 transition"
              disabled={isLoading}
              style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', cursor: isLoading ? 'not-allowed' : 'pointer' }  }
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings