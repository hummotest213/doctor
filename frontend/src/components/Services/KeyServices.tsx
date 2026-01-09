import React from "react";
import Image from "next/image";

function KeyServices() {
  // Define the key services data
  const services = [
    {
      id: 1,
      iconSrc: "/images/key1.svg",
      title: "Patient-First Approach",
      description:
        "At Doutor, every decision we make begins with the patient in mind. We focus on delivering care that is not only clinically effective but also compassionate, accessible, and respectful of your time and privacy.",
    },
    {
      id: 2,
      iconSrc: "/images/key2.svg",
      title: "Trusted Professionals",
      description:
        "We partner only with certified, experienced medical providers. Whether it's general care, mental health, or specialty services, you'll always speak with real doctors who are qualified, and committed to your well-being.",
    },
    {
      id: 3,
      iconSrc: "/images/key3.svg",
      title: "Care Without Boundaries",
      description:
        "Geography shouldn't limit your access to healthcare. With Doutor, anyone with a device and an internet connection can connect to trusted doctors—no matter where they live, work, or travel.",
    },
  ];

  return (
    <>
      <div className="service-key-area pt-140">
        <div className="container">
          <div className="row justify-content-center g-4">
            {services.map((service) => (
              <div key={service.id} className="col-lg-4 col-md-6">
                <div className="service-key-card">
                  <div className="icon">
                    <Image
                      src={service.iconSrc}
                      alt={service.title}
                      width={60}
                      height={60}
                    />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default KeyServices;
