"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CalendarContent from "./CalendarContent";

// Define interfaces for our data structure
interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface Review {
  name: string;
  initial: string;
  rating: number;
  comment: string;
}

interface DoctorProfileData {
  name: string;
  title: string;
  specialty: string;
  reviews: {
    rating: number;
    count: number;
    totalCount: string;
  };
  experience: string;
  licenseId: string;
  note: string;
  socialLinks: SocialLink[];
  profileImage: string;
  about: {
    title: string;
    paragraphs: string[];
  };
  services: {
    included: string[];
    excluded: string[];
  };
  experienceDetails: {
    yearsOfPractice: string;
    previousInstitutions: string[];
    specialClinicalFocus: string[];
    languagesSpoken: string[];
  };
  reviewsList: Review[];
}

// Dynamic data object
const doctorData: DoctorProfileData = {
  name: "Dr. Mark Davis",
  title: "MD, Psychiatry",
  specialty: "Mental Health",
  reviews: {
    rating: 4.9,
    count: 2350,
    totalCount: "5,200+",
  },
  experience: "25 Years",
  licenseId: "#NY-678234",
  note: "Currently practicing via Doutor Virtual Clinic (Telemedicine Only)",
  socialLinks: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/",
      icon: "/images/icons/facebook.svg",
    },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/",
      icon: "/images/icons/linkedin.svg",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/",
      icon: "/images/icons/instagram.svg",
    },
    {
      platform: "x",
      url: "https://x.com/",
      icon: "/images/icons/x.svg",
    },
  ],
  profileImage: "/images/doctor-profile.jpg",
  about: {
    title: "About Dr. Mark Davis",
    paragraphs: [
      "Dr. Mark Davis is a highly respected, board-certified physician specializing in internal medicine with over 25 years of experience in both clinical practice and telehealth. He is dedicated to delivering high-quality, personalized care with a strong focus on patient trust and comfort.",
      "Throughout his career, Dr. Davis has helped thousands of patients manage chronic conditions such as hypertension, diabetes, and asthma, while also treating common issues like flu, infections, and allergies through virtual care. His calm demeanor and clear communication style make him a trusted name in remote healthcare.",
      "Dr. Davis is passionate about making healthcare more accessible and believes that virtual medicine is key to the future of patient-centered care.",
    ],
  },
  services: {
    included: [
      "Diagnosis & treatment of common illnesses",
      "Prescription refills for ongoing medications",
      "Cold, flu, allergies, and sinus infections",
      "Mental health consultations (non-emergency)",
      "Video visits & follow-ups",
      "Lab test reviews & second opinions",
      "Pediatric care for minor issues",
      "Post-consultation messaging (within 48 hrs)",
    ],
    excluded: [
      "Emergency conditions (chest pain, trauma, etc.)",
      "Physical exams or blood draws",
      "X-rays, imaging, or scans",
      "Surgical evaluations or procedures",
      "Disability, insurance, or employment clearance forms",
      "Ambulance dispatch or emergency triage",
      "Specialized diagnostics requiring physical equipment",
    ],
  },
  experienceDetails: {
    yearsOfPractice: "25+ years in Internal Medicine",
    previousInstitutions: [
      "General Physician at Cedarview Medical Group, New York (2015-2024)",
      "Resident Doctor at Mount Sinai Hospital, NYC (2011-2015)",
    ],
    specialClinicalFocus: [
      "Chronic Disease Management (Diabetes, Hypertension, Asthma)",
      "Women's Health & Preventive Care",
      "Virtual Health Counseling",
    ],
    languagesSpoken: ["English", "Spanish", "French", "German", "Arabic"],
  },
  reviewsList: [
    {
      name: "Emily Carter",
      initial: "E",
      rating: 5,
      comment:
        "I had flu symptoms and needed quick care. The doctor listened patiently and sent my prescription right away. So much easier than a clinic visit!",
    },
    {
      name: "James Hamilton",
      initial: "J",
      rating: 5,
      comment:
        "Doutor matched me with a therapist within hours. I feel heard, and it's incredibly convenient to talk from home.",
    },
    {
      name: "Sophia Müller",
      initial: "S",
      rating: 5,
      comment:
        "I wasn't sure about online consultations at first, but the experience felt just as personal and professional as in-person care.",
    },
    {
      name: "David Nguyen",
      initial: "D",
      rating: 5,
      comment:
        "I take asthma meds regularly, and getting refills through Doutor saves me so much time. Highly recommend it.",
    },
    {
      name: "Amanda Brown",
      initial: "A",
      rating: 5,
      comment:
        "My 4-year-old had a rash and the virtual pediatrician walked us through everything. Reassuring and quick.",
    },
    {
      name: "Lucas Dupont",
      initial: "L",
      rating: 5,
      comment:
        "I don't have health coverage and I was worried, but Doutor pricing is clear and very reasonable. Great service!",
    },
    {
      name: "Fatima Khan",
      initial: "F",
      rating: 5,
      comment:
        "I booked an appointment during my lunch break. The whole process was seamless. Doutor nailed it.",
    },
    {
      name: "Jacob Stein",
      initial: "J",
      rating: 5,
      comment:
        "I had follow-up questions after my consult, and the doctor responded via chat in minutes. Amazing support!",
    },
  ],
};

