"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  loginSchema,
  signupSchema,
  type LoginFormData,
  type SignupFormData,
} from "@/lib/auth-schemas";
import { isRedirectError } from "next/dist/client/components/redirect-error";

type ActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function login(data: LoginFormData): Promise<ActionResult> {
  try {
    // Validate the data
    const validatedData = loginSchema.parse(data);

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      if (isRedirectError(error)) {
        throw error;
      }

      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export async function signup(data: SignupFormData): Promise<ActionResult> {
  try {
    // Validate the data
    const validatedData = signupSchema.parse(data);

    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          full_name: `${validatedData.firstName} ${validatedData.lastName}`,
        },
      },
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    // Redirect to a confirmation page or dashboard
    revalidatePath("/", "layout");
    redirect("/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      if (isRedirectError(error)) {
        throw error;
      }

      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export async function forgotPassword(email: string): Promise<ActionResult> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error("Forgot password error:", err);

    if (isRedirectError(err)) {
      throw err;
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
