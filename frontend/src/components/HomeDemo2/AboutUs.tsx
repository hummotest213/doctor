import React from "react";
import Image from "next/image";
import Link from "next/link";

// Define types for our about data
interface AboutItem {
  id: number;
  icon: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
}

interface AboutData {
  title: string;
  subtitle: string;
  items: AboutItem[];
  button: {
    text: string;
    href: string;
  };
}

// Define our about data
const aboutData: AboutData = {
  title:
    "Building a Future Where Access to Quality Healthcare Doesn't Depend on Location",
  subtitle: "About Us",
  items: [
    {
      id: 1,
      icon: {
        src: "/images/icons/about1.svg",
        alt: "icon",
      },
      title: "Patient-First Approach",
      description:
        "At Doutor, every decision we make begins with the patient in mind. We focus on delivering care that is not only clinically effective but also compassionate, accessible, and respectful of your time and privacy.",
    },
    {
      id: 2,
      icon: {
        src: "/images/icons/about2.svg",
        alt: "icon",
      },
      title: "Licensed, Trusted Professionals",
      description:
        "We partner only with certified, experienced medical providers. Whether it's general care, mental health, or specialty services, you'll always speak with real doctors who are qualified, vetted, and committed to your well-being.",
    },
    {
      id: 3,
      icon: {
        src: "/images/icons/about3.svg",
        alt: "icon",
      },
      title: "Care Without Boundaries",
      description:
        "Geography shouldn't limit your access to healthcare. With Doutor, anyone with a device and an internet connection can connect to trusted doctors—no matter where they live, work, or travel.",
    },
  ],
  button: {
    text: "Learn More About Us",
    href: "/about-us",
  },
};

function AboutUs() {
  return (
    <>
      <div className="second-about-area ptb-140 smoke-bg-color">
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-xl-6 col-md-12">
              <div className="second-about-content">
                <span className="sub">{aboutData.subtitle}</span>
                <h2>{aboutData.title}</h2>
              </div>
            </div>

            <div className="col-xl-6 col-md-12">
              <div className="second-about-items">
                {aboutData.items.map((item) => (
                  <div key={item.id} className="item">
                    <div className="icon">
                      <Image
                        src={item.icon.src}
                        alt={item.icon.alt}
                        width={60}
                        height={60}
                      />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="second-about-btn">
            <Link href={aboutData.button.href} className="default-btn">
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
              {aboutData.button.text}
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
      </div>
    </>
  );
}

export default AboutUs;
