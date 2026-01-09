import React from "react"; 
import Link from "next/link";
import { redirect } from "next/navigation";

async function handleLogin(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  // TODO: Integrate real authentication here

  // For progressive enhancement, redirect after POST
  redirect("/thank-you");
}

const LoginForm = () => {
  return (
    <>
      <div className="profile-authentication-area pt-140">
        <div className="container">
          <div className="profile-authentication-inner">
            <div className="content">
              <h3>Login to Your Account</h3>
              <p>
                Access your dashboard, manage appointments, and connect with
                licensed doctors—securely and conveniently.
              </p>
            </div>

            <form action={handleLogin}>
              <div className="form-group">
                <label>
                  Email Address <span>(required)</span>
                </label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="e.g. emily@support.com"
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

              <div className="options">
                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>
                <Link href="/forgot-password">Forgot password?</Link>
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
                  Sign In
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
                Don&apos;t have an account?{" "}
                <Link href="/register">Register Now - It&apos;s Free</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
