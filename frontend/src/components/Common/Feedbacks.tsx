"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useFeedbacks } from "@/hooks/useAdminData";
import type { Feedback as FeedbackType } from "@/lib/api";

const Feedbacks = () => {
  const { t } = useLanguage();
  const { data: feedbacksFromAPI = [], loading } = useFeedbacks();

  // Fallback to translation-based feedbacks if API data is empty
  const fallbackFeedbacks: FeedbackType[] = [
    {
      id: 1,
      name: t("feedback.testimonials.0.name"),
      location: t("feedback.testimonials.0.location"),
      rating: 4.5,
      text: t("feedback.testimonials.0.text"),
      image_url: "/images/users/user2.png",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: t("feedback.testimonials.1.name"),
      location: t("feedback.testimonials.1.location"),
      rating: 4.5,
      text: t("feedback.testimonials.1.text"),
      image_url: "/images/users/user2.png",
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: t("feedback.testimonials.2.name"),
      location: t("feedback.testimonials.2.location"),
      rating: 4.5,
      text: t("feedback.testimonials.2.text"),
      image_url: "/images/users/user2.png",
      created_at: new Date().toISOString(),
    },
  ];

  const feedbacks = feedbacksFromAPI && feedbacksFromAPI.length > 0 ? feedbacksFromAPI : fallbackFeedbacks;

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 >= 0.5;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <li key={i}>
            <i className="ri-star-s-fill"></i>
          </li>
        ))}
        {hasHalfStar && (
          <li>
            <i className="ri-star-half-s-fill"></i>
          </li>
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <li key={i + fullStars}>
            <i className="ri-star-line"></i>
          </li>
        ))}
      </>
    );
  };

  const getWrapClass = (index: number): string => {
    const wrapClasses = ["wrap1", "wrap2", "wrap3"];
    return wrapClasses[index % wrapClasses.length];
  };

  return (
    <>
      <div className="feedback-area ptb-140">
        <div className="container">
          <div className="section-title">
            <div className="row justify-content-center align-items-center g-4">
              <div className="col-lg-6 col-md-12">
                <div className="left">
                  <span className="sub wrap2">{t("feedback.subtitle")}</span>
                  <h2>{t("feedback.title")}</h2>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                {/* Updated container to push content to the right */}
                <div className="right wrap2" style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
                  <a 
                    href="https://maps.app.goo.gl/btCTrckNsUkSm7fE6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="google-reviews-summary mb-5" 
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '15px', 
                        textDecoration: 'none', 
                        color: 'inherit',
                        cursor: 'pointer' 
                    }}
                  >
                    <div className="google-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1' }}>Google Reviews</div>
                      <div className="d-flex align-items-center" style={{ gap: '8px', justifyContent: 'flex-end' }}>
                        <span style={{ fontWeight: '700', color: '#f39c12' }}>4.6 / 5</span>
                        <ul className="list d-flex p-0 m-0" style={{ listStyle: 'none', color: '#f39c12', fontSize: '14px' }}>
                          {renderStars(4.6)}
                        </ul>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-5">
              <p className="text-muted">Loading testimonials...</p>
            </div>
          )}

          <div className="row justify-content-around g-12 feedback-items">
            {feedbacks.map((feedback, index) => (
              <div key={feedback.id} className="col-xl-3 col-md-6">
                <div className={`feedback-card ${getWrapClass(index)}`}>
                  <div className="info">
                    <div className="image">
                      <Image
                        src={feedback.image_url || "/images/users/user2.png"}
                        alt={feedback.name}
                        width={46}
                        height={46}
                      />
                    </div>
                    <div className="title">
                      <h4>{feedback.name}</h4>
                      <span>— {feedback.location || "Patient"}</span>
                    </div>
                  </div>
                  <ul className="list">{renderStars(feedback.rating || 5)}</ul>
                  <p>{feedback.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedbacks;