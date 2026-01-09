import WhatDrivesUs from "@/components/Common/WhatDrivesUs";
import PageBanner from "@/components/Layout/PageBanner";
import Cta from "@/components/Common/Cta";
import OurServices from "@/components/Services/OurServices";
import WhyChooseUs from "@/components/Common/WhyChooseUs";
import PatientsFeedbacksThree from "@/components/Common/PatientsFeedbacksThree";
import HowItWorksStyle2 from "@/components/Common/HowItWorksStyle2";
import TrustedPartners from "@/components/Common/TrustedPartners";
import Navbar from "@/components/Layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Virtual Care Services"
        shortText="Explore a full range of virtual healthcare services—delivered by trusted doctors, anytime you need them."
        homePageUrl="/"
        homePageText="Home"
        activePageText="Services 02"
        image="/images/page-banner.png"
      />

      <WhatDrivesUs />

      <div className="linear-gradient-inner">
        <OurServices />

        <WhyChooseUs />
      </div>

      <PatientsFeedbacksThree />

      <HowItWorksStyle2 />

      <TrustedPartners />

      <Cta />
    </>
  );
}
