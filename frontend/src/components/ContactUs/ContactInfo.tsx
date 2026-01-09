"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useContactInfo } from "@/hooks/useAdminData";

// Define the type for contact info items
type ContactInfoItem = {
  id: number;
  icon: string;
  title: string;
  content: string;
  link?: string;
  linkType?: "email" | "phone" | "none";
};

const ContactInfo = () => {
  const { t, language } = useLanguage();
  const { data: contactFromAPI, loading } = useContactInfo(language);

  // Build contact data from API or fallback to translations
  const contactData: ContactInfoItem[] = [
    {
      id: 1,
      icon: "/images/mail.svg",
      title: contactFromAPI?.email_label || t("contact.email.title"),
      content: contactFromAPI?.email || t("contact.email.content"),
      link: `mailto:${contactFromAPI?.email || t("contact.email.content")}`,
      linkType: "email",
    },
    {
      id: 2,
      icon: "/images/phone.svg",
      title: contactFromAPI?.phone_label || t("contact.phone.title"),
      content: contactFromAPI?.phone || t("contact.phone.content"),
      link: `tel:${contactFromAPI?.phone || t("contact.phone.content")}`,
      linkType: "phone",
    },
    {
      id: 3,
      icon: "/images/map.svg",
      title: contactFromAPI?.address_label || t("contact.office.title"),
      content: contactFromAPI?.address || t("contact.office.content"),
      linkType: "none",
    },
  ];

  // Function to render content based on link type
  const renderContent = (item: ContactInfoItem) => {
    if (item.linkType === "email") {
      return <a href={item.link}>{item.content}</a>;
    } else if (item.linkType === "phone") {
      return <a href={item.link}>{item.content}</a>;
    } else {
      return <strong>{item.content}</strong>;
    }
  };

  return (
    <>
      <div className="contact-info-area pt-140">
        {loading && (
          <div className="text-center py-5">
            <p className="text-muted">Loading contact information...</p>
          </div>
        )}
        
        <div className="container">
          <div className="row justify-content-center g-4">
            {contactData.map((item) => (
              <div key={item.id} className="col-lg-4 col-sm-6">
                <div className="contact-info-card">
                  <div className="icon">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={30}
                      height={30}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <div className="content">
                    <span>{item.title}</span>
                    {renderContent(item)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
