import React from "react";
import Image from "next/image";
import Link from "next/link";
import CommentLists from "./CommentLists";

const BlogDetailsContentTwo = () => {
  return (
    <>
      <div className="blog-details-area ptb-140">
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-xl-8 col-md-12">
              <div className="blog-details-desc">
                <div className="blog-details-header">
                  <Image
                    src="/images/blog-details.jpg"
                    alt="Blog Details"
                    width={1284}
                    height={747}
                  />
                  <ul className="meta">
                    <li>Parenting & Wellness</li>
                    <li>July 31, 2025</li>
                  </ul>
                </div>

                <div className="blog-details-content">
                  <h3>Introduction</h3>
                  <p>
                    Balancing work and parenting is a daily challenge—and when
                    health issues arise, it becomes even more stressful. Taking
                    time off work to visit a clinic, finding childcare, sitting
                    in traffic, and waiting in crowded offices can disrupt an
                    already packed schedule. That&apos;s where telemedicine steps in
                    to support today&apos;s busy families.
                  </p>
                  <h3>Save Time with On-Demand Care</h3>
                  <p>
                    Telemedicine allows working parents to skip the commute and
                    the waiting room. You can consult with a licensed doctor
                    during lunch breaks, between meetings, or even while
                    managing household duties—right from your phone or laptop.
                  </p>
                  <blockquote className="blockquote">
                    <p>
                      “I scheduled a pediatric consult for my daughter during my
                      lunch hour. No time off, no hassle.”
                    </p>
                    <span>— Melissa R., working mom of two</span>
                  </blockquote>
                  <h3>Access Pediatric & General Care from Home</h3>
                  <p>With Doutor virtual care services, you can address:</p>

                  <ul className="list">
                    <li>
                      <Image
                        src="/images/check.svg"
                        alt="check"
                        width={16}
                        height={12}
                      />
                      <span>Real, Licensed Doctors Only</span>
                    </li>
                    <li>
                      <Image
                        src="/images/check.svg"
                        alt="check"
                        width={16}
                        height={12}
                      />
                      <span>On-Demand Appointments, 24/7</span>
                    </li>
                    <li>
                      <Image
                        src="/images/check.svg"
                        alt="check"
                        width={16}
                        height={12}
                      />
                      <span>Transparent Pricing With or Without Insurance</span>
                    </li>
                  </ul>

                  <p>
                    No need to drag your child to a clinic while juggling work
                    responsibilities.
                  </p>

                  <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6">
                      <Image
                        src="/images/blog-details2.jpg"
                        alt="Blog Details"
                        width={832}
                        height={832}
                      />
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <Image
                        src="/images/blog-details3.jpg"
                        alt="Blog Details"
                        width={832}
                        height={832}
                      />
                    </div>
                  </div>

                  <p>
                    Our platform offers morning, evening, and weekend
                    appointments to fit into any work schedule. Whether you&apos;re a
                    full-time employee, freelancer, or shift worker, you can get
                    care when it&apos;s convenient—not just when a clinic is open.
                  </p>

                  <h3>Flexible Scheduling for Every Lifestyle</h3>
                  <p>
                    Our platform offers morning, evening, and weekend
                    appointments to fit into any work schedule. Whether you&apos;re a
                    full-time employee, freelancer, or shift worker, you can get
                    care when it&apos;s convenient—not just when a clinic is open.
                  </p>
                  <h3>Stay Connected With Follow-Up Messaging</h3>
                  <p>
                    Busy parents often forget to ask questions during a rushed
                    visit. Doutor lets you send follow-up questions through
                    secure messaging—keeping your mind at ease without
                    additional appointments.
                  </p>
                  <h3>Reduce Time Off & Missed Work</h3>
                  <p>
                    Telemedicine cuts down on unpaid time off, missed deadlines,
                    and childcare costs. With less disruption, you stay
                    productive at work and present for your family.
                  </p>
                </div>

                <div className="article-footer">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-lg-7 col-md-7">
                      <ul className="tags">
                        <li>
                          <span>Tags:</span>
                        </li>
                        <li>
                          <Link href="/blogs">VirtualCare</Link>
                        </li>
                        <li>
                          <Link href="/blogs">MentalHealth</Link>
                        </li>
                      </ul>
                    </div>

                    <div className="col-lg-5 col-md-5">
                      <ul className="social">
                        <li>
                          <span>Share:</span>
                        </li>
                        <li>
                          <a href="https://www.facebook.com/" target="_blank">
                            <Image
                              src="/images/icons/facebook.svg"
                              alt="facebook"
                              width={25}
                              height={25}
                            />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.linkedin.com/" target="_blank">
                            <Image
                              src="/images/icons/linkedin.svg"
                              alt="linkedin"
                              width={25}
                              height={25}
                            />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/" target="_blank">
                            <Image
                              src="/images/icons/instagram.svg"
                              alt="instagram"
                              width={25}
                              height={25}
                            />
                          </a>
                        </li>
                        <li>
                          <a href="https://x.com/" target="_blank">
                            <Image
                              src="/images/icons/x.svg"
                              alt="x"
                              width={25}
                              height={25}
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CommentLists */}
                <CommentLists />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsContentTwo;
