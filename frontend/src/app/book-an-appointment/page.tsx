"use client";

import BookAnAppointmentForm from "@/components/BookAnAppointment/BookAnAppointmentForm";
import FrequentlyAskedQuestions from "@/components/Common/FrequentlyAskedQuestions";
import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Layout/PageBanner";
export default function Page() {
  return (
    <>
      <Navbar />

      <BookAnAppointmentForm />

      <div className="linear-gradient-inner">
     </div>
    </>
  );
}
