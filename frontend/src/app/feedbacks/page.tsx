import FeedbackLists from "@/components/Feedbacks/FeedbackLists";
import PageBanner from "@/components/Layout/PageBanner";
import FrequentlyAskedQuestions from "@/components/Common/FrequentlyAskedQuestions";
import Navbar from "@/components/Layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="What Our Patients Say"
        shortText="We value every voice. Hear real stories and experiences from patients who trusted Doutor with their healthcare journey."
        homePageUrl="/"
        homePageText="Home"
        activePageText="Feedbacks"
        image="/images/page-banner.png"
      />

      <FeedbackLists />

      <div className="linear-gradient-inner">
        <FrequentlyAskedQuestions />
      </div>
    </>
  );
}