const DoctorProfileContent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  // Function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="ri-star-fill"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="ri-star-half-fill"></i>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="ri-star-line"></i>);
    }

    return stars;
  };

  return (
    <>
      <div className="doctor-profile-area pb-140">
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-lg-3 col-md-12">
              <div className="doctor-profile-image">
                <Image
                  src={doctorData.profileImage}
                  alt={doctorData.name}
                  width={611}
                  height={917}
                />
                <div className="info-social">
                  <h5>Follow Me:</h5>
                  <ul className="list">
                    {doctorData.socialLinks.map((link, index) => (
                      <li key={index}>
                        <a href={link.url} target="_blank">
                          <Image
                            src={link.icon}
                            alt={link.platform}
                            width={25}
                            height={25}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="doctor-profile-desc">
                <div className="profile-content">
                  <h2>{doctorData.name}</h2>
                  <span className="sub">{doctorData.title}</span>
                  <span className="tag">{doctorData.specialty}</span>
                  <div className="info">
                    <ul className="left">
                      <li>
                        <span className="mid">Reviews</span>
                        <div className="rating-info">
                          <div className="list">
                            {renderStars(doctorData.reviews.rating)}
                          </div>
                          <b>{doctorData.reviews.rating}</b>
                          <span className="review">
                            ({doctorData.reviews.count})
                          </span>
                        </div>
                      </li>
                      <li>
                        <span className="mid">Experience</span>
                        <strong className="semi">
                          {doctorData.experience}
                        </strong>
                      </li>
                      <li>
                        <span className="mid">License ID</span>
                        <strong className="semi">{doctorData.licenseId}</strong>
                      </li>
                    </ul>
                    <div className="right-btn">
                      <Link href="/book-an-appointment" className="default-btn">
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
                        Book Now
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
                  <div className="note">
                    <p>
                      <span>Note:</span> {doctorData.note}
                    </p>
                  </div>
                </div>
                <div className="profile-tabs">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <button
                        type="button"
                        onClick={() => handleTabClick(0)}
                        className={`nav-link ${
                          activeTab === 0 ? "active" : ""
                        }`}
                      >
                        Availability
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        type="button"
                        onClick={() => handleTabClick(1)}
                        className={`nav-link ${
                          activeTab === 1 ? "active" : ""
                        }`}
                      >
                        Services
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        type="button"
                        onClick={() => handleTabClick(2)}
                        className={`nav-link ${
                          activeTab === 2 ? "active" : ""
                        }`}
                      >
                        Experience
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        type="button"
                        onClick={() => handleTabClick(3)}
                        className={`nav-link ${
                          activeTab === 3 ? "active" : ""
                        }`}
                      >
                        About
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content">
                    {activeTab === 0 && (
                      <div>
                        <CalendarContent />
                        <div className="availability-reviews">
                          <h3>
                            Reviews{" "}
                            <span>
                              ⭐ <strong>{doctorData.reviews.rating}</strong> (
                              {doctorData.reviews.totalCount} patient reviews)
                            </span>
                          </h3>
                          <div className="row justify-content-center g-4">
                            {doctorData.reviewsList.map((review, index) => (
                              <div className="col-lg-6 col-md-6" key={index}>
                                <div className="review-item">
                                  <div className="top">
                                    <div className="title">
                                      <h2>{review.initial}</h2>
                                    </div>
                                    <div className="content">
                                      <h4>{review.name}</h4>
                                      <ul className="list">
                                        {renderStars(review.rating).map(
                                          (star, i) => (
                                            <li key={i}>{star}</li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                  <p>{review.comment}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 1 && (
                      <div>
                        <div className="services-content">
                          <div className="top">
                            <h3>What&apos;s Included in Your Online Visit</h3>
                            <p>
                              Explore the services you can access through your
                              virtual consultation—plus what requires in-person
                              care.
                            </p>
                          </div>
                          <div className="items">
                            <div className="item">
                              <div className="title">
                                <h4>✅ Included Services</h4>
                                <p>
                                  These are covered in most standard Doutor
                                  virtual consultations:
                                </p>
                              </div>
                              <ul>
                                {doctorData.services.included.map(
                                  (service, index) => (
                                    <li key={index}>
                                      <Image
                                        src="/images/check.svg"
                                        alt="check"
                                        width={16}
                                        height={12}
                                      />
                                      <span>{service}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div className="item">
                              <div className="title">
                                <h4>❌ Excluded Services</h4>
                                <p>
                                  These services require in-person care or
                                  emergency attention:
                                </p>
                              </div>
                              <ul>
                                {doctorData.services.excluded.map(
                                  (service, index) => (
                                    <li key={index}>
                                      <Image
                                        src="/images/check.svg"
                                        alt="check"
                                        width={16}
                                        height={12}
                                      />
                                      <span>{service}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 2 && (
                      <div>
                        <div className="experience-content">
                          <div className="top">
                            <h3>
                              Professional Experience & Medical Background
                            </h3>
                            <p>
                              Learn more about your doctor&apos;s clinical journey,
                              telehealth expertise, & dedication to
                              patient-centered care.
                            </p>
                          </div>
                          <div className="items">
                            <div className="item">
                              <h4>Years of Practice:</h4>
                              <ul>
                                <li>
                                  <span>
                                    <b>
                                      {
                                        doctorData.experienceDetails
                                          .yearsOfPractice
                                      }
                                    </b>
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="item">
                              <h4>Previous Institutions:</h4>
                              <ul>
                                {doctorData.experienceDetails.previousInstitutions.map(
                                  (institution, index) => (
                                    <li key={index}>
                                      <Image
                                        src="/images/check.svg"
                                        alt="check"
                                        width={16}
                                        height={12}
                                      />
                                      <span>{institution}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div className="item">
                              <h4>Special Clinical Focus:</h4>
                              <ul>
                                {doctorData.experienceDetails.specialClinicalFocus.map(
                                  (focus, index) => (
                                    <li key={index}>
                                      <Image
                                        src="/images/check.svg"
                                        alt="check"
                                        width={16}
                                        height={12}
                                      />
                                      <span>{focus}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div className="item">
                              <h4>Languages Spoken:</h4>
                              <ul>
                                {doctorData.experienceDetails.languagesSpoken.map(
                                  (language, index) => (
                                    <li key={index}>
                                      <Image
                                        src="/images/check.svg"
                                        alt="check"
                                        width={16}
                                        height={12}
                                      />
                                      <span>{language}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 3 && (
                      <div>
                        <div className="about-tab-content">
                          <h4>{doctorData.about.title}</h4>
                          {doctorData.about.paragraphs.map(
                            (paragraph, index) => (
                              <p key={index}>{paragraph}</p>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfileContent;
