import LoginForm from "@/components/Auth/LoginForm";
import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Layout/PageBanner";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Welcome Back"
        shortText="Log in to your Doutor account to manage appointments, access medical records, and stay connected with your healthcare providers."
        homePageUrl="/"
        homePageText="Home"
        activePageText="Login"
        image="/images/page-banner.png"
      />

      <LoginForm />
    </>
  );
}
