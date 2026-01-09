import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="profile-authentication-area pt-140">
      <div className="container">
        <div className="profile-authentication-inner" style={{ textAlign: "center" }}>
          <h2>Təşəkkürlər!</h2>
          <p>Müraciətiniz qeydə alındı. Ən qısa zamanda sizinlə əlaqə saxlanılacaq.</p>
          <div style={{ marginTop: 24 }}>
            <Link className="link-btn" href="/">Geri qayıt</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

