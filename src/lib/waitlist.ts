import { supabase } from "../../supabase/supabase";

/**
 * Add an email to the waitlist
 * @param email The email address to add
 * @param source Optional source information (e.g., "landing_page")
 * @returns Promise with the result of the operation
 */
export async function addToWaitlist(
  email: string,
  source: string = "landing_page",
) {
  try {
    const { data, error } = await supabase
      .from("waitlist")
      .insert([{ email, source }]);

    if (error) {
      console.error("Error adding to waitlist:", error);

      // Check if it's a duplicate email error
      if (error.code === "23505") {
        // PostgreSQL unique violation code
        return { success: true, message: "You're already on our waitlist!" };
      }

      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to add to waitlist:", error);
    return {
      success: false,
      message: "Failed to join waitlist. Please try again later.",
    };
  }
}
