import React from "react";
import Image from "next/image";
import Link from "next/link";

function OurServices() {
  // Define the services data
  const services = [
    {
      id: 1,
      image: {
        src: "/images/services/service2.jpg",
        alt: "General Medical Care",
      },
      title: "General Medical Care",
      features: [
        "Cold, flu, fever, infections",
        "Allergies, rashes, minor injuries",
        "24/7 access to licensed doctors",
      ],
      description:
        "Get fast treatment for everyday health issues—no clinic visit required.",
      link: "/services/details",
    },
    {
      id: 2,
      image: {
        src: "/images/services/service3.jpg",
        alt: "Mental Health Support",
      },
      title: "Mental Health Support",
      features: [
        "Anxiety, depression, stress",
        "Licensed therapists & psychiatrists",
        "Secure and private video sessions",
      ],
      description:
        "Speak with mental health professionals from the comfort of home, whenever you need.",
      link: "/services/details",
    },
    {
      id: 3,
      image: {
        src: "/images/services/service4.jpg",
        alt: "Prescription Refills",
      },
      title: "Prescription Refills",
      features: [
        "Chronic medications",
        "Fast, secure renewals",
        "Sent directly to your pharmacy",
      ],
      description:
        "Easily renew prescriptions for ongoing care—no waiting rooms, no hassle.",
      link: "/services/details",
    },
  ];

  return (
    <>
      <div className="services-area pb-140">
        <div className="container">
          <div className="section-title">
            <div className="row justify-content-center align-items-center g-4">
              <div className="col-lg-6 col-md-12">
                <div className="left">
                  <span className="sub wrap2">Our Services</span>
                  <h2>Comprehensive Virtual Healthcare—Tailored to You</h2>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="right wrap2">
                  <Link href="/services" className="link-btn">
                    View All Services
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        d="M12.5 0H0.5C0.224 0 0 0.224 0 0.5C0 0.776 0.224 1 0.5 1H11.2928L0.1465 12.1465C-0.04875 12.3417 -0.04875 12.6583 0.1465 12.8535C0.24425 12.9513 0.372 13 0.5 13C0.628 13 0.756 12.9513 0.8535 12.8535L12 1.707V12.5C12 12.776 12.224 13 12.5 13C12.776 13 13 12.776 13 12.5V0.5C13 0.224 12.776 0 12.5 0Z"
                        fill="#336AEA"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center g-4">
            {services.map((service) => (
              <div key={service.id} className="col-xl-4 col-md-6">
                <div className="service-wrap-card">
                  <div className="image">
                    <Link href={service.link}>
                      <Image
                        src={service.image.src}
                        alt={service.image.alt}
                        width={692}
                        height={408}
                      />
                    </Link>
                  </div>
                  <div className="content">
                    <h3>
                      <Link href={service.link}>{service.title}</Link>
                    </h3>

                    <ul className="list">
                      {service.features.map((feature, index) => (
                        <li key={index}>
                          <i className="ri-check-line"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <p>{service.description}</p>

                    <div className="service-btn">
                      <Link href={service.link} className="default-btn">
                        <span className="left">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M11.5385 0H0.461538C0.206769 0 0 0.206769 0 0.461538C0 0.716308 0.206769 0.923077 0.461538 0.923077H10.4241L0.135231 11.2122C-0.045 11.3924 -0.045 11.6845 0.135231 11.8648C0.225462 11.955 0.343385 12 0.461538 12C0.579692 12 0.697846 11.955 0.787846 11.8648L11.0769 1.57569V11.5385C11.0769 11.7932 11.2837 12 11.5385 12C11.7932 12 12 11.7932 12 11.5385V0.461538C12 0.206769 11.7932 0 11.5385 0Z"
                              fill="#336AEA"
                            />
                          </svg>
                        </span>
                        Learn More
                        <span className="right">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M11.5385 0H0.461538C0.206769 0 0 0.206769 0 0.461538C0 0.716308 0.206769 0.923077 0.461538 0.923077H10.4241L0.135231 11.2122C-0.045 11.3924 -0.045 11.6845 0.135231 11.8648C0.225462 11.955 0.343385 12 0.461538 12C0.579692 12 0.697846 11.955 0.787846 11.8648L11.0769 1.57569V11.5385C11.0769 11.7932 11.2837 12 11.5385 12C11.7932 12 12 11.7932 12 11.5385V0.461538C12 0.206769 11.7932 0 11.5385 0Z"
                              fill="#336AEA"
                            />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OurServices;
