"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const FrequentlyAskedQuestions = () => {
  const { t } = useLanguage();

  // FAQ data
  const rawFaqs = Array.isArray(t("faq.questions")) ? t("faq.questions") : [];
  const faqs = rawFaqs.map((faq: any, index: number) => ({
    id: index + 1,
    question: faq.question,
    answer: Array.isArray(faq.answer) ? faq.answer : [faq.answer]
  }));

  // State to track which FAQ is open
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  // Toggle FAQ open/close
  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <>
      <div className="faq-area ptb-140">
        <div className="container">
          <div className="section-title">
            <div
              className="left text-center"
              style={{
                maxWidth: "637px",
                margin: "auto",
              }}
            >
              <span className="sub wrap2">{t("faq.subtitle")}</span>
              <h2>{t("faq.title")}</h2>
            </div>
          </div>

          <div className="faq-accordion wrap-style2">
            <div className="accordion">
              {faqs.map((faq: any) => (
                <div key={faq.id} className="accordion-item wrap2">
                  <button
                    className={`accordion-button ${
                      openFaqId !== faq.id ? "collapsed" : ""
                    }`}
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    {faq.question}
                  </button>
                  <div
                    className={`accordion-collapse collapse ${
                      openFaqId === faq.id ? "show" : ""
                    }`}
                  >
                    <div className="accordion-body">
                      {faq.answer.map((paragraph: string, index: number) => (
                        <p key={index}>{paragraph}</p>
                      ))}
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
};

export default FrequentlyAskedQuestions;
