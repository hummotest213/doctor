import React from "react";
import Image from "next/image";
import Link from "next/link";

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

const AvailableDoctor = () => {
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
      imageUrl: "/images/doctors/doctor1.png",
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
      imageUrl: "/images/doctors/doctor2.png",
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
      imageUrl: "/images/doctors/doctor3.png",
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
      imageUrl: "/images/doctors/doctor4.png",
      profileLink: "/doctors/profile",
    },
  ];

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

  return (
    <>
      <div className="doctors-area ptb-140 smoke-bg-color">
        <div className="container">
          <div className="available-title">
            <h2>Also Available To See You</h2>
          </div>
          <div className="row justify-content-center g-4">
            {doctorsData.map((doctor) => (
              <div key={doctor.id} className="col-xl-3 col-md-6">
                <div className="doctor-card">
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
                      <Link href="/book-an-appointment" className="default-btn">
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailableDoctor;
