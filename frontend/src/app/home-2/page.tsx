import CtaTwo from "@/components/Common/CtaTwo";
import HowItWorksStyle2 from "@/components/Common/HowItWorksStyle2";
import OurBlog from "@/components/Common/OurBlog";
import OurDoctorsStyle2 from "@/components/Common/OurDoctorsStyle2";
import AboutUs from "@/components/HomeDemo2/AboutUs";
import DownloadApp from "@/components/HomeDemo2/DownloadApp";
import FrequentlyAskedQuestions from "@/components/HomeDemo2/FrequentlyAskedQuestions";
import HeroBanner from "@/components/HomeDemo2/HeroBanner";
import OurServices from "@/components/HomeDemo2/OurServices";
import PatientsFeedbacks from "@/components/HomeDemo2/PatientsFeedbacks";
import QuickAccessPanel from "@/components/Common/QuickAccessPanel";
import WhyChooseUs from "@/components/HomeDemo2/WhyChooseUs";
import Navbar from "@/components/Layout/Navbar";

export default function Home2() {
  return (
    <>
      <Navbar />

      <HeroBanner />

      <AboutUs />

      <OurServices />

      <HowItWorksStyle2 />

      <WhyChooseUs />

      <OurDoctorsStyle2 />

      <div className="pb-140 smoke-bg-color">
        <QuickAccessPanel />
      </div>

      <PatientsFeedbacks />

      <FrequentlyAskedQuestions />

      <DownloadApp />

      <OurBlog />

      <CtaTwo />
    </>
  );
}
