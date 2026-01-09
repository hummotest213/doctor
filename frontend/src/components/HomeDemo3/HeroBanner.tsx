import React from "react";
import Image from "next/image";
import Link from "next/link";

function HeroBanner() {
  return (
    <>
      <div className="third-banner-area">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center g-5">
            <div className="col-xxl-6 col-md-12">
              <div className="third-banner-content section-title-animation animation-style3">
                <span className="sub">Expert Care. Anywhere.</span>

                <h1>
                  Healthcare Without The Hassle—See A Doctor In Minutes
                </h1>

                <p>
                  Skip the waiting room. Get high-quality care from licensed
                  doctors right from your phone, 24/7.
                </p>

                <div className="banner-btn">
                  <Link href="/register" className="default-btn">
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

            <div className="col-xxl-6 col-md-12">
              <div className="third-banner-image">
                <Image
                  src="/images/banner/banner2.png"
                  alt="banner2"
                  width={1418}
                  height={1265}
                />

                <div className="fun">
                  <div className="image">
                    <Image
                      src="/images/banner/search.svg"
                      alt="search"
                      width={55}
                      height={55}
                    />
                  </div>
                  <div className="content">
                    <div className="d-flex align-items-center">
                      <h3 className="counter">4</h3>
                      <h3 className="sub">.</h3>
                      <h3 className="counter">9</h3>
                    </div>
                    <span>Google Ratings</span>
                  </div>
                </div>

                <div className="fun-wrap">
                  <div className="content">
                    <div className="d-flex align-items-center">
                      <h3 className="counter">8</h3>
                      <h3 className="sub">.</h3>
                      <h3 className="counter">5</h3>
                      <h3 className="sub">M+</h3>
                    </div>
                    <span>Patients Served</span>
                  </div>
                  <div className="image d-flex align-items-center">
                    <Image
                      src="/images/users/user1.png"
                      alt="user1"
                      width={44}
                      height={44}
                      style={{ marginRight: "-10px" }}
                    />
                    <Image
                      src="/images/users/user2.png"
                      alt="user2"
                      width={44}
                      height={44}
                      style={{ marginRight: "-10px" }}
                    />
                    <Image
                      src="/images/users/user3.png"
                      alt="user3"
                      width={44}
                      height={44}
                      style={{ marginRight: "-10px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="third-banner-ellipse">
          <Image
            src="/images/banner/ellipse.png"
            alt="ellipse"
            width={1175}
            height={720}
          />
        </div>
        <div className="third-banner-rectangle">
          <Image
            src="/images/banner/rectangle.png"
            alt="rectangle"
            width={1920}
            height={158}
          />
        </div>
      </div>
    </>
  );
}

export default HeroBanner;
