"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useBlogs } from "@/hooks/useAdminData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const OurBlog = () => {
  const { t, language } = useLanguage();
  const { data: blogsFromAPI = [], loading } = useBlogs(language);

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return new Date().toLocaleDateString();
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Helper function to get full image URL
  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads/')) return `${API_BASE_URL}${imagePath}`;
    return imagePath;
  };

  // Use API data, limit to 3 posts
  const blogData = (blogsFromAPI ?? []).slice(0, 3).map(blog => ({
    id: blog.id,
    imageSrc: blog.image_url,
    category: blog.category,
    date: formatDate(blog.created_at),
    title: blog.title,
  }));

  return (
    <>
      <div className="blog-area ptb-140">
        <div className="container">
          <div className="section-title">
            <div className="row justify-content-center align-items-center g-4">
              <div className="col-lg-7 col-md-12">
                <div className="left">
                  <span className="sub">{t("blog.subtitle")}</span>
                  <h2>
                    {t("blog.title")}
                  </h2>
                </div>
              </div>
              <div className="col-lg-5 col-md-12">
                <div className="right">
                  <p>
                    {t("blog.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-5">
              <p className="text-muted">Loading blogs...</p>
            </div>
          )}

          {!loading && blogData.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">No blogs available yet.</p>
            </div>
          )}

          <div className="row justify-content-center g-4">
            {blogData.map((post) => (
              <div key={post.id} className="col-lg-4 col-md-6">
                <div className="blog-card">
                  <div className="image">
                    <Link href={`/blogs/${post.id}`}>
                      {post.imageSrc ? (
                        <Image
                          src={getImageUrl(post.imageSrc) || '/images/placeholder.jpg'}
                          alt={post.title}
                          width={832}
                          height={832}
                          style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: '#999' }}>No image available</span>
                        </div>
                      )}
                    </Link>
                  </div>
                  <div className="content">
                    <ul className="meta">
                      <li>
                        <Link href={`/blogs/${post.id}`}>{post.category}</Link>
                      </li>
                      <li>{post.date}</li>
                    </ul>
                    <h3>
                      <Link href={`/blogs/${post.id}`}>{post.title}</Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OurBlog;
