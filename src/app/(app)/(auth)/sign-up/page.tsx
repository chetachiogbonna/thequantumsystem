"use client";

import Logo from '@/components/Logo'
import { PhoneNumberInput } from '@/components/PhoneNumberInput';
import { registerUser } from '@/lib/actions/auth';
import { db } from '@/lib/firebase/firebaseClient';
import { useUserStore } from '@/lib/store/userStore';
import { isValidEmail } from '@/lib/utils';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { isValidPhoneNumber } from 'react-phone-number-input';
import { toast } from "sonner"

function SignUp() {
  const setUser = useUserStore((state) => state.setUser);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    userName: '',
    country: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false); 

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log(form.phone)

    if (form.password !== form.confirmPassword) {
      return toast.error('Passwords do not match') 
    }

    if (!isValidEmail(form.email)) {
      return toast.error("Please enter a valid email address.")
    }

    if (!isValidPhoneNumber(form.phone)) {
      return toast.error("Please enter a valid phone number.");
    }

    setLoading(true);
    try {
      const usersRef = collection(db, "users");

      const emailQuery = query(usersRef, where("email", "==",form.email), limit(1));
      const emailSnapshot = await getDocs(emailQuery);

      if (!emailSnapshot.empty) {
        throw new Error("Email is already in use.");
      }

      const usernameQuery = query(usersRef, where("userName", "==", form.userName), limit(1));
      const usernameSnapshot = await getDocs(usernameQuery);

      if (!usernameSnapshot.empty) {
        throw new Error("Username is already in use.");
      }

      const phoneNumberQuery = query(usersRef, where("phone", "==", form.phone), limit(1));
      const phoneNumberSnapshot = await getDocs(phoneNumberQuery);

      if (!phoneNumberSnapshot.empty) {
        throw new Error("Phone number is already in use.");
      }

      const user = await registerUser(form);
      setUser(user);

      toast.success("Account created successfully.");
      router.push('/user/authorization');
      return toast.warning("Please verify your email.");
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error(error instanceof Error ? error.message : "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-5 flex items-center justify-center bg-[url('/images/hero-bg.jpg')] bg-no-repeat bg-cover">
      <Link href="/" className="absolute top-4 left-4 md:top-10 md:left-20">
        <Logo width={150} />
      </Link>

      <div className="bg-white mt-16 rounded-2xl shadow-lg w-full max-w-sm p-6 pt-0 flex flex-col mb-8">
        <div className="flex justify-center mt-6 mb-4">
          <Link href="/sign-in" className="font-semibold text-gray-400 px-4 pb-2">
            SIGN IN
          </Link>
          <Link href="/sign-up" className="font-semibold text-black border-b-2 border-[#42a5f5] px-4 pb-2 focus:outline-none">
            SIGN UP
          </Link>
        </div>
        <div className="text-center text-[#b3e0fc] mb-6 font-medium">
          Create your account
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="bg-[#f6f8fa] rounded-md px-4 py-3 text-base outline-none border-none placeholder-gray-500 w-full peer"
              autoComplete="off"
            />
            <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#42a5f5] rounded-b-md scale-x-0 peer-focus:scale-x-100 transition-transform duration-200 origin-left"></span>
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="bg-[#f6f8fa] rounded-md px-4 py-3 text-base outline-none border-none placeholder-gray-500 w-full peer"
            />
            <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#42a5f5] rounded-b-md scale-x-0 peer-focus:scale-x-100 transition-transform duration-200 origin-left"></span>
          </div>
          <div className="relative">
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              placeholder="Username"
              required
              className="bg-[#f6f8fa] rounded-md px-4 py-3 text-base outline-none border-none placeholder-gray-500 w-full peer"
            />
            <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#42a5f5] rounded-b-md scale-x-0 peer-focus:scale-x-100 transition-transform duration-200 origin-left"></span>
          </div>
          <div className="relative">
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
              required
              className="bg-[#f6f8fa] rounded-md px-4 py-3 text-base outline-none border-none placeholder-gray-500 w-full peer"
              autoComplete="off"
            />
            <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#42a5f5] rounded-b-md scale-x-0 peer-focus:scale-x-100 transition-transform duration-200 origin-left"></span>
          </div>
          <div className="relative">
            <PhoneNumberInput
              value={form.phone}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, phone: val ?? "" }))
              }
            />
            <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#42a5f5] rounded-b-md scale-x-0 peer-focus:scale-x-100 transition-transform duration-200 origin-left"></span>
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="bg-[#f6f8fa] rounded-md px-4 py-3 text-base outline-none border-none placeholder-gray-500 w-full peer"
              autoComplete="off"
            />
            <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#42a5f5] rounded-b-md scale-x-0 peer-focus:scale-x-100 transition-transform duration-200 origin-left"></span>
          </div>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="bg-[#f6f8fa] rounded-md px-4 py-3 text-base outline-none border-none placeholder-gray-500 w-full peer"
              autoComplete="off"
            />
            <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#42a5f5] rounded-b-md scale-x-0 peer-focus:scale-x-100 transition-transform duration-200 origin-left"></span>
          </div>
          <button
            type="submit"
            className="bg-[#42a5f5] text-white cursor-pointer rounded-md py-3 mt-2 font-semibold shadow-lg hover:bg-[#2196f3] transition flex items-center justify-center"
            style={{ boxShadow: '0 8px 24px 0 #42a5f555' }}
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            ) : null}
            {loading ? "Signing Up..." : "SIGN UP"}
          </button>

          <Link href="/password/reset" className="text-center text-sm hover:underline text-[#59b8f3] font-medium">Forgot Password</Link>
        </form>
      </div>
    </div>
  )
}

export default SignUp