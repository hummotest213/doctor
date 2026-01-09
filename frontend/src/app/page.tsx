"use client";

import Feedbacks from "@/components/Common/Feedbacks";
import Benefits from "@/components/Common/Benefits";
import HeroBanner from "@/components/HomeDemo1/HeroBanner";
import OurServices from "@/components/HomeDemo1/OurServices";
import FrequentlyAskedQuestions from "@/components/HomeDemo1/FrequentlyAskedQuestions";
import OurBlog from "@/components/Common/OurBlog";
import Navbar from "@/components/Layout/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />

      <HeroBanner />

      <OurServices />

      <Feedbacks />
    </>
  );
}
