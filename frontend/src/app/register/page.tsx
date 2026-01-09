import RegisterForm from "@/components/Auth/RegisterForm";
import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Layout/PageBanner";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Create Your Account"
        shortText="Join Doutor today to book appointments, access expert medical care, and manage your health easily from anywhere."
        homePageUrl="/"
        homePageText="Home"
        activePageText="Register"
        image="/images/page-banner.png"
      />

      <RegisterForm />
    </>
  );
}
