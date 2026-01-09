"use server";

import { redirect } from "next/navigation";

export async function handleSubscribe(formData: FormData) {
    const email = String(formData.get("email") || "").trim();
    // TODO: Wire up to email marketing service
    redirect("/thank-you");
}
