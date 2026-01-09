"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useServices, useHero } from "@/hooks/useAdminData";

function ServicesLists() {
  const { t, language } = useLanguage();
  const { data: servicesFromAPI = [], loading } = useServices(language);
  const { data: heroData } = useHero(language);

  // Use API data if available, otherwise fall back to static data
  const servicesData = servicesFromAPI && servicesFromAPI.length > 0 ? servicesFromAPI : [
    {
      id: 1,
      icon_url: "/images/icons/service1.svg",
      title: t("services.generalCare.cancerScreening.title"),
      description: t("services.generalCare.cancerScreening.description"),
      features: t("services.generalCare.cancerScreening.features") || [],
    },
    {
      id: 2,
      icon_url: "/images/icons/service2.svg",
      title: t("services.generalCare.surgicalOncology.title"),
      description: t("services.generalCare.surgicalOncology.description"),
      features: t("services.generalCare.surgicalOncology.features") || [],
    },
    {
      id: 3,
      icon_url: "/images/icons/service3.svg",
      title: t("services.generalCare.cervicalHealth.title"),
      description: t("services.generalCare.cervicalHealth.description"),
      features: t("services.generalCare.cervicalHealth.features") || [],
    },
    {
      id: 4,
      icon_url: "/images/icons/service4.svg",
      title: t("services.generalCare.ovarianAndUterineCare.title"),
      description: t("services.generalCare.ovarianAndUterineCare.description"),
      features: t("services.generalCare.ovarianAndUterineCare.features") || [],
    },
    {
      id: 5,
      icon_url: "/images/icons/service1.svg",
      title: t("services.generalCare.chemoFollowUp.title"),
      description: t("services.generalCare.chemoFollowUp.description"),
      features: t("services.generalCare.chemoFollowUp.features") || [],
    },
    {
      id: 6,
      icon_url: "/images/icons/service2.svg",
      title: t("services.generalCare.hormonalSupport.title"),
      description: t("services.generalCare.hormonalSupport.description"),
      features: t("services.generalCare.hormonalSupport.features") || [],
    },
  ];

  // Unified data for the large image section
  const largeImageData = {
    backgroundImage: heroData?.doctor_image_url || "/images/doctor-image3.jpeg",
    layerImage: "/images/services/layer.svg",
    description: t("hero.description") || "Experience Virtual Care Today",
    link: {
      href: "/book-an-appointment",
      text: t("nav.bookAppointment"),
    },
    shapeImage: "/images/services/shape.png",
  };

  return (
    <>
      <div className="services-area ptb-140">
        <div className="container">
          <div className="row justify-content-center g-4">
            {servicesData.map((service, index) => (
              <div key={index} className="col-xl-3 col-md-6">
                <div className="service-card">
                  <div className="top">
                    <div className="icon">
                      <Image
                        src={service.icon_url || "/images/icons/service1.svg"}
                        alt="icon"
                        width={60}
                        height={60}
                      />
                    </div>
                    <h3>
                      <h1>{service.title}</h1>
                    </h3>
                    <p>{service.description}</p>
                  </div>
                  <div className="bottom">
                    <ul className="list">
                      {Array.isArray(service.features) && service.features.length > 0 ? (
                        service.features.map((feature: any, featureIndex: number) => (
                          <li key={featureIndex}>
                            <i className="ri-check-line"></i>
                            <span>{feature}</span>
                          </li>
                        ))
                      ) : null}
                    </ul>
                    <div className="service-btn">
                      <Link href="/book-an-appointment" className="default-btn">
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
                        {t("services.learnMore")}
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

            <div className="col-xl-6 col-md-12">
              <div
                className="services-large-image"
                style={{
                  backgroundImage: `url(${largeImageData.backgroundImage})`,
                }}
              >
                <div className="wrap-content">
                  <div className="image">
                    <Image
                      src={largeImageData.layerImage}
                      alt="layer"
                      width={60}
                      height={67}
                    />
                  </div>
                  <p>{largeImageData.description}</p>
                  <Link href={largeImageData.link.href} className="link-btn">
                    {largeImageData.link.text}
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
                      src={largeImageData.shapeImage}
                      alt="shape"
                      width={159}
                      height={135}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesLists;
