import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function POST() {
  const supabase = await createClient();

  // Get the current user (if any)
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    // No user found, redirect to signup
    redirect("/auth/signup");
  }

  // Check if user is already confirmed
  if (user.email_confirmed_at) {
    // User is already confirmed, redirect to dashboard
    redirect("/dashboard");
  }

  // Resend confirmation email
  const { error } = await supabase.auth.resend({
    type: "signup",
    email: user.email!,
  });

  if (error) {
    console.error("Error resending confirmation email:", error);
    redirect("/error?type=resend-failed");
  }

  // Redirect back to the confirmation page with success message
  redirect("/auth/confirm-email?resent=true");
}
