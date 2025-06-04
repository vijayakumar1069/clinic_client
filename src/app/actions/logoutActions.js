"use server";
import { cookies } from "next/headers";

export async function logoutAction(url) {
  try {
    console.log(url);
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${accessToken}`,
      },
      body: null,
      credentials: "include",
    });

    const { success, message } = await res.json();
    if (success) {
      cookieStore.delete("access_token");
      return { success: true, message: "Successfully signed out." };
    } else {
      return { success: false, message: "Failed to sign out." };
    }
  } catch (error) {
    return { success: false, message: "Failed to sign out." };
  }
}
