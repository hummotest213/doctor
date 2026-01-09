import PageBanner from "@/components/Layout/PageBanner";
import FrequentlyAskedQuestions from "@/components/Common/FrequentlyAskedQuestions";
import Benefits from "@/components/Common/Benefits";
import Navbar from "@/components/Layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Frequently Asked Questions"
        shortText="Find quick answers to common questions about Doutor's services, appointments, and healthcare support."
        homePageUrl="/"
        homePageText="Home"
        activePageText="FAQ's"
        image="/images/page-banner.png"
      />

      <Benefits />

      <div className="linear-gradient-inner">
        <FrequentlyAskedQuestions />
      </div>
    </>
  );
}
