import React from "react";
import Link from "next/link";

function PricingPlanThree() {
  // Dynamic pricing data
  const pricingData = [
    {
      id: 1,
      title: "With Insurance",
      subtitle: "See if we accept your plan in seconds",
      hasInsurance: true,
      insuranceOptions: [
        { value: "0", label: "Select your insurance plan" },
        { value: "1", label: "Health Insurance" },
        { value: "2", label: "Life Insurance" },
      ],
      services: [
        { type: "General Medical", cost: "$0 - $60" },
        { type: "Therapy (30-45 mins)", cost: "$0 - $120" },
        { type: "Psychiatry (Initial)", cost: "$0 - $200" },
      ],
      buttons: [
        {
          text: "Create Your Account",
          href: "/register",
          className: "default-btn",
        },
        {
          text: "Visit Your Provider Portal",
          href: "/login",
          className: "link-btn",
        },
      ],
    },
    {
      id: 2,
      title: "Without Insurance",
      subtitle: "No insurance required. No surprise bills.",
      hasInsurance: false,
      services: [
        { type: "General Medical Visit", cost: "$69 / visit" },
        { type: "Therapy Session", cost: "$139 / 45 min session" },
        { type: "Psychiatry Evaluation", cost: "$259 / initial" },
        { type: "Psych Follow-up", cost: "$129 / 15 min" },
      ],
      buttons: [
        {
          text: "Book A Visit Now",
          href: "/book-an-appointment",
          className: "default-btn",
        },
      ],
    },
  ];

  // Function to determine wrap class based on index
  const getWrapClass = (index: number): string => {
    const wrapClasses = ["style2", "wrap2 style3"];
    return wrapClasses[index % wrapClasses.length];
  };

  return (
    <>
      <div className="pricing-area ptb-140 ">
        <div className="container">
          <div className="row justify-content-center g-4">
            {pricingData.map((plan, index) => (
              <div key={plan.id} className="col-xl-6 col-md-12">
                <div className={`pricing-card ${getWrapClass(index)}`}>
                  <div className="head">
                    <h3>{plan.title}</h3>
                    <p>{plan.subtitle}</p>
                  </div>

                  {/* Insurance dropdown */}
                  {plan.hasInsurance && (
                    <div className="price-select">
                      <select className="form-select">
                        {plan.insuranceOptions?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <ul className="list">
                    <li>
                      <h5>Type of Care</h5>
                      <h5>
                        {plan.hasInsurance
                          ? "Your Cost (Estimate)"
                          : "Flat Fee"}
                      </h5>
                    </li>
                    {plan.services.map((service, idx) => (
                      <li key={idx}>
                        <span>{service.type}</span>
                        <b>{service.cost}</b>
                      </li>
                    ))}
                  </ul>

                  <div className="price-btn">
                    {plan.buttons.map((button, idx) => (
                      <Link
                        key={idx}
                        href={button.href}
                        className={button.className}
                      >
                        {button.className === "default-btn" ? (
                          <>
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
                            {button.text}
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
                          </>
                        ) : (
                          <>
                            {button.text}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="13"
                              viewBox="0 0 13 13"
                              fill="none"
                            >
                              <path
                                d="M12.5 0H0.5C0.224 0 0 0.224 0 0.5C0 0.776 0.224 1 0.5 1H11.2928L0.1465 12.1465C-0.04875 12.3417 -0.04875 12.6583 0.1465 12.8535C0.24425 12.9513 0.372 13 0.5 13C0.628 13 0.756 12.9513 0.8535 12.8535L12 1.707V12.5C12 12.776 12.224 13 12.5 13C12.776 13 13 12.776 13 12.5V0.5C13 0.224 12.776 0 12.5 0Z"
                                fill="#336AEA"
                              />
                            </svg>
                          </>
                        )}
                      </Link>
                    ))}
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

export default PricingPlanThree;
