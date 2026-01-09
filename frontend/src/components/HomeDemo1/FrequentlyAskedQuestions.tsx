"use client";

import React, { useState } from "react";

import { useLanguage } from "@/context/LanguageContext";

const FrequentlyAskedQuestions = () => {
  const { t } = useLanguage();
  // State to track which accordion item is open
  const [openIndex, setOpenIndex] = useState<number>(0);

  // FAQ data
  const faqData = Array.isArray(t("faq.questions")) ? t("faq.questions") : [];

  // Toggle accordion item
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <>
      <div className="faq-area pb-140">
        <div className="container">
          <div className="section-title">
            <div className="row justify-content-center align-items-center g-4">
              <div className="col-lg-7 col-md-12">
                <div className="left">
                  <span className="sub">{t("faq.subtitle")}</span>
                  <h2>{t("faq.title")}</h2>
                </div>
              </div>
              <div className="col-lg-5 col-md-12">
                <div className="right">
                  <p>{t("faq.description")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center g-4">
            <div className="col-lg-6 col-md-12">
              <div
                className="faq-image"
                style={{ backgroundImage: "url(/images/faq.jpg)" }}
              ></div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="faq-accordion">
                <div className="accordion">
                  {faqData.map((item: any, index: number) => (
                    <div key={index} className="accordion-item">
                      <button
                        className={`accordion-button ${
                          openIndex === index ? "" : "collapsed"
                        }`}
                        type="button"
                        onClick={() => toggleAccordion(index)}
                      >
                        {item.question}
                      </button>
                      <div
                        className={`accordion-collapse collapse ${
                          openIndex === index ? "show" : ""
                        }`}
                      >
                        <div className="accordion-body">
                           {Array.isArray(item.answer) ? (
                            item.answer.map((p: string, pIndex: number) => (
                              <p key={pIndex}>{p}</p>
                            ))
                          ) : (
                            <p>{item.answer}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrequentlyAskedQuestions;
