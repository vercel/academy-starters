"use server";

import { redirect } from "next/navigation";
import { encodedRedirect } from "@/utils/redirect";

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // TODO: Create Supabase client
  // TODO: Call auth.signInWithPassword with email and password
  // TODO: Handle error with encodedRedirect("error", "/sign-in", error.message)
  // TODO: Redirect to /protected on success

  console.log("Sign in attempt:", email);
  return encodedRedirect("error", "/sign-in", "Sign in not implemented yet");
};

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // TODO: Create Supabase client
  // TODO: Build redirect URL for email confirmation
  // TODO: Call auth.signUp with email, password, and emailRedirectTo option
  // TODO: Handle error with encodedRedirect("error", "/sign-up", error.message)
  // TODO: Redirect to /protected on success

  console.log("Sign up attempt:", email);
  return encodedRedirect("error", "/sign-up", "Sign up not implemented yet");
};

export const signOutAction = async () => {
  // TODO: Create Supabase client
  // TODO: Call auth.signOut()
  // TODO: Redirect to /sign-in

  return redirect("/sign-in");
};
