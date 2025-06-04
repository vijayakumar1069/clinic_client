"use server";

import { getBackendUrl } from "@/lib/getBackendUrl";
import { cookies } from "next/headers";

const url = getBackendUrl();
console.log(url);

export async function loginAction(loginData, role = "admin") {
  try {
    const endpoint =
      role === "doctor"
        ? `${url}/api/doctor/doctor-login`
        : `${url}/api/admin/admin-login`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include",
    });

    const { success, user, message, token } = await res.json();

    if (success && token) {
      const cookieStore = cookies();

      cookieStore.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
        sameSite:
          process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
    }

    return { success, user, message };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login error." };
  }
}
