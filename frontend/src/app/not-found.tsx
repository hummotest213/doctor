import PageBanner from "@/components/Layout/PageBanner";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Layout/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="Oops! Page Not Found"
        shortText="Sorry, the page you’re looking for doesn’t exist or has been moved. Please check the URL or return to the homepage."
        homePageUrl="/"
        homePageText="Home"
        activePageText="404 Error Page"
        image="/images/page-banner.png"
      />

      <div className="not-found-area ptb-140">
        <div className="container">
          <div className="not-found-content text-center">
            <Image
              src="/images/error.png"
              alt="error"
              width={500}
              height={200}
            />

            <h3>Oops! That Page Can&apos;t Be Found</h3>

            <Link href="/" className="default-btn">
              <span className="left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <path
                    d="M17.8077 0.98584H1.19231C0.810154 0.98584 0.5 1.29599 0.5 1.67815C0.5 2.0603 0.810154 2.37046 1.19231 2.37046H16.1361L0.702846 17.8041C0.4325 18.0744 0.4325 18.5126 0.702846 18.783C0.838192 18.9183 1.01508 18.9858 1.19231 18.9858C1.36954 18.9858 1.54677 18.9183 1.68177 18.783L17.1154 3.34938V18.2935C17.1154 18.6757 17.4255 18.9858 17.8077 18.9858C18.1898 18.9858 18.5 18.6757 18.5 18.2935V1.67815C18.5 1.29599 18.1898 0.98584 17.8077 0.98584Z"
                    fill="white"
                  />
                </svg>
              </span>
              Back To Home
              <span className="right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <path
                    d="M17.8077 0.98584H1.19231C0.810154 0.98584 0.5 1.29599 0.5 1.67815C0.5 2.0603 0.810154 2.37046 1.19231 2.37046H16.1361L0.702846 17.8041C0.4325 18.0744 0.4325 18.5126 0.702846 18.783C0.838192 18.9183 1.01508 18.9858 1.19231 18.9858C1.36954 18.9858 1.54677 18.9183 1.68177 18.783L17.1154 3.34938V18.2935C17.1154 18.6757 17.4255 18.9858 17.8077 18.9858C18.1898 18.9858 18.5 18.6757 18.5 18.2935V1.67815C18.5 1.29599 18.1898 0.98584 17.8077 0.98584Z"
                    fill="white"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
