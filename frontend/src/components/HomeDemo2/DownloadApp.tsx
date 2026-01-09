import React from "react";
import Image from "next/image";
import Link from "next/link";

function DownloadApp() {
  return (
    <>
      <div className="app-area smoke-bg-color">
        <div className="inner">
          <div className="container">
            <div className="row justify-content-center align-items-center g-4">
              <div className="col-lg-7 col-md-12">
                <div className="app-content">
                  <span className="sub">Download Our App</span>
                  <h2>Your Health in Your Pocket—Anywhere, Anytime</h2>
                  <p>
                    Take Doutor with you wherever life takes you. Book
                    appointments, chat with your doctor, access records, and
                    manage prescriptions—all from your mobile device with just a
                    few taps.
                  </p>

                  <ul className="apps-btn">
                    <li>
                      <Link
                        href="https://play.google.com/store/apps"
                        target="_blank"
                      >
                        <Image
                          src="/images/app/google-play.svg"
                          alt="google-play"
                          width={193}
                          height={56}
                        />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.apple.com/app-store/"
                        target="_blank"
                      >
                        <Image
                          src="/images/app/app-store.svg"
                          alt="app-store"
                          width={193}
                          height={56}
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-5 col-md-12">
                <div className="app-image">
                  <Image
                    src="/images/app/app.png"
                    alt="app"
                    width={1053}
                    height={1013}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="app-shape">
            <Image
              src="/images/app/shape.png"
              alt="shape"
              width={174}
              height={136}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DownloadApp;
