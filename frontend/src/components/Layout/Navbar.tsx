"use client";

import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; 
import { useLanguage } from "@/context/LanguageContext";
import { useNavbar } from "@/hooks/useAdminData";
import LanguageSwitcher from "@/components/Layout/LanguageSwitcher";
// Menus data
import { menus } from "../../components/Layout/Menus";

// 1. Define interfaces for your menu structure to fix the Type Error
interface DropdownItem {
  title: string;
  href: string;
}

interface MenuItem {
  id: string;
  titleKey: string;
  isDropdown: boolean;
  href?: string;
  dropdownItems?: DropdownItem[]; // The '?' means this is optional
}

function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { data: navbarData, loading } = useNavbar();

  // Fallback values with proper handling of null/undefined
  const navbarInfo = {
    logo_image_url: navbarData?.logo_image_url || "/images/logo.png",
    logo_text: navbarData?.logo_text || "Dr. Aytən Abdullayeva",
  };

  // Sticky navbar effect
  useEffect(() => {
    const element = document.getElementById("navbar");

    const onScroll = () => {
      if (!element) return;
      if (window.scrollY > 170) {
        element.classList.add("sticky");
      } else {
        element.classList.remove("sticky");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      element?.classList.remove("sticky");
    };
  }, []);

  // Offcanvas state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Check if a link is active
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className="navbar navbar-expand-xl" id="navbar">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <Image
              src={navbarInfo.logo_image_url}
              alt="Doutor"
              width={60}
              height={60}
            />
            <p className="mb-0 ms-2 fw-bold fs-4">
              {navbarInfo.logo_text}
            </p>
          </Link>
          <button className="navbar-toggler" onClick={handleShow}>
            <span className="burger-menu">
              <span className="icon-bar top-bar"></span>
              <span className="icon-bar middle-bar"></span>
              <span className="icon-bar bottom-bar"></span>
            </span>
          </button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              {/* Cast menus to MenuItem[] to ensure TypeScript knows the structure */}
              {(menus as MenuItem[]).map((item) => (
                <li key={item.id} className="nav-item">
                  {item.isDropdown ? (
                    <>
                      <Link
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="dropdown-toggle nav-link"
                      >
                        {t(item.titleKey)}{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="8"
                          viewBox="0 0 14 8"
                          fill="none"
                        >
                          <path
                            d="M13 1.5L7 6.5L1 1.5"
                            stroke="#5A6A85"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                      <ul className="dropdown-menu">
                        {/* The Optional Chaining (?.) handles cases where dropdownItems might be missing */}
                        {item.dropdownItems?.map((dropdownItem, index) => (
                          <li key={index} className="nav-item">
                            <Link
                              href={dropdownItem.href}
                              className={`nav-link ${isActive(dropdownItem.href) ? "active" : ""
                                }`}
                            >
                              {dropdownItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className={`nav-link ${isActive(item.href || "") ? "active" : ""
                        }`}
                    >
                      {t(item.titleKey)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="others-option align-items-center d-none d-sm-flex">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "300px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Image
              src="/images/logo.svg"
              alt="Doutor"
              width={134}
              height={35}
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mobile-menu">
            <div className="others-option d-flex align-items-center gap-3 mb-3">
              <div className="option-item">
                <LanguageSwitcher />
              </div>
            </div>
            <ul className="mobile-menu-list">
              {(menus as MenuItem[]).map((item) => (
                <li key={item.id} className="nav-item">
                  {item.isDropdown ? (
                    <>
                      <div
                        className="dropdown-toggle nav-link"
                        onClick={() => toggleDropdown(item.id)}
                      >
                        <span>{t(item.titleKey)}</span>{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="8"
                          viewBox="0 0 14 8"
                          fill="none"
                          className={`transition-transform duration-300 ${openDropdown === item.id ? "rotate-180" : ""
                            }`}
                        >
                          <path
                            d="M13 1.5L7 6.5L1 1.5"
                            stroke="#5A6A85"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <ul
                        className={`dropdown-menu ${openDropdown === item.id ? "show" : ""
                          }`}
                      >
                        {item.dropdownItems?.map((dropdownItem, index) => (
                          <li key={index} className="nav-item">
                            <Link
                              href={dropdownItem.href}
                              className={`nav-link ${isActive(dropdownItem.href) ? "active" : ""
                                }`}
                              onClick={handleClose}
                            >
                              {dropdownItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className={`nav-link ${isActive(item.href || "") ? "active" : ""
                        }`}
                      onClick={handleClose}
                    >
                      {t(item.titleKey)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Navbar;