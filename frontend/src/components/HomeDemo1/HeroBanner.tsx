"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useHero } from "@/hooks/useAdminData";
import type { Hero } from "@/lib/api";

function HeroBanner() {
  const { t, language } = useLanguage();
  const { data: heroData, loading } = useHero(language);
  
  // Fallback to translations if backend data not available
  const hero: Hero = heroData && heroData.title ? {
    title: heroData.title || t("hero.title"),
    title_highlight: heroData.title_highlight || t("hero.titleHighlight"),
    description: heroData.description || t("hero.description"),
    doctor_image_url: heroData.doctor_image_url || "/images/doctor-image2.jpeg",
    members_treated_count: heroData.members_treated_count || 500,
    members_treated_label: heroData.members_treated_label || t("hero.membersTreated"),
    virtual_patients_count: heroData.virtual_patients_count || 500,
    virtual_patients_label: heroData.virtual_patients_label || t("hero.virtualPatients"),
    licensed_doctors_count: heroData.licensed_doctors_count || 15,
    licensed_doctors_label: heroData.licensed_doctors_label || t("hero.licensedDoctors"),
  } : {
    title: t("hero.title"),
    title_highlight: t("hero.titleHighlight"),
    description: t("hero.description"),
    doctor_image_url: "/images/doctor-image2.jpeg",
    members_treated_count: 500,
    members_treated_label: t("hero.membersTreated"),
    virtual_patients_count: 500,
    virtual_patients_label: t("hero.virtualPatients"),
    licensed_doctors_count: 15,
    licensed_doctors_label: t("hero.licensedDoctors"),
  };

  return (
    <>
      <div className="main-banner-area">
        <div className="container-fluid">
          <div className="row justify-content-center g-4">
            <div className="col-xxl-8 col-md-12">
              <div className="main-banner-content section-title-animation animation-style1">

                <h1 className="title-animation">
                  {hero.title} <br /><span>{hero.title_highlight}</span>{t("hero.titleEnd")}
                </h1>
                <p>
                  {hero.description}
                </p>

                <div className="banner-btn">
                  <Link href="/contact-us" className="default-btn">
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
                    <strong>{t("hero.registerButton")}</strong>{t("hero.registerFree")}
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

            <div className="col-xxl-4 col-md-12">
              <div className="main-banner-image">
                <div className="image">
                  <Image
                    src={hero.doctor_image_url || "/images/doctor-image2.jpeg"}
                    alt="banner"
                    width={1200}
                    height={1320}
                  />
                </div>

                <div className="fun-items">
                  <div className="fun">
                    <div className="d-flex align-items-center justify-content-center">
                      <h3 className="counter">{hero.members_treated_count}</h3>
                      <h3 className="sub">+</h3>
                    </div>
                    <span>{hero.members_treated_label || t("hero.membersTreated")}</span>
                  </div>

                  <div className="fun before-none">
                    <div className="d-flex align-items-center justify-content-center">
                      <h3 className="counter">{hero.virtual_patients_count}</h3>
                      <h3 className="sub">+</h3>
                    </div>
                    <span>{hero.virtual_patients_label || t("hero.virtualPatients")}</span>
                  </div>

                  {/* Shape Image */}
                  <div className="shape1">
                    <Image
                      src="/images/banner/shape1.png"
                      alt="shape1"
                      width={139}
                      height={86}
                    />
                  </div>
                  <div className="shape2">
                    <Image
                      src="/images/banner/shape2.png"
                      alt="shape2"
                      width={163}
                      height={164}
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

export default HeroBanner;
