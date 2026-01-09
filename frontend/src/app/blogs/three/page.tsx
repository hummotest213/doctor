import BlogWithLeftSidebar from "@/components/Blog/BlogWithLeftSidebar";
import SubscribeForm from "@/components/Common/SubscribeForm";
import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Layout/PageBanner";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Insights, Tips & Trusted Health Advice"
        shortText="Explore expert-written articles on telemedicine, wellness, mental health, and everyday care—designed to help you live healthier, smarter, and more confidently."
        homePageUrl="/"
        homePageText="Home"
        activePageText="Blog 03"
        image="/images/page-banner.png"
      />

      <BlogWithLeftSidebar />

      <SubscribeForm />
    </>
  );
}
