import DoctorListsTwo from "@/components/Doctors/DoctorListsTwo";
import PageBanner from "@/components/Layout/PageBanner";
import Cta from "@/components/Common/Cta";
import HowItWorksStyle2 from "@/components/Common/HowItWorksStyle2";
import TrustedPartners from "@/components/Common/TrustedPartners";
import WhyChooseUs from "@/components/Doctors/WhyChooseUs";
import Navbar from "@/components/Layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Trusted Medical Experts"
        shortText="Connect with board-certified doctors across multiple specialties—ready to provide expert care whenever you need it."
        homePageUrl="/"
        homePageText="Home"
        activePageText="Doctors"
        image="/images/page-banner.png"
      />

      <DoctorListsTwo />

      <HowItWorksStyle2 />

      <WhyChooseUs />

      <TrustedPartners />

      <Cta />
    </>
  );
}
