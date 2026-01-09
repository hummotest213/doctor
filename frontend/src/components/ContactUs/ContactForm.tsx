"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { handleContact } from "@/actions/contact";
import { useLanguage } from "@/context/LanguageContext";

const ContactForm = () => {
  const { t } = useLanguage();

  return (
    <>
      <div className="contact-us-area pb-140">
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-lg-6 col-md-12">
              <div
                className="contact-us-image"
                style={{
                  backgroundImage: "url(/images/doctor-image2.jpeg)",
                }}
              >
                <div className="wrap-content">
                  <div className="left">
                    <div className="icon">
                      <Image
                        src="/images/live.svg"
                        alt="live"
                        width={63}
                        height={63}
                      />
                    </div>
                    <div className="title">
                      <h3>{t("contact.liveChat.title")}</h3>
                      <p>{t("contact.liveChat.text")}</p>
                    </div>
                  </div>
                  <div className="right">
                    <Link href="/login" className="link-btn">
                      {t("contact.liveChat.button")}
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

            <div className="col-lg-6 col-md-12">
              <div className="contact-us-form">
                <div className="content">
                  <h2>{t("contact.form.title")}</h2>
                  <p>{t("contact.form.text")}</p>
                </div>

                <form action={handleContact}>
                  <div className="form-group">
                    <label>{t("contact.form.name")}</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder={t("contact.form.namePlaceholder")}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>{t("contact.form.email")}</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder={t("contact.form.emailPlaceholder")}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>{t("contact.form.subject")}</label>
                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      placeholder={t("contact.form.subjectPlaceholder")}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>{t("contact.form.phone")}</label>
                    <input
                      type="text"
                      name="number"
                      className="form-control"
                      placeholder={t("contact.form.phonePlaceholder")}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>{t("contact.form.message")}</label>
                    <textarea
                      name="text"
                      cols={30}
                      rows={6}
                      className="form-control"
                      placeholder={t("contact.form.messagePlaceholder")}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="default-btn">
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
                    {t("contact.form.submit")}
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
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
