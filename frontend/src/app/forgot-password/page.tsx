import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";
import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Layout/PageBanner";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Reset Your Password"
        shortText="Enter your registered email to receive instructions for creating a new password and regain access to your Doutor account."
        homePageUrl="/"
        homePageText="Home"
        activePageText="Forgot Password"
        image="/images/page-banner.png"
      />

      <ForgotPasswordForm />
    </>
  );
}
