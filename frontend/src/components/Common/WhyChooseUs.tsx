import React from "react";
import Image from "next/image";
import Link from "next/link";

const WhyChooseUs = () => {
  // Define the reasons data
  const reasons = [
    {
      id: 1,
      title: "Certified, Experienced Doctors",
      description:
        "Connect only with licensed professionals who are thoroughly vetted, compassionate, and experts in their fields",
    },
    {
      id: 2,
      title: "Insurance or No Insurance",
      description:
        "Use your existing insurance or pay a transparent flat fee. We believe healthcare should fit your financial situation—not complicate it.",
    },
    {
      id: 3,
      title: "100% Private & Secure",
      description:
        "Your health data stays safe with end-to-end encryption and full HIPAA compliance. We prioritize your privacy at every step.",
    },
  ];

  return (
    <>
      <div className="third-choose-area ptb-140">
        <div className="container">
          <div className="third-choose-inner">
            <div className="row justify-content-center g-4">
              <div className="col-xl-7 col-md-12">
                <div className="third-choose-content">
                  <div className="content">
                    <span className="sub wrap2">Why Choose Us</span>
                    <h2>Why Choose Doutor for Your Healthcare Needs?</h2>
                  </div>

                  <div className="items">
                    {reasons.map((reason) => (
                      <div key={reason.id} className="item">
                        <div className="icon">
                          <Image
                            src="/images/icons/check2.svg"
                            alt="check"
                            width="30"
                            height="30"
                          />
                        </div>
                        <div className="title">
                          <h3>{reason.title}</h3>
                          <p>{reason.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="choose-btn">
                    <Link href="/about-us" className="default-btn">
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
                      Learn More
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

              <div className="col-xl-5 col-md-12">
                <div
                  className="third-choose-image"
                  style={{
                    backgroundImage: "url(/images/choose.jpg)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
