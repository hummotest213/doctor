"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Define the type for a feedback item
type FeedbackItem = {
  id: number;
  name: string;
  service: string;
  comment: string;
  rating: number;
  image: string;
};

const FeedbackLists = () => {
  // State for feedback data
  const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Show 6 items per page

  // Ref for scrolling to top when changing pages
  const topRef = useRef<HTMLDivElement>(null);

  // Initialize with mock data
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const mockData: FeedbackItem[] = [
      {
        id: 1,
        name: "John Doe",
        service: "General Checkup",
        comment:
          "The service was excellent, and the staff was very friendly. I felt well taken care of during my visit.",
        rating: 5,
        image: "/images/users/user1.png",
      },
      {
        id: 2,
        name: "Jane Smith",
        service: "Dental Treatment",
        comment:
          "Great experience overall. The doctor explained everything clearly, and the environment was very comfortable.",
        rating: 5,
        image: "/images/users/user2.png",
      },
      {
        id: 3,
        name: "Michael Brown",
        service: "Eye Consultation",
        comment:
          "Fantastic service! The consultation was quick and thorough. I highly recommend this clinic to others.",
        rating: 5,
        image: "/images/users/user3.png",
      },
      {
        id: 4,
        name: "Sarah Lee",
        service: "Physiotherapy Session",
        comment:
          "My recovery was much faster than expected thanks to the professional care. The therapist was kind and knowledgeable.",
        rating: 5,
        image: "/images/users/user4.png",
      },
      {
        id: 5,
        name: "David Wilson",
        service: "Cardiology Checkup",
        comment:
          "Very satisfied with the cardiology team. They explained the test results clearly. Waiting time could be shorter though.",
        rating: 5,
        image: "/images/users/user5.png",
      },
      {
        id: 6,
        name: "Emily Carter",
        service: "Maternity Care",
        comment:
          "The maternity team was exceptional! They supported me throughout my pregnancy and delivery with great care.",
        rating: 5,
        image: "/images/users/user6.png",
      },
      {
        id: 7,
        name: "Chris Evans",
        service: "Orthopedic Consultation",
        comment:
          "The orthopedic doctor was very knowledgeable and helped me understand my condition clearly. Great experience overall.",
        rating: 5,
        image: "/images/users/user7.png",
      },
      {
        id: 8,
        name: "Olivia Johnson",
        service: "Pediatric Checkup",
        comment:
          "The pediatrician was so gentle and patient with my child. I truly appreciated the caring approach of the staff.",
        rating: 5,
        image: "/images/users/user8.png",
      },
      {
        id: 9,
        name: "William Harris",
        service: "Dermatology Consultation",
        comment:
          "The dermatologist gave helpful advice and treatment options. The waiting time was a bit long, but the care was worth it.",
        rating: 5,
        image: "/images/users/user9.png",
      },
      {
        id: 10,
        name: "David Wilson",
        service: "Cardiology Checkup",
        comment:
          "Very satisfied with the cardiology team. They explained the test results clearly. Waiting time could be shorter though.",
        rating: 5,
        image: "/images/users/user5.png",
      },
      {
        id: 11,
        name: "Sarah Lee",
        service: "Physiotherapy Session",
        comment:
          "My recovery was much faster than expected thanks to the professional care. The therapist was kind and knowledgeable.",
        rating: 5,
        image: "/images/users/user4.png",
      },
      {
        id: 12,
        name: "Emily Carter",
        service: "Maternity Care",
        comment:
          "The maternity team was exceptional! They supported me throughout my pregnancy and delivery with great care.",
        rating: 5,
        image: "/images/users/user6.png",
      },
    ];

    setFeedbackData(mockData);
  }, []);

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedbackData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(feedbackData.length / itemsPerPage);

  // Function to render star ratings
  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <li key={i}>
        <i className={`ri-star${i < rating ? "-fill" : "-line"}`}></i>
      </li>
    ));
  };

  // Handle page change with scroll to top
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top after a brief delay to ensure DOM update
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Handle next/prev page with scroll to top
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll to top after a brief delay to ensure DOM update
      setTimeout(() => {
        if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Scroll to top after a brief delay to ensure DOM update
      setTimeout(() => {
        if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <>
      <div className="review-area ptb-140" ref={topRef}>
        <div className="container">
          <div className="row justify-content-center g-4">
            {currentItems.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <div className="review-card">
                  <ul className="rating">{renderRating(item.rating)}</ul>
                  <p>{item.comment}</p>
                  <div className="info">
                    <div className="image">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="title">
                      <h3>{item.name}</h3>
                      <span>{item.service}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* pagination - only show if more than 6 items */}
            {feedbackData.length > itemsPerPage && (
              <div className="col-lg-12 col-md-12">
                <div className="pagination-area">
                  <button
                    type="button"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M13 19L7 12L13 5"
                        stroke="#63667D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        opacity="0.5"
                        d="M17 19L11 12L17 5"
                        stroke="#63667D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        type="button"
                        className={currentPage === number ? "active" : ""}
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M11 19L17 12L11 5"
                        stroke="#63667D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        opacity="0.5"
                        d="M7 19L13 12L7 5"
                        stroke="#63667D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackLists;
