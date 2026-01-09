import React from "react";
import Image from "next/image";
import Link from "next/link";

const InsuranceInformation = () => {
  // Dynamic data object
  const insuranceData = {
    sectionTitle: "Insurance Information",
    mainTitle: "Covered by Most Major Insurance Plans",
    image: {
      src: "/images/insurance1.jpg",
      alt: "Insurance coverage illustration",
    },
    providers: {
      heading: "Accepted Providers:",
      list: "Aetna, Cigna, UnitedHealthcare, Blue Cross, Humana, Medicare, and more",
    },
    howItWorks: {
      heading: "How It Works:",
      steps: [
        "Check your plan during registration",
        "Co-pay displayed before booking",
        "Use HSA / FSA cards",
        "Most plans cover general care & mental health",
      ],
    },
    button: {
      link: "/login",
      text: "Check Your Coverage",
    },
  };

  return (
    <>
      <div className="insurance-information-area pb-140">
        <div className="container">
          <div className="insurance-information-inner">
            <div className="section-title">
              <div
                className="left text-center"
                style={{ maxWidth: "745px", margin: "auto" }}
              >
                <span className="sub">{insuranceData.sectionTitle}</span>
                <h2>{insuranceData.mainTitle}</h2>
              </div>
            </div>

            <div className="row justify-content-center align-items-center g-4">
              <div className="col-lg-6 col-md-12">
                <div className="insurance-information-image">
                  <Image
                    src={insuranceData.image.src}
                    alt={insuranceData.image.alt}
                    width={1052}
                    height={1190}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="insurance-information-content">
                  <h3>{insuranceData.providers.heading}</h3>
                  <p>{insuranceData.providers.list}</p>

                  <div className="inner">
                    <h3>{insuranceData.howItWorks.heading}</h3>
                    <ul className="list">
                      {insuranceData.howItWorks.steps.map((step, index) => (
                        <li key={index}>
                          <Image
                            src="/images/check.svg"
                            alt="check"
                            width={16}
                            height={12}
                          />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="insurance-btn">
                    <Link
                      href={insuranceData.button.link}
                      className="default-btn"
                    >
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
                      {insuranceData.button.text}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsuranceInformation;
