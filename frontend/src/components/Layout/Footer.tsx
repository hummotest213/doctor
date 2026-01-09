"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// Define interfaces for our data structure
interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface FooterLink {
  text: string;
  url: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface AppButton {
  name: string;
  url: string;
  image: string;
  alt: string;
}

interface FooterData {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  description: string;
  socialLinks: SocialLink[];
  sections: FooterSection[];
  appButtons: AppButton[];
  copyright: {
    text: string;
    owner: string;
    ownerUrl: string;
    ownedBy: string;
  };
  complianceBadges: string[];
}

function Footer() {
  const { t } = useLanguage();

  // Dynamic data object
  const footerData: FooterData = {
    logo: {
      src: "/images/logo.png", // Ensure this path is correct
      alt: "Doutor",
      width: 60,
      height: 60,
    },
    description: t("footer.description"),
    socialLinks: [
      {
        platform: "facebook",
        url: "https://www.facebook.com/",
        icon: "/images/icons/facebook.svg",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/",
        icon: "/images/icons/linkedin.svg",
      },
      {
        platform: "instagram",
        url: "https://www.instagram.com/",
        icon: "/images/icons/instagram.svg",
      },
      {
        platform: "x",
        url: "https://x.com/",
        icon: "/images/icons/x.svg",
      },
    ],
    sections: [
      {
        title: t("footer.sections.company.title"),
        links: [
          { text: t("footer.sections.company.links.about"), url: "/about-us" },
          { text: t("footer.sections.company.links.doctors"), url: "/about-us" },
          { text: t("footer.sections.company.links.services"), url: "/services" },
          { text: t("footer.sections.company.links.blog"), url: "/blogs" },
          { text: t("footer.sections.company.links.contact"), url: "/contact-us" },
        ],
      },
      {
        title: t("footer.sections.services.title"),
        links: [
          { text: t("footer.sections.services.links.general"), url: "/services" },
          { text: t("footer.sections.services.links.mental"), url: "/services" },
          { text: t("footer.sections.services.links.derma"), url: "/services" },
          { text: t("footer.sections.services.links.pediatrics"), url: "/services" },
          { text: t("footer.sections.services.links.chronic"), url: "/services" },
        ],
      },
      {
        title: t("footer.sections.support.title"),
        links: [
          { text: t("footer.sections.support.links.faq"), url: "/contact-us" },
          { text: t("footer.sections.support.links.contact"), url: "/contact-us" },
          { text: t("footer.sections.support.links.technical"), url: "/book-an-appointment" },
        ],
      },
      {
        title: t("footer.sections.contact.title"),
        links: [
          {
            text: `Email: ${t("contact.email.content")}`,
            url: `mailto:${t("contact.email.content")}`,
            isExternal: true,
          },
          {
            text: `Phone: ${t("contact.phone.content")}`,
            url: "tel:18004567890",
            isExternal: true,
          },
        ],
      },
    ],
    appButtons: [
      {
        name: "Google Play",
        url: "https://play.google.com/store/apps",
        image: "/images/app/google-play.svg",
        alt: "google-play",
      },
      {
        name: "App Store",
        url: "https://www.apple.com/app-store/",
        image: "/images/app/app-store.svg",
        alt: "app-store",
      },
    ],
    copyright: {
      text: t("footer.copyright.text"),
      owner: "Neotwork", // FIXED: Added text so the link is visible and clickable
      ownerUrl: "https://www.neotwork.com",
      ownedBy: t("footer.copyright.ownedBy"),
    },
    complianceBadges: Array.isArray(t("footer.badges")) ? t("footer.badges") : [],
  };

  return (
    <footer className="footer-area">
      <div className="ptb-140">
        <div className="container">
          <div className="row justify-content-center g-4">
            {/* Top Logo Section: Same Row, Bold, Larger Text */}
            <div className="col-12 mb-5">
              <Link href="/" className="navbar-brand d-flex align-items-center text-decoration-none">
                <Image
                  src={footerData.logo.src}
                  alt={footerData.logo.alt}
                  width={footerData.logo.width}
                  height={footerData.logo.height}
                />
                <p className="mb-0 ms-3 fw-bold fs-3 text-dark">
                  Dr. Aytən Abdullayeva
                </p>
              </Link>
            </div>

            <div className="col-lg-9 col-md-12">
              <div className="row justify-content-center g-4">
                {footerData.sections.map((section, index) => (
                  <div className="col-lg-3 col-sm-6" key={index}>
                    <div className="single-footer-widget">
                      <h3>{section.title}</h3>
                      <ul className="links">
                        {section.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            {link.isExternal ? (
                              <a href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.text}
                              </a>
                            ) : (
                              <Link href={link.url}>{link.text}</Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-3 col-md-12">
              {/* Optional: Add Social Icons or App Buttons here if needed */}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright-area">
          <div className="row justify-content-center align-items-center g-4">
            <div className="col-lg-6 col-md-12">
              <p className="mb-0">
                <a
                  href={footerData.copyright.ownerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-reset fw-bold"
                  style={{
                    position: 'relative',
                    zIndex: 20,
                    cursor: 'pointer'
                  }}
                >
                  © <span>{footerData.copyright.text}</span> {footerData.copyright.ownedBy}
                </a>
              </p>
            </div>
            <div className="col-lg-6 col-md-12">
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;