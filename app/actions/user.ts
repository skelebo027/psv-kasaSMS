"use server"

import { z } from "zod"

// Define a schema for profile updates
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").optional(),
  email: z.string().email("Invalid email address.").optional(),
  // In a real app, you'd handle password changes securely,
  // likely with separate fields for current and new password.
  // For this example, we'll keep it simple.
})

export async function updateUserProfile(formData: FormData) {
  // Simulate a delay for network request
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const name = formData.get("name") as string
  const email = formData.get("email") as string

  try {
    // Validate the input
    const validatedFields = profileSchema.safeParse({ name, email })

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    // In a real application, you would interact with your database here
    // For demonstration, we'll just log the updated data
    console.log("Updating user profile with:", validatedFields.data)

    // Simulate a successful update
    return {
      success: true,
      message: "Profile updated successfully!",
      data: validatedFields.data,
    }
  } catch (error) {
    console.error("Error updating profile:", error)
    return {
      success: false,
      message: "Failed to update profile. Please try again.",
    }
  }
}
