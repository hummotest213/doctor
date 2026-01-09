import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function handleRegister(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const confirmPassword = String(formData.get("confirmPassword") || "").trim();
  const userType = String(formData.get("userType") || "");
  const agree = formData.get("agree") === "on";

  // TODO: Replace with real registration logic + validation
  redirect("/thank-you");
}

const RegisterForm = () => {
  return (
    <>
      <div className="profile-authentication-area pt-140">
        <div className="container">
          <div className="profile-authentication-inner">
            <div className="content">
              <h3>Create Your Doutor Account</h3>
              <p>
                Access your dashboard, manage appointments, and connect with
                licensed doctors—securely and conveniently.
              </p>
            </div>

            <form action={handleRegister}>
              <div className="form-group">
                <label>
                  Full Name <span>(required)</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="e.g. Emily Carter"
                />
              </div>

              <div className="form-group">
                <label>
                  Email Address <span>(required)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="e.g. emily@support.com"
                />
              </div>

              <div className="form-group">
                <label>
                  Phone Number <span>(required)</span>
                </label>
                <input
                  type="number"
                  name="phone"
                  className="form-control"
                  placeholder="e.g. 1-202-555-0147"
                />
              </div>

              <div className="form-group">
                <label>
                  Password <span>(required)</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="e.g. password123"
                />
              </div>

              <div className="form-group">
                <label>
                  Confirm Password <span>(required)</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="e.g. password123"
                />
              </div>

              <div className="form-group">
                <label>User Type</label>
                <select className="form-control form-select" name="userType">
                  <option value="0">e.g. Patient</option>
                  <option value="1">Doctor</option>
                  <option value="2">Nurse</option>
                  <option value="3">Admin</option>
                </select>
              </div>

              <div className="options">
                <label>
                  <input type="checkbox" name="agree" /> I confirm that I have read and agree to the Privacy Policy.
                </label>
              </div>

              <div className="authentication-btn">
                <button type="submit" className="default-btn">
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
                  Register Now
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
                </button>
              </div>
            </form>
            
            <div className="bottom-text">
              <span>
                Already have an account? <Link href="/login">Login</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
