import Cta from "@/components/Common/Cta";
import HowItWorksStyle2 from "@/components/Common/HowItWorksStyle2";
import InsuranceInformation from "@/components/Common/InsuranceInformation";
import TrustedPartners from "@/components/Common/TrustedPartners";
import WhyChooseUsTwo from "@/components/Common/WhyChooseUsTwo";
import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Layout/PageBanner";
import PricingPlanThree from "@/components/Pricing/PricingPlanThree";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Our Pricing Plans"
        shortText="Choose the plan that works best for you. Doutor provides clear, affordable, and flexible options to make quality healthcare accessible for everyone."
        homePageUrl="/"
        homePageText="Home"
        activePageText="Pricing Plan 02"
        image="/images/page-banner.png"
      />

      <PricingPlanThree />

      <InsuranceInformation />

      <HowItWorksStyle2 />

      <WhyChooseUsTwo />

      <TrustedPartners />

      <Cta />
    </>
  );
}
