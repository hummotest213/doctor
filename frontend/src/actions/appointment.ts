"use server";

import { redirect } from "next/navigation";
import { submitAppointment } from "@/lib/api";

export async function handleAppointment(formData: FormData) {
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "");
    const date = String(formData.get("date") || "").trim();
    const time = String(formData.get("time") || "").trim();
    const doctor = String(formData.get("doctor") || "").trim();
    const notes = String(formData.get("notes") || "").trim();
    const agree = formData.get("agree") === "on";

    try {
        // Validate required fields
        if (!name || !email || !phone || !service || !date) {
            throw new Error("Missing required fields");
        }

        // Submit to backend API
        const result = await submitAppointment({
            name,
            email,
            phone,
            service,
            date,
            time,
            doctor,
            notes,
        });

        if (!result.success) {
            throw new Error(result.message || "Failed to submit appointment");
        }

        redirect("/thank-you");
    } catch (error) {
        console.error("[Appointment Error]", error);
        // TODO: Show error message to user
        redirect("/thank-you?error=appointment-failed");
    }
}
