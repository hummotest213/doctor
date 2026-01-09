"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const QuickAccessPanel = () => {
  // Define the features data
  const features = [
    {
      id: 1,
      iconSrc: "/images/features/icon1.svg",
      title: "General Medical",
      description:
        "Feeling sick or have non-emergency symptoms like cold, flu, or allergies? Our doctors are available 24/7 to provide quick answers, prescriptions, and peace of mind.",
      buttonText: "Book Now",
    },
    {
      id: 2,
      iconSrc: "/images/features/icon2.svg",
      title: "Mental Health",
      description:
        "Struggling with stress, anxiety, or burnout? Speak privately with licensed therapists or psychiatrists from the comfort of your home—no judgment, just support.",
      buttonText: "Start Therapy",
    },
    {
      id: 3,
      iconSrc: "/images/features/icon3.svg",
      title: "Prescription Refills",
      description:
        "Running low on medication? Get fast, secure refills without leaving the house. Our doctors can review, renew, and send your prescription to your pharmacy.",
      buttonText: "Refill Fast",
    },
  ];

  return (
    <>
      <div className="features-area">
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-lg-8 col-md-12">
              <div
                className="features-inner"
                style={{
                  backgroundImage: "url(/images/features/features.jpg)",
                }}
              >
                <Swiper
                  slidesPerView={1}
                  autoHeight={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="features-slider"
                >
                  {features.map((feature) => (
                    <SwiperSlide key={feature.id}>
                      <div className="features-card">
                        <div className="icon">
                          <Image
                            src={feature.iconSrc}
                            alt={feature.title}
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="content">
                          <h3>{feature.title}</h3>
                          <p>{feature.description}</p>

                          <div className="features-btn">
                            <Link
                              href="/book-an-appointment"
                              className="default-btn"
                            >
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
                                    fill="white"
                                  />
                                </svg>
                              </span>
                              {feature.buttonText}
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
                                    fill="white"
                                  />
                                </svg>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-12">
              <div className="features-right-card">
                <div className="layer">
                  <Image
                    src="/images/features/layer.png"
                    alt="layer"
                    width={60}
                    height={66}
                  />
                </div>
                <div className="content">
                  <span className="sub">Quick Access Panel</span>
                  <h2>
                    Get the Care You Need—Faster Than Ever
                  </h2>
                </div>
                <Link href="/register" className="link-btn">
                  <strong>Register Now </strong>- It&apos;s Free
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                  >
                    <path
                      d="M12.5 0H0.5C0.224 0 0 0.224 0 0.5C0 0.776 0.224 1 0.5 1H11.2928L0.1465 12.1465C-0.04875 12.3417 -0.04875 12.6583 0.1465 12.8535C0.24425 12.9513 0.372 13 0.5 13C0.628 13 0.756 12.9513 0.8535 12.8535L12 1.707V12.5C12 12.776 12.224 13 12.5 13C12.776 13 13 12.776 13 12.5V0.5C13 0.224 12.776 0 12.5 0Z"
                      fill="white"
                    />
                  </svg>
                </Link>
                <div className="shape-wrap">
                  <Image
                    src="/images/features/shape.png"
                    alt="shape"
                    width={160}
                    height={135}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickAccessPanel;
