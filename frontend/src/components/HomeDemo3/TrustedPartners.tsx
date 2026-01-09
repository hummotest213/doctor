"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

function TrustedPartners() {
  return (
    <>
      <div className="partner-area pb-140">
        <div className="container">
          <div className="partner-inner">
            <div className="section-title">
              <div
                className="left text-center"
                style={{
                  maxWidth: "637px",
                  margin: "auto",
                }}
              >
                <span className="sub">Trusted Partners</span>
                <h2>Trusted by Industry Leaders and Healthcare Innovators</h2>
              </div>
            </div>

            <Swiper
              spaceBetween={30}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                450: {
                  slidesPerView: 2,
                },
                600: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 5,
                },
                992: {
                  slidesPerView: 6,
                },
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="partner-item">
                  <Image
                    src="/images/partner1.png"
                    alt="partner"
                    width={136}
                    height={60}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="partner-item">
                  <Image
                    src="/images/partner2.png"
                    alt="partner"
                    width={136}
                    height={60}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="partner-item">
                  <Image
                    src="/images/partner3.png"
                    alt="partner"
                    width={136}
                    height={60}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="partner-item">
                  <Image
                    src="/images/partner4.png"
                    alt="partner"
                    width={136}
                    height={60}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="partner-item">
                  <Image
                    src="/images/partner5.png"
                    alt="partner"
                    width={136}
                    height={60}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="partner-item">
                  <Image
                    src="/images/partner6.png"
                    alt="partner"
                    width={136}
                    height={60}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="partner-item">
                  <Image
                    src="/images/partner3.png"
                    alt="partner"
                    width={136}
                    height={60}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrustedPartners;
