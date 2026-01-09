"use client";

import React from "react";
import Link from "next/link";
import { handleAppointment } from "@/actions/appointment";
import { useLanguage } from "@/context/LanguageContext";

const BookAnAppointmentForm = () => {
  const { t } = useLanguage();

  return (
    <>
      <div className="appointment-area ptb-140">
        <div className="container">
          <div
            className="appointment-form-inner"
            data-cues="slideInUp"
            data-duration="1000"
          >
            <div className="content">
              <h2>{t("appointment.title")}</h2>
              <p>{t("appointment.subtitle")}</p>
            </div>
            
            <form action={handleAppointment}>
              <div className="form-group">
                <label>{t("appointment.form.name")}</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder={t("appointment.form.namePlaceholder")}
                />
              </div>
              <div className="form-group">
                <label>{t("appointment.form.email")}</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder={t("appointment.form.emailPlaceholder")}
                />
              </div>
              <div className="form-group">
                <label>{t("appointment.form.phone")}</label>
                <input
                  type="number"
                  name="phone"
                  className="form-control"
                  placeholder={t("appointment.form.phonePlaceholder")}
                />
              </div>
              <div className="form-group">
                <label>{t("appointment.form.service")}</label>
                <select className="form-control form-select" name="service">
                  <option value="0">{t("appointment.form.servicePlaceholder")}</option>
                  <option value="1">{t("appointment.form.services.general")}</option>
                  <option value="2">{t("appointment.form.services.healthInsurance")}</option>
                  <option value="3">{t("appointment.form.services.lifeInsurance")}</option>
                </select>
              </div>
              <div className="form-group">
                <label>{t("appointment.form.date")}</label>
                <input
                  type="text"
                  name="date"
                  className="form-control"
                  placeholder={t("appointment.form.datePlaceholder")}
                />
              </div>
              <div className="form-group">
                <label>{t("appointment.form.time")}</label>
                <input
                  type="text"
                  name="time"
                  className="form-control"
                  placeholder={t("appointment.form.timePlaceholder")}
                />
              </div>
              <div className="form-group">
                <label>{t("appointment.form.doctor")}</label>
                <input
                  type="text"
                  name="doctor"
                  className="form-control"
                  placeholder={t("appointment.form.doctorPlaceholder")}
                />
              </div>
              <div className="form-group">
                <label>{t("appointment.form.notes")}</label>
                <textarea
                  name="notes"
                  className="form-control"
                  placeholder={t("appointment.form.notesPlaceholder")}
                ></textarea>
              </div>
              <div className="form-group">
                
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
                {t("appointment.form.submit")}
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
    </>
  );
};

export default BookAnAppointmentForm;
