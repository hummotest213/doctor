"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useServices, useHero } from "@/hooks/useAdminData";

function OurServices() {
  const { t, language } = useLanguage();
  const { data: servicesFromAPI = [], loading } = useServices(language);
  const { data: heroData } = useHero(language);

  // Unified data for the large image section
  const largeImageData = {
    backgroundImage: heroData?.doctor_image_url || "/images/doctor-image3.jpeg",
    layerImage: "/images/services/layer.svg",
    descriptionKey: "services.exploreMore",
    link: {
      href: "/services",
      textKey: "services.viewMore",
    },
    shapeImage: "/images/services/shape.png",
  };

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
      icon_url: "/images/icons/service5.svg",
      title: t("services.generalCare.chemoFollowUp.title"),
      description: t("services.generalCare.chemoFollowUp.description"),
      features: t("services.generalCare.chemoFollowUp.features") || [],
    },
    {
      id: 6,
      icon_url: "/images/icons/service6.svg",
      title: t("services.generalCare.hormonalSupport.title"),
      description: t("services.generalCare.hormonalSupport.description"),
      features: t("services.generalCare.hormonalSupport.features") || [],
    },
  ];

  return (
    <section className="services-area ptb-140">
      <div className="container">
        {/* Section Header */}
        <div className="section-title mb-5">
          <div className="row justify-content-center align-items-center g-4">
            <div className="col-lg-7 col-md-12">
              <div className="left">
                <span className="sub-title text-primary fw-medium mb-2 d-block">
                  {t("services.subtitle")}
                </span>
                <h2 className="display-5 fw-bold">{t("services.title")}</h2>
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="right">
                <p className="text-muted mb-0">{t("services.description")}</p>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-5">
            <p className="text-muted">Loading services...</p>
          </div>
        )}

        <div className="row justify-content-center g-4">
          {/* Service Cards Mapping */}
          {servicesData.map((service) => (
            <div key={service.id} className="col-xl-3 col-md-6">
              <div className="service-card h-100 shadow-sm p-4 bg-white rounded-4">
                <div className="top">
                  <div className="icon mb-3">
                    <Image
                      src={service.icon_url || "/images/icons/service1.svg"}
                      alt={service.title}
                      width={60}
                      height={60}
                      className="img-fluid"
                    />
                  </div>
                  <h3 className="h5 fw-bold mb-3 text-decoration-none text-dark">
                    {service.title}
                  </h3>
                  <p className="small text-muted">{service.description}</p>
                </div>
                
                <div className="bottom mt-4">
                  <ul className="list-unstyled mb-4">
                    {Array.isArray(service.features) && service.features.length > 0 ? (
                      service.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="d-flex align-items-start mb-2">
                          <i className="ri-check-line text-primary me-2"></i>
                          <span className="small">{feature}</span>
                        </li>
                      ))
                    ) : null}
                  </ul>
                  
                  <div className="service-btn">
                    <Link href={`/book-an-appointment`} className="btn btn-link p-0 text-decoration-none d-inline-flex align-items-center gap-2">
                      <span className="icon-wrap bg-light rounded-circle p-2">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M11.5385 0H0.461538C0.206769 0 0 0.206769 0 0.461538C0 0.716308 0.206769 0.923077 0.461538 0.923077H10.4241L0.135231 11.2122C-0.045 11.3924 -0.045 11.6845 0.135231 11.8648C0.225462 11.955 0.343385 12 0.461538 12C0.579692 12 0.697846 11.955 0.787846 11.8648L11.0769 1.57569V11.5385C11.0769 11.7932 11.2837 12 11.5385 12C11.7932 12 12 11.7932 12 11.5385V0.461538C12 0.206769 11.7932 0 11.5385 0Z" fill="#336AEA"/>
                        </svg>
                      </span>
                      <span className="fw-semibold small">{t("services.learnMore")}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Large Image Card */}
          <div className="col-xl-6 col-md-12">
            <div
              className="services-large-image h-100 position-relative d-flex align-items-end p-5"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${largeImageData.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '24px',
                minHeight: '450px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div className="content text-white">
                <p className="mb-3 text-white">{t(largeImageData.descriptionKey)}</p>
                <Link href={largeImageData.link.href} className="btn btn-light rounded-pill px-4">
                  {t(largeImageData.link.textKey)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurServices;