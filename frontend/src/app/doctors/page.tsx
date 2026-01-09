import Cta from "@/components/Common/Cta";
import HowItWorksStyle2 from "@/components/Common/HowItWorksStyle2";
import TrustedPartners from "@/components/Common/TrustedPartners";
import DoctorLists from "@/components/Doctors/DoctorLists";
import WhyChooseUs from "@/components/Doctors/WhyChooseUs";
import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Layout/PageBanner";

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

      <DoctorLists />

      <HowItWorksStyle2 />

      <WhyChooseUs />

      <TrustedPartners />

      <Cta />
    </>
  );
}
