import BlogDetailsContentTwo from "@/components/Blog/BlogDetailsContentTwo";
import SubscribeForm from "@/components/Common/SubscribeForm";
import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Layout/PageBanner";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="How Telemedicine Supports Working Parents"
        shortText="Balancing work and parenting is a daily challenge—and when health issues arise, it becomes even more stressful."
        homePageUrl="/"
        homePageText="Home"
        activePageText="Blog Details 02"
        image="/images/page-banner.png"
      />


    </>
  );
}
