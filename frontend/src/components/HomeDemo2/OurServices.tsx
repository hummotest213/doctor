"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

function OurServices() {
  const { t } = useLanguage();

  // Dynamic data for services
  // Mapping the keys from the JSON "services.generalCare" object to the component structure
  const servicesKeys = [
    { key: "cancerScreening", icon: "/images/icons/service1.svg" },
    { key: "surgicalOncology", icon: "/images/icons/service2.svg" },
    { key: "cervicalHealth", icon: "/images/icons/service3.svg" },
    { key: "ovarianAndUterineCare", icon: "/images/icons/service4.svg" },
    { key: "chemoFollowUp", icon: "/images/icons/service1.svg" },
    { key: "hormonalSupport", icon: "/images/icons/service2.svg" },
  ];

  const servicesData = servicesKeys.map((item, index) => {
    // Safely retrieving array features.
    const features = t(`services.generalCare.${item.key}.features`);

    return {
      id: index + 1,
      icon: item.icon,
      title: t(`services.generalCare.${item.key}.title`),
      description: t(`services.generalCare.${item.key}.description`),
      features: Array.isArray(features) ? features : [],
      link: "/services",
    };
  });

  return (
    <>
      <div className="services-area smoke-bg-color">
        <div className="inner ptb-140">
          <div className="container">
            <div className="section-title">
              <div className="row justify-content-center align-items-center g-4">
                <div className="col-lg-7 col-md-12">
                  <div className="left">
                    <span className="sub">{t("services.subtitle")}</span>
                    <h2 className="text-white">
                      {t("services.title")}
                    </h2>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12">
                  <div className="right wrap3">
                    <Link href="/services" className="link-btn">
                      {t("services.viewMore")}
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
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center g-4">
              {servicesData.map((service, index) => (
                <div key={index} className="col-xl-4 col-md-6">
                  <div className="service-card wrap2">
                    <div className="top">
                      <div className="icon">
                        <Image
                          src={service.icon}
                          alt="icon"
                          width={60}
                          height={60}
                        />
                      </div>
                      <h3>
                        <Link href={service.link}>{service.title}</Link>
                      </h3>
                      <p>{service.description}</p>
                    </div>
                    <div className="bottom">
                      <ul className="list">
                        {service.features.map((feature: any, featureIndex: number) => (
                          <li key={featureIndex}>
                            <i className="ri-check-line"></i>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurServices;
