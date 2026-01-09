"use server";

import { redirect } from "next/navigation";
import { submitContact } from "@/lib/api";

export async function handleContact(formData: FormData) {
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const number = String(formData.get("number") || "").trim();
    const text = String(formData.get("text") || "").trim();
    const agree = formData.get("agree") === "on";

    try {
        // Validate required fields
        if (!name || !email || !subject || !text) {
            throw new Error("Missing required fields");
        }

        // Submit to backend API
        const result = await submitContact({
            name,
            email,
            subject,
            number,
            text,
        });

        if (!result.success) {
            throw new Error(result.message || "Failed to submit contact form");
        }

        redirect("/thank-you");
    } catch (error) {
        console.error("[Contact Error]", error);
        // TODO: Show error message to user
        redirect("/thank-you?error=contact-failed");
    }
}
