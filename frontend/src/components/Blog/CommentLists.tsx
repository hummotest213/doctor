import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

async function handleComment(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const website = String(formData.get("website") || "").trim();
  const comment = String(formData.get("comment") || "").trim();
  const remember = formData.get("remember") === "on";

  // TODO: Persist comment to backend
  redirect("/thank-you");
}

const CommentLists = () => {
  return (
    <>
      <div className="article-comment">
        <h3 className="title">Comment (2)</h3>

        <div className="comment-list">
          <div className="comment-author d-flex align-items-center gap-3">
            <Image
              src="/images/users/user10.png"
              alt="User"
              width={57}
              height={57}
            />
            <div>
              <h5>Jonathan Chancellor</h5>
              <p>December 18, 2025</p>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam lectus
            purus ultricies neque. Aenean nunc nisi, vel dictum.adipiscing elit.
          </p>
          <button
            type="button"
            className="comment-reply-link border-0"
            style={{ fontSize: "14px" }}
          >
            Reply
          </button>

          <div className="comment-list reply">
            <div className="comment-author d-flex align-items-center gap-3">
              <Image
                src="/images/users/user13.png"
                alt="User"
                width={57}
                height={57}
              />
              <div>
                <h5>Admin</h5>
                <p>December 18, 2025</p>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
              lectus purus ultricies neque. Aenean nunc nisi, vel
              dictum.adipiscing elit.
            </p>
            <button
              type="button"
              className="comment-reply-link border-0"
              style={{ fontSize: "14px" }}
            >
              Reply
            </button>
          </div>
        </div>

        <div className="comment-list">
          <div className="comment-author d-flex align-items-center gap-3">
            <Image
              src="/images/users/user11.png"
              alt="User"
              width={57}
              height={57}
            />
            <div>
              <h5>Jhon Smith</h5>
              <p>December 18, 2025</p>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam lectus
            purus ultricies neque. Aenean nunc nisi, vel dictum.adipiscing elit.
          </p>
          <button
            type="button"
            className="comment-reply-link border-0"
            style={{ fontSize: "14px" }}
          >
            Reply
          </button>
        </div>
      </div>

      <div className="leave-form">
        <div className="content">
          <h2>Leave a Comment</h2>
          <p>
            Your email address will not be published. Required fields are
            marked*
          </p>
        </div>

        <form action={handleComment}>
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
              Website <span>(optional)</span>
            </label>
            <input
              type="text"
              name="website"
              className="form-control"
              placeholder="e.g. https://example.com"
            />
          </div>
          <div className="form-group">
            <label>Write your comment</label>
            <textarea
              name="comment"
              className="form-control"
              placeholder="e.g. I found this information helpful!"
            ></textarea>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="remember"
                value="on"
                id="checkDefault"
              />
              <label className="form-check-label" htmlFor="checkDefault">
                Save my name, email, and website in this browser for the next
                time I comment.
              </label>
            </div>
          </div>

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
            Send Now
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
        </form>
      </div>
    </>
  );
};

export default CommentLists;
