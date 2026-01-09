"use client";

import FrequentlyAskedQuestions from "@/components/Common/FrequentlyAskedQuestions";
import ContactForm from "@/components/ContactUs/ContactForm";
import ContactInfo from "@/components/ContactUs/ContactInfo";
import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Layout/PageBanner";
export default function Page() {
  return (
    <>
      <Navbar />

      <ContactInfo />

      <ContactForm />

    </>
  );
}