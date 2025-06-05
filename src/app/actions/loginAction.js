"use server";

import { getBackendUrl } from "@/lib/getBackendUrl";
import { cookies } from "next/headers";

const url = getBackendUrl();

export async function loginAction(loginData) {
  try {
    const endpoint = `${url}/api/admin-auth/admin-login`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include",
    });

    const { success, data, message, token } = await res.json();

    if (success && token) {
      const cookieStore = await cookies();

      cookieStore.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
        sameSite:
          process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 1 * 24 * 60 * 60, // 7 days
      });
    }

    return { success, data, message };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login error." };
  }
}
