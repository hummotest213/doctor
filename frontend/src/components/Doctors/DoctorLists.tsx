"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Doctor data structure
interface Doctor {
  id: number;
  name: string;
  qualification: string;
  specialization: string;
  experience: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  profileLink: string;
}

const DoctorLists = () => {
  // Sample doctor data - this could come from an API or CMS
  const doctorsData: Doctor[] = [
    {
      id: 1,
      name: "Dr. Aisha Rahman",
      qualification: "MBBS, FCPS (Medicine)",
      specialization: "Internal Medicine",
      experience: "12+ Years of Experience",
      rating: 4.9,
      reviews: 3560,
      imageUrl: "/images/doctors/doctor5.png",
      profileLink: "/doctors/profile",
    },
    {
      id: 2,
      name: "Dr. Mark Davis",
      qualification: "MD, Psychiatry",
      specialization: "Mental Health",
      experience: "8+ Years of Experience",
      rating: 4.8,
      reviews: 2350,
      imageUrl: "/images/doctors/doctor6.png",
      profileLink: "/doctors/profile",
    },
    {
      id: 3,
      name: "Dr. Emily Carter",
      qualification: "MD, FAAD",
      specialization: "Dermatology",
      experience: "11+ Years of Experience",
      rating: 4.7,
      reviews: 1375,
      imageUrl: "/images/doctors/doctor7.png",
      profileLink: "/doctors/profile",
    },
    {
      id: 4,
      name: "Dr. Samuel Lee",
      qualification: "MBBS, MD",
      specialization: "Chronic Conditions",
      experience: "15+ Years of Experience",
      rating: 4.9,
      reviews: 4892,
      imageUrl: "/images/doctors/doctor8.png",
      profileLink: "/doctors/profile",
    },
    {
      id: 5,
      name: "Dr. Jennifer White",
      qualification: "MD, FACC",
      specialization: "Cardiology",
      experience: "10+ Years of Experience",
      rating: 4.8,
      reviews: 3210,
      imageUrl: "/images/doctors/doctor1.png",
      profileLink: "/doctors/profile",
    },
    {
      id: 6,
      name: "Dr. Robert Johnson",
      qualification: "MD, FAAP",
      specialization: "Pediatrics",
      experience: "9+ Years of Experience",
      rating: 4.7,
      reviews: 2875,
      imageUrl: "/images/doctors/doctor2.png",
      profileLink: "/doctors/profile",
    },
    {
      id: 7,
      name: "Dr. Lisa Chen",
      qualification: "MD, FACOG",
      specialization: "Obstetrics & Gynecology",
      experience: "14+ Years of Experience",
      rating: 4.9,
      reviews: 4120,
      imageUrl: "/images/doctors/doctor3.png",
      profileLink: "/doctors/profile",
    },
    {
      id: 8,
      name: "Dr. Michael Brown",
      qualification: "MD, FAAOS",
      specialization: "Orthopedic Surgery",
      experience: "13+ Years of Experience",
      rating: 4.8,
      reviews: 3680,
      imageUrl: "/images/doctors/doctor4.png",
      profileLink: "/doctors/profile",
    },
    {
      id: 9,
      name: "Dr. Sophia Martinez",
      qualification: "MD, PhD (Neurology)",
      specialization: "Neurology",
      experience: "16+ Years of Experience",
      rating: 4.9,
      reviews: 4520,
      imageUrl: "/images/doctors/doctor9.png",
      profileLink: "/doctors/profile",
    },
    {
      id: 10,
      name: "Dr. David Wilson",
      qualification: "MBBS, MD (Gastroenterology)",
      specialization: "Gastroenterology",
      experience: "12+ Years of Experience",
      rating: 4.7,
      reviews: 2985,
      imageUrl: "/images/doctors/doctor10.png",
      profileLink: "/doctors/profile",
    },
    {
      id: 11,
      name: "Dr. Olivia Patel",
      qualification: "MD, FRCP",
      specialization: "Endocrinology",
      experience: "10+ Years of Experience",
      rating: 4.8,
      reviews: 2760,
      imageUrl: "/images/doctors/doctor11.png",
      profileLink: "/doctors/profile",
    },
    {
      id: 12,
      name: "Dr. James Anderson",
      qualification: "MD, FRCS",
      specialization: "General Surgery",
      experience: "18+ Years of Experience",
      rating: 5.0,
      reviews: 5125,
      imageUrl: "/images/doctors/doctor12.png",
      profileLink: "/doctors/profile",
    },
  ];

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  // Sort state
  const [sortOption, setSortOption] = useState("0"); // Default to Most Popular

  // Filter doctors based on search term
  const filteredDoctors = doctorsData.filter((doctor) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(searchLower) ||
      doctor.specialization.toLowerCase().includes(searchLower) ||
      doctor.qualification.toLowerCase().includes(searchLower)
    );
  });

  // Sort doctors based on selected option
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortOption === "0") {
      // Most Popular - sort by number of reviews (descending)
      return b.reviews - a.reviews;
    } else if (sortOption === "1") {
      // Newest - sort by ID (descending, assuming higher ID means newer)
      return b.id - a.id;
    } else if (sortOption === "2") {
      // Top Rated - sort by rating (descending)
      return b.rating - a.rating;
    }
    return 0;
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Show 8 items per page

  // Ref for scrolling to top when changing pages
  const topRef = useRef<HTMLDivElement>(null);

  // Calculate pagination values based on sorted results
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedDoctors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedDoctors.length / itemsPerPage);

  // Reset to first page when search term or sort option changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption]);

  // Function to render star ratings
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <li key={i}>
            <i className="ri-star-fill"></i>
          </li>
        ))}
        {hasHalfStar && (
          <li>
            <i className="ri-star-half-fill"></i>
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

  // Handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll to top after a brief delay
      setTimeout(() => {
        if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  // Handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Scroll to top after a brief delay
      setTimeout(() => {
        if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort option change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Calculate display range for results text
  const startResult = sortedDoctors.length > 0 ? indexOfFirstItem + 1 : 0;
  const endResult = Math.min(indexOfLastItem, sortedDoctors.length);

  return (
    <>
      <div className="doctors-area wrap-style2 ptb-140" ref={topRef}>
        <div className="container">
          <div className="showing-doctors-bar">
            <div className="results-text">
              Showing{" "}
              <span>
                {startResult}-{endResult}
              </span>{" "}
              of <span>{sortedDoctors.length}</span> Results
            </div>
            
            <div className="search-sort-wrapper">
              <div className="search-box">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search doctors by specialist"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_10014_10966"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="1"
                      y="1"
                      width="22"
                      height="22"
                    >
                      <path
                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                      <path
                        opacity="0.5"
                        d="M20 20L22 22"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </mask>
                    <g mask="url(#mask0_10014_10966)">
                      <path d="M0 0H24V24H0V0Z" fill="#336AEA" />
                    </g>
                  </svg>
                </button>
              </div>
              <div className="sort-dropdown">
                <label>Sort by</label>
                <select 
                  className="form-select" 
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="0">Most Popular</option>
                  <option value="1">Newest</option>
                  <option value="2">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row justify-content-center g-4">
            {currentItems.length > 0 ? (
              currentItems.map((doctor) => (
                <div key={doctor.id} className="col-xl-3 col-md-6">
                  <div className="doctor-card wrap2">
                    <div className="image">
                      <Link href={doctor.profileLink}>
                        <Image
                          src={doctor.imageUrl}
                          alt={doctor.name}
                          width={340}
                          height={340}
                          style={{ borderRadius: "50%" }}
                        />
                      </Link>
                    </div>

                    <div className="content">
                      <h3>
                        <Link href={doctor.profileLink}>{doctor.name}</Link>
                      </h3>
                      <span className="sub">{doctor.qualification}</span>
                      <span className="tag">{doctor.specialization}</span>
                      <span className="experience">{doctor.experience}</span>
                      <div className="rating-info">
                        <ul className="list">
                          {renderRatingStars(doctor.rating)}
                        </ul>
                        <b>{doctor.rating}</b>
                        <span>({doctor.reviews.toLocaleString()} Reviews)</span>
                      </div>

                      <div className="doctor-btn">
                        <Link
                          href="/book-an-appointment"
                          className="default-btn"
                        >
                          <span className="left">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M11.5385 0H0.461538C0.206769 0 0 0.206769 0 0.461538C0 0.716308 0.206769 0.923077 0.461538 0.923077H10.4241L0.135231 11.2122C-0.045 11.3924 -0.045 11.6845 0.135231 11.8648C0.225462 11.955 0.343385 12 0.461538 12C0.579692 12 0.697846 11.955 0.787846 11.8648L11.0769 1.57569V11.5385C11.0769 11.7932 11.2837 12 11.5385 12C11.7932 12 12 11.7932 12 11.5385V0.461538C12 0.206769 11.7932 0 11.5385 0Z"
                                fill="#336AEA"
                              />
                            </svg>
                          </span>
                          Book Now
                          <span className="right">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M11.5385 0H0.461538C0.206769 0 0 0.206769 0 0.461538C0 0.716308 0.206769 0.923077 0.461538 0.923077H10.4241L0.135231 11.2122C-0.045 11.3924 -0.045 11.6845 0.135231 11.8648C0.225462 11.955 0.343385 12 0.461538 12C0.579692 12 0.697846 11.955 0.787846 11.8648L11.0769 1.57569V11.5385C11.0769 11.7932 11.2837 12 11.5385 12C11.7932 12 12 11.7932 12 11.5385V0.461538C12 0.206769 11.7932 0 11.5385 0Z"
                                fill="#336AEA"
                              />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5 border">
                <p>No doctors found matching your search criteria.</p>
              </div>
            )}
            
            {/* pagination - only show if more than 4 items */}
            {sortedDoctors.length > itemsPerPage && (
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

export default DoctorLists;