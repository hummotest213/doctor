import React from "react";
import Image from "next/image";

// Define types for our feature data
interface FeatureCounter {
  value: string;
  isSub?: boolean;
}

interface FeatureUserImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface FeatureCard {
  id: number;
  type: "patients" | "doctors" | "urgent";
  icon?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  counters: FeatureCounter[];
  title: string;
  userImages?: FeatureUserImage[];
  doctorImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  backgroundImage?: string;
  contactInfo?: {
    icon: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    label: string;
    phone: string;
  };
}

// Define our feature data
const featuresData: FeatureCard[] = [
  {
    id: 1,
    type: "patients",
    icon: {
      src: "/images/icons/help1.svg",
      alt: "icon",
      width: 35,
      height: 35,
    },
    counters: [
      { value: "8" },
      { value: ".", isSub: true },
      { value: "5" },
      { value: "M+", isSub: true },
    ],
    title: "Patients Served",
    userImages: [
      {
        src: "/images/users/user1.png",
        alt: "user1",
        width: 40,
        height: 40,
      },
      {
        src: "/images/users/user2.png",
        alt: "user2",
        width: 40,
        height: 40,
      },
      {
        src: "/images/users/user3.png",
        alt: "user3",
        width: 40,
        height: 40,
      },
    ],
  },
  {
    id: 2,
    type: "doctors",
    icon: {
      src: "/images/icons/help2.svg",
      alt: "icon",
      width: 35,
      height: 35,
    },
    counters: [{ value: "500" }, { value: "+", isSub: true }],
    title: "Licensed Doctors",
    doctorImage: {
      src: "/images/help/doctors.jpg",
      alt: "image",
      width: 270,
      height: 338,
    },
  },
  {
    id: 3,
    type: "urgent",
    counters: [{ value: "24" }, { value: "/", isSub: true }, { value: "7" }],
    title: "Virtual Access",
    backgroundImage: "/images/help/info.jpg",
    contactInfo: {
      icon: {
        src: "/images/icons/help3.svg",
        alt: "icon",
        width: 46,
        height: 46,
      },
      label: "Urgent Help",
      phone: "+1 (800) 456-7890",
    },
  },
];

function Features() {
  return (
    <>
      <div className="container">
        <div className="urgent-help-area">
          <div className="row justify-content-center g-4">
            <div className="col-xl-7 col-md-12">
              <div className="row justify-content-center g-4">
                {featuresData
                  .filter((feature) => feature.type !== "urgent")
                  .map((feature) => (
                    <div key={feature.id} className="col-lg-6 col-md-6">
                      <div className="urgent-help-card">
                        {feature.type === "patients" && (
                          <>
                            <div className="icon">
                              <Image
                                src={feature.icon!.src}
                                alt={feature.icon!.alt}
                                width={feature.icon!.width}
                                height={feature.icon!.height}
                              />
                            </div>
                            <div className="fun">
                              <div className="content">
                                <div className="d-flex align-items-center">
                                  {feature.counters.map((counter, index) => (
                                    <h3
                                      key={index}
                                      className={
                                        counter.isSub ? "sub" : "counter"
                                      }
                                    >
                                      {counter.value}
                                    </h3>
                                  ))}
                                </div>
                                <span>{feature.title}</span>
                              </div>
                              <div className="image">
                                <div
                                  className="d-flex align-items-center"
                                  style={{ paddingRight: "10px" }}
                                >
                                  {feature.userImages?.map((user, index) => (
                                    <Image
                                      key={index}
                                      src={user.src}
                                      alt={user.alt}
                                      width={user.width}
                                      height={user.height}
                                      style={{ marginRight: "-10px" }}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {feature.type === "doctors" && (
                          <div className="inner">
                            <div className="content">
                              <div className="icon">
                                <Image
                                  src={feature.icon!.src}
                                  alt={feature.icon!.alt}
                                  width={feature.icon!.width}
                                  height={feature.icon!.height}
                                />
                              </div>
                              <div className="title">
                                <div className="d-flex align-items-center">
                                  {feature.counters.map((counter, index) => (
                                    <h3
                                      key={index}
                                      className={
                                        counter.isSub ? "sub" : "counter"
                                      }
                                    >
                                      {counter.value}
                                    </h3>
                                  ))}
                                </div>
                                <span>{feature.title}</span>
                              </div>
                            </div>
                            <div className="image">
                              <Image
                                src={feature.doctorImage!.src}
                                alt={feature.doctorImage!.alt}
                                width={feature.doctorImage!.width}
                                height={feature.doctorImage!.height}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {featuresData
              .filter((feature) => feature.type === "urgent")
              .map((feature) => (
                <div key={feature.id} className="col-xl-5 col-md-12">
                  <div
                    className="urgent-help-info-card"
                    style={{
                      backgroundImage: `url(${feature.backgroundImage})`,
                    }}
                  >
                    <div className="fun">
                      <div className="d-flex align-items-center">
                        {feature.counters.map((counter, index) => (
                          <h3
                            key={index}
                            className={counter.isSub ? "sub" : "counter"}
                          >
                            {counter.value}
                          </h3>
                        ))}
                      </div>
                      <span>{feature.title}</span>
                    </div>
                    <div className="info">
                      <div className="image">
                        <Image
                          src={feature.contactInfo!.icon.src}
                          alt={feature.contactInfo!.icon.alt}
                          width={feature.contactInfo!.icon.width}
                          height={feature.contactInfo!.icon.height}
                        />
                      </div>
                      <div className="content">
                        <span>{feature.contactInfo!.label}</span>
                        <a
                          href={`tel:${feature.contactInfo!.phone.replace(
                            /\D/g,
                            ""
                          )}`}
                        >
                          {feature.contactInfo!.phone}
                        </a>
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
}

export default Features;
