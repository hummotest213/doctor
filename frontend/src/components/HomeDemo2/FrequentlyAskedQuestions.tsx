"use client";

import React, { useState } from "react";
import Image from "next/image";

function FrequentlyAskedQuestions() {
  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "How do I book a virtual visit with a doctor?",
      answer: [
        "Booking is simple: sign up or log in to your Doutor account, select the doctor or specialty you need, and choose a time that fits your schedule.",
        "Many doctors are available for same-day appointments.",
      ],
    },
    {
      id: 2,
      question: "Can I use Doutor if I don't have insurance?",
      answer: [
        "Yes, you can. Doutor works with or without insurance. If you don’t have coverage, you can still book a visit and pay a flat, transparent fee directly.",
      ],
    },
    {
      id: 3,
      question: "What types of conditions can Doutor treat?",
      answer: [
        "Doutor doctors can help with common illnesses like colds, flu, infections, allergies, and skin issues, as well as ongoing conditions such as diabetes or hypertension.",
        "For emergencies, we recommend calling your local emergency services instead of using Doutor.",
      ],
    },
    {
      id: 4,
      question: "Will I receive a prescription after my consultation?",
      answer: [
        "If your doctor determines that medication is needed, they can send an electronic prescription directly to your preferred pharmacy after your virtual visit.",
      ],
    },
    {
      id: 5,
      question: "Is my health information safe and private?",
      answer: [
        "Yes. Doutor uses secure, HIPAA-compliant technology to protect your personal and medical information.",
        "Your data is encrypted and never shared without your consent.",
      ],
    },
    {
      id: 6,
      question: "Can I choose which doctor I see?",
      answer: [
        "Absolutely. You can browse available doctors by specialty, read their profiles, and select the provider you prefer for your appointment.",
      ],
    },
    {
      id: 7,
      question: "What devices can I use for my virtual visit?",
      answer: [
        "Doutor works on most devices including smartphones, tablets, laptops, and desktop computers.",
        "You just need a stable internet connection, a camera, and a microphone.",
      ],
    },
  ];

  // State to track which FAQ is open
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  // Toggle FAQ open/close
  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <>
      <div className="faq-area ptb-140 smoke-bg-color">
        <div className="container">
          <div className="section-title">
            <div
              className="left text-center"
              style={{
                maxWidth: "637px",
                margin: "auto",
              }}
            >
              <span className="sub wrap2">Frequently Asked Questions</span>
              <h2>Everything You Need to Know About Doutor</h2>
            </div>
          </div>
          <div className="row justify-content-center align-items-center g-4">
            <div className="col-xl-6 col-md-12">
              <div className="faq-wrap-image">
                <Image
                  src="/images/faq2.jpg"
                  alt="faq"
                  width={1050}
                  height={1400}
                />
              </div>
            </div>
            <div className="col-xl-6 col-md-12">
              <div className="faq-accordion">
                <div className="accordion">
                  {faqs.map((faq) => (
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
                          {faq.answer.map((paragraph, index) => (
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
        </div>
      </div>
    </>
  );
}

export default FrequentlyAskedQuestions;
