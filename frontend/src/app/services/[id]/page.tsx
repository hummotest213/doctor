import PageBanner from "@/components/Layout/PageBanner";
import Cta from "@/components/Common/Cta";
import TrustedPartners from "@/components/Common/TrustedPartners";
import Link from "next/link";
import Image from "next/image";
import WhyChooseUs from "@/components/Services/WhyChooseUs";
import KeyServices from "@/components/Services/KeyServices";
import Navbar from "@/components/Layout/Navbar";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  // Service ID from URL parameter
  const serviceId = params.id;
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle="General Medical Care"
        shortText="Fast, convenient virtual visits for everyday health concerns—no waiting room needed."
        homePageUrl="/"
        homePageText="Home"
        activePageText="Services 02"
        image="/images/page-banner.png"
      />

      <div className="service-overview-area ptb-140">
        <div className="container">
          <div className="row justify-content-center align-items-center g-4">
            <div className="col-xl-6 col-md-12">
              <div className="service-overview-image">
                <Image
                  src="/images/service-overview.jpg"
                  alt="Service overview"
                  width={1272}
                  height={922}
                />
              </div>
            </div>

            <div className="col-xl-6 col-md-12">
              <div className="service-overview-content">
                <h2>Service Overview</h2>
                <p>
                  At Doutor, our General Medical Care service connects you with
                  licensed healthcare professionals for non-emergency
                  concerns—all from the comfort of your home. Whether it&apos;s
                  a sudden cold, seasonal allergies, or a lingering cough,
                  we&apos;re here to help you feel better, faster.
                </p>
                <p>
                  Our licensed physicians provide personalized care tailored to
                  your symptoms and medical history. Whether you&apos;re dealing
                  with a minor illness, an unexpected flare-up, or just need
                  reliable medical advice, we&apos;re here to help—quickly and
                  securely.
                </p>
                <ul>
                  <li>
                    <Image
                      src="/images/check.svg"
                      alt="check"
                      width={16}
                      height={12}
                    />
                    <span>Real, Licensed Doctors Only</span>
                  </li>
                  <li>
                    <Image
                      src="/images/check.svg"
                      alt="check"
                      width={16}
                      height={12}
                    />
                    <span>On-Demand Appointments, 24/7</span>
                  </li>
                  <li>
                    <Image
                      src="/images/check.svg"
                      alt="check"
                      width={16}
                      height={12}
                    />
                    <span>Transparent Pricing With or Without Insurance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="service-covers-area pb-140">
        <div className="container">
          <div className="row justify-content-center align-items-center g-4">
            <div className="col-xl-9 col-md-12">
              <div className="service-covers-content">
                <h2>Our Virtual Care Covers</h2>
                <ul>
                  <li>
                    <Image
                      src="/images/check.svg"
                      alt="check"
                      width={16}
                      height={12}
                    />
                    <span>Colds, flu, sinus infections, sore throat</span>
                  </li>
                  <li>
                    <Image
                      src="/images/check.svg"
                      alt="check"
                      width={16}
                      height={12}
                    />
                    <span>Seasonal allergies and hay fever</span>
                  </li>
                  <li>
                    <Image
                      src="/images/check.svg"
                      alt="check"
                      width={16}
                      height={12}
                    />
                    <span>Prescription refills for common medications</span>
                  </li>
                  <li>
                    <Image
                      src="/images/check.svg"
                      alt="check"
                      width={16}
                      height={12}
                    />
                    <span>Minor infections (UTI, pink eye, earaches)</span>
                  </li>
                  <li>
                    <Image
                      src="/images/check.svg"
                      alt="check"
                      width={16}
                      height={12}
                    />
                    <span>Headaches, stomach aches, mild pain</span>
                  </li>
                  <li>
                    <Image
                      src="/images/check.svg"
                      alt="check"
                      width={16}
                      height={12}
                    />
                    <span>Fever, fatigue, and general illness symptoms</span>
                  </li>
                  <li>
                    <Image
                      src="/images/check.svg"
                      alt="check"
                      width={16}
                      height={12}
                    />
                    <span>Skin rashes, insect bites, mild irritation</span>
                  </li>
                  <li>
                    <Image
                      src="/images/check.svg"
                      alt="check"
                      width={16}
                      height={12}
                    />
                    <span>Post-visit questions and follow-ups</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-md-12">
              <div className="service-covers-wrap">
                <div className="image">
                  <Image
                    src="/images/services/layer.svg"
                    alt="image"
                    width={60}
                    height={67}
                  />
                </div>

                <p>Explore even more ways we can support your health</p>

                <Link href="/services" className="link-btn">
                  View More Services
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="14"
                    viewBox="0 0 13 14"
                    fill="none"
                  >
                    <path
                      d="M12.5 0.0117188H0.5C0.224 0.0117188 0 0.235719 0 0.511719C0 0.787719 0.224 1.01172 0.5 1.01172H11.2928L0.1465 12.1582C-0.04875 12.3535 -0.04875 12.67 0.1465 12.8652C0.24425 12.963 0.372 13.0117 0.5 13.0117C0.628 13.0117 0.756 12.963 0.8535 12.8652L12 1.71872V12.5117C12 12.7877 12.224 13.0117 12.5 13.0117C12.776 13.0117 13 12.7877 13 12.5117V0.511719C13 0.235719 12.776 0.0117188 12.5 0.0117188Z"
                      fill="white"
                    />
                  </svg>
                </Link>

                <div className="shape">
                  <Image
                    src="/images/services/shape.png"
                    alt="image"
                    width={160}
                    height={135}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhyChooseUs />

      <KeyServices />

      <TrustedPartners />

      <Cta />
    </>
  );
}
