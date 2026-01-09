"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Define types for our data
interface FeedbackItem {
  id: number;
  rating: number;
  comment: string;
  patientName: string;
  location: string;
  image: string;
}

interface FeedbackStats {
  satisfactionRate: number;
  reviewCount: string;
  platform: string;
  platformImage: string;
}

interface PatientsFeedbacksProps {
  feedbacks?: FeedbackItem[];
  stats?: FeedbackStats;
}

function PatientsFeedbacks({
  feedbacks = defaultFeedbacks,
  stats = defaultStats,
}: PatientsFeedbacksProps) {
  // Function to render star ratings based on a numeric value
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="ri-star-fill"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="ri-star-half-fill"></i>);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="ri-star-line"></i>);
    }

    return stars;
  };

  return (
    <>
      <div className="feedback-area smoke-bg-color">
        <div className="container">
          <div className="section-title">
            <div className="row justify-content-center align-items-center g-4">
              <div className="col-lg-6 col-md-12">
                <div className="left">
                  <span className="sub wrap2">Patients Feedback</span>
                  <h2>Why Patients Choose Doutor—In Their Own Words</h2>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="right wrap2">
                  <Link href="/feedbacks" className="link-btn">
                    View All Feedbacks
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        d="M12.5 0H0.5C0.224 0 0 0.224 0 0.5C0 0.776 0.224 1 0.5 1H11.2928L0.1465 12.1465C-0.04875 12.3417 -0.04875 12.6583 0.1465 12.8535C0.24425 12.9513 0.372 13 0.5 13C0.628 13 0.756 12.9513 0.8535 12.8535L12 1.707V12.5C12 12.776 12.224 13 12.5 13C12.776 13 13 12.776 13 12.5V0.5C13 0.224 12.776 0 12.5 0Z"
                        fill="#336AEA"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center align-items-center">
            <div className="col-xl-4 col-md-12">
              <div className="feedback-rating-box">
                <div className="fun">
                  <div className="d-flex align-items-center">
                    <h3 className="counter">{stats.satisfactionRate}</h3>
                    <h3 className="sub">%</h3>
                  </div>
                  <span>Patient Satisfaction</span>
                </div>
                <div className="image">
                  <Image
                    src="/images/feedback/rating.png"
                    alt="rating"
                    width={185}
                    height={183}
                  />
                </div>
                <div className="review">
                  <div className="left">
                    <span>Review on</span>
                    <Image
                      src={stats.platformImage}
                      alt={stats.platform}
                      width={73}
                      height={22}
                    />
                  </div>
                  <div className="right">
                    <div className="list">{renderStars(4.5)}</div>
                    <span>{stats.reviewCount} Reviews</span>
                  </div>
                </div>
                <div className="wrap-shape">
                  <Image
                    src="/images/feedback/shape.png"
                    alt="shape"
                    width={170}
                    height={156}
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-8 col-md-12">
              <Swiper
                navigation={true}
                autoHeight={true}
                autoplay={{
                  delay: 6000,
                  pauseOnMouseEnter: true,
                }}
                modules={[Navigation, Autoplay]}
                className="feedback-slider"
              >
                {feedbacks.map((feedback) => (
                  <SwiperSlide key={feedback.id}>
                    <div className="feedback-inner-card">
                      <div className="list">{renderStars(feedback.rating)}</div>
                      <p>
                        <q>{feedback.comment}</q>
                      </p>
                      <div className="info">
                        <div className="image">
                          <Image
                            src={feedback.image}
                            alt={feedback.patientName}
                            width={57}
                            height={57}
                          />
                        </div>
                        <div className="content">
                          <h3>{feedback.patientName}</h3>
                          <span>— {feedback.location}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Default data in case none is provided
const defaultFeedbacks: FeedbackItem[] = [
  {
    id: 1,
    rating: 4.5,
    comment:
      "I honestly didn't expect virtual healthcare to feel this personal. The doctor took the time to listen to every concern I had and explained things in a way I could understand. It felt just like sitting in a clinic—except I never had to leave my flat. Doutor is the future of healthcare.",
    patientName: "Emily Robinson",
    location: "London, UK",
    image: "/images/users/user1.png",
  },
  {
    id: 2,
    rating: 4.5,
    comment:
      "I honestly didn't expect virtual healthcare to feel this personal. The doctor took the time to listen to every concern I had and explained things in a way I could understand. It felt just like sitting in a clinic—except I never had to leave my flat. Doutor is the future of healthcare.",
    patientName: "Carlos Martínez",
    location: "Madrid, Spain",
    image: "/images/users/user2.png",
  },
  // Add more default feedback items as needed
];

const defaultStats: FeedbackStats = {
  satisfactionRate: 99,
  reviewCount: "1500+",
  platform: "Clutch",
  platformImage: "/images/feedback/clutch.png",
};

export default PatientsFeedbacks;
