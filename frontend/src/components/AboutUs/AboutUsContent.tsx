"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useAbout } from "@/hooks/useAdminData";

interface Statistic {
  suffix: string;
  description: string;
  numbers: string[];
}

const AboutUsContent = () => {
  const { t, language } = useLanguage();
  const { data: aboutDataAPI } = useAbout(language);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parse numbers from database string (e.g., "15" -> ["15"])
  const parseNumbers = (str: string | undefined): string[] => {
    if (!str) return [];
    return [str];
  };

  const aboutData = {
    title: {
      subtitle: aboutDataAPI?.subtitle || t("about.subtitle"),
      title: aboutDataAPI?.title || t("about.title"),
      description: aboutDataAPI?.description || t("about.description"),
    },
    content: {
      image: {
        src: aboutDataAPI?.image_url || "/images/doctor-image.jpeg",
        alt: "Doctor Image",
      },
      paragraphs: [
        aboutDataAPI?.paragraph1 || (Array.isArray(t("about.paragraphs")) ? (t("about.paragraphs") as string[])[0] : ""),
        aboutDataAPI?.paragraph2 || (Array.isArray(t("about.paragraphs")) ? (t("about.paragraphs") as string[])[1] : ""),
      ].filter(p => p),
    },
    statistics: [
      {
        numbers: parseNumbers(aboutDataAPI?.statistic1_numbers) || ["15"],
        suffix: aboutDataAPI?.statistic1_suffix || "+",
        description: aboutDataAPI?.statistic1_description || "İllik Təcrübə",
      },
      {
        numbers: parseNumbers(aboutDataAPI?.statistic2_numbers) || ["200"],
        suffix: aboutDataAPI?.statistic2_suffix || "+",
        description: aboutDataAPI?.statistic2_description || "Uğurlu Əməliyyat",
      },
      {
        numbers: parseNumbers(aboutDataAPI?.statistic3_numbers) || ["500"],
        suffix: aboutDataAPI?.statistic3_suffix || "+",
        description: aboutDataAPI?.statistic3_description || "Müayinə Olunan Pasient",
      },
    ] as Statistic[],
  };

  if (!mounted) return null;

  return (
    <div className="about-area ptb-140">
      <div className="container">
        {/* Title Section */}
        <div className="section-title mb-5">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="left">
                <span className="sub">{aboutData.title.subtitle}</span>
                <h1 className="text-white">{aboutData.title.title}</h1>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="right">
                <p className="text-white" style={{ fontSize: '1.2rem' }}>{aboutData.title.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section - The Gap Fix is Here */}
        <div className="row align-items-start justify-content-between">
          <div className="col-lg-5 col-md-12">
            <div className="about-image">
              <Image
                src={aboutData.content.image.src}
                alt={aboutData.content.image.alt}
                width={550} // Increased width to fill the column better
                height={650}
                priority
                className="img-fluid" // Ensures image stays inside the col
                style={{ 
                  borderRadius: '24px', 
                  objectFit: 'cover',
                  width: '100%', // Makes image fill the 5-column width
                  height: 'auto' 
                }}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-12"> 
            {/* Added a bit of padding-left (ps-lg-4) to create a clean but small gap */}
            <div className="about-content ps-lg-4 text-white">
              {aboutData.content.paragraphs.map((paragraph: string, index: number) => (
                <p 
                    key={index} 
                    className={`mb-4 ${index === 1 ? "border-start ps-3" : ""}`}
                    style={{ fontSize: '1.rem', lineHeight: '1.8' }}
                    
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="about-fun-inner mt-5">
          <div className="d-lg-flex d-md-flex justify-content-between" style={{ gap: "20px" }}>
            {aboutData.statistics.map((stat: Statistic, index: number) => (
              <div key={index} className="custom-grid">
                <div className="fun">
                  <div className="d-flex align-items-center">
                    {stat.numbers.map((num: string, numIndex: number) => (
                      <h3 key={numIndex} className="counter text-white">{num}</h3>
                    ))}
                    {stat.suffix && <h3 className="sub text-white">{stat.suffix}</h3>}
                  </div>
                  <span className="text-white-50">{stat.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContent;