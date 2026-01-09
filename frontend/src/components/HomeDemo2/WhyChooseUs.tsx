import React from "react";
import Image from "next/image";

function WhyChooseUs() {
  // Define the reasons data
  const reasons = [
    {
      id: 1,
      iconSrc: "/images/icons/check.svg",
      iconAlt: "check",
      title: "500+ Licensed Doctors",
      description:
        "Every Doutor visit connects you with a certified medical professional—no chatbots.",
    },
    {
      id: 2,
      iconSrc: "/images/icons/check.svg",
      iconAlt: "check",
      title: "8.2 M+ Virtual Consultations Completed",
      description:
        "Our experience speaks for itself. From urgent care to therapy, Doutor has successfully completed over a million secure video sessions.",
    },
  ];

  return (
    <>
      <div
        className="choose-us-area"
        style={{
          backgroundImage: `url(/images/choose-bg.jpg)`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <div className="choose-us-content">
            <div className="content">
              <span className="sub">Why Choose Us</span>
              <h2>Why Choose Doutor for Your Healthcare Needs?</h2>
            </div>
            <div className="items">
              {reasons.map((reason) => (
                <div key={reason.id} className="item">
                  <div className="icon">
                    <Image
                      src={reason.iconSrc}
                      alt={reason.iconAlt}
                      width={43}
                      height={43}
                    />
                  </div>
                  <div className="title">
                    <h3>{reason.title}</h3>
                    <p>{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhyChooseUs;
