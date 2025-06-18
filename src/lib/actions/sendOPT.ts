"use server";

import nodemailer from "nodemailer";
import { redis } from "./redis";

export async function sendOtp(type: "otp" | "reset", email: string, name: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await redis.set(`${type}:${email}`, code, { ex: 300 });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = {
    otp: `
      <p>Hi ${name},</p>
      <p>Your one-time password (OTP) is: <strong>${code}</strong></p>
      <p>This code will expire in 5 minutes.</p>
      <p>If you didn’t request this, please ignore this email.</p>
      <br/>
      <p>— The Quantum System Team</p>
    `,
    reset: `
      <p>Hi ${name},</p>
      <p>Your password reset code is: <strong>${code}</strong></p>
      <p>This code will expire in 5 minutes.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
      <br/>
      <p>— The Quantum System Team</p>

    `
  }

  const mailOptions = {
    from: `"TheQuantumSystem" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: type === "otp" ? "Your Quantum System OTP Code" : "Your Quantum System Reset Password Code",
    html: html[type]
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, code };
  } catch (err) {
    console.error("Email send error:", err);
    return { error: "Failed to send OTP." };
  }
}

export async function sendAdminNotification(user: {
  name: string;
  email: string;
  createdAt?: string;
}) {
  const adminEmail = process.env.EMAIL_USER;
  if (!adminEmail) {
    console.error("ADMIN_EMAIL is not set");
    return { error: "Admin email is not configured" };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <p>Hi Admin,</p>
    <p>A new user has just signed up on your platform.</p>
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    ${user.createdAt ? `<p><strong>Registered At:</strong> ${user.createdAt}</p>` : ""}
    <br/>
    <p>— The Quantum System Team</p>
  `;

  const mailOptions = {
    from: `"TheQuantumSystem" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: "🔔 New User Registration Alert",
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("Admin email send error:", err);
    return { error: "Failed to send admin notification." };
  }
}