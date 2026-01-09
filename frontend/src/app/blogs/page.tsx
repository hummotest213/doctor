"use client";

import BlogGrid from "@/components/Blog/BlogGrid";
import SubscribeForm from "@/components/Common/SubscribeForm";
import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Layout/PageBanner";
export default function Page() {
  return (
    <>
      <Navbar />

        <BlogGrid />
    </>
  );
}
