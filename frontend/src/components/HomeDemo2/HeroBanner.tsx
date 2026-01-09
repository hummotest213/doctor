"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Features from "./Features";

function HeroBanner() {
  // Parallax
  const [bgPosition, setBgPosition] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;
      const scrollPosition = window.scrollY;
      const speed = 0.5; // Parallax speed (0.1 to 1)
      // Calculate parallax offset (negative for upward movement)
      const offset = -(scrollPosition * speed);
      setBgPosition(offset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        ref={bannerRef}
        className="second-banner-area"
        style={{
          backgroundImage: "url(/images/banner/banner-bg.jpg)",
          backgroundPosition: `center ${bgPosition}px`,
          backgroundAttachment: "fixed", // Creates parallax effect
        }}
      >
        <div className="container-fluid">
          <div className="second-banner-content section-title-animation animation-style2">
            <h1>Your Health, One Click Away With Trusted Virtual Care</h1>
            <p>
              Get expert medical advice, prescriptions, and referrals—anytime,
              anywhere.
            </p>
            <div className="banner-btn">
              <Link href="/contact" className="default-btn">
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
                <strong>Register Now</strong> - It&apos;s Free
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
        {/* Features */}
        <Features />
      </div>
    </>
  );
}

export default HeroBanner;
