"use client";

import HowItWorksStyle2 from "@/components/Common/HowItWorksStyle2";
import QuickAccessPanel from "@/components/Common/QuickAccessPanel";
import WhatDrivesUs from "@/components/Common/WhatDrivesUs";
import PageBanner from "@/components/Layout/PageBanner";
import ServicesLists from "@/components/Services/ServicesLists";
import PatientsFeedbacksTwo from "@/components/Common/PatientsFeedbacksTwo";
import TrustedPartners from "@/components/Common/TrustedPartners";
import Cta from "@/components/Common/Cta";
import Navbar from "@/components/Layout/Navbar";
export default function Page() {
  return (
    <>
      <Navbar />

      <ServicesLists />
    </>
  );
}
