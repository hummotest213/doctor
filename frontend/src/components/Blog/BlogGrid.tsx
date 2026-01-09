"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useBlogs } from "@/hooks/useAdminData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Define the interface for the blog post
interface BlogPost {
  id: number;
  image_url?: string;
  category: string;
  created_at?: string;
  title: string;
}

const BlogGrid = () => {
  const { t, language } = useLanguage();
  const { data: blogsFromAPI = [], loading } = useBlogs(language);
  const blogAreaRef = useRef<HTMLDivElement>(null);

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

  // Use API data if available, otherwise fall back to static data
  const blogData: BlogPost[] = blogsFromAPI && blogsFromAPI.length > 0 ? blogsFromAPI.map(blog => ({
    id: blog.id,
    image_url: blog.image_url,
    category: blog.category,
    created_at: blog.created_at,
    title: blog.title,
  })) : [];
  
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogData.length / postsPerPage);

  const showPagination = blogData.length > postsPerPage;

  const pageNumbers = [];
  const maxVisiblePages = 9;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const scrollToTop = () => {
    if (blogAreaRef.current) {
      blogAreaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
    scrollToTop();
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    scrollToTop();
  };

  return (
    <div ref={blogAreaRef} className="blog-area ptb-140">
      <div className="container">
        <div className="row justify-content-center g-4">
          {loading && (
            <div className="col-lg-12 text-center py-5">
              <p className="text-muted">Loading blogs...</p>
            </div>
          )}
          
          {!loading && blogData.length === 0 && (
            <div className="col-lg-12 text-center py-5">
              <p className="text-muted">No blogs available yet.</p>
            </div>
          )}

          {/* Display blog posts */}
          {currentPosts.map((post: BlogPost) => (
            <div key={post.id} className="col-lg-4 col-md-6">
              <div className="blog-card">
                <div className="image">
                  <Link href={`/blogs/${post.id}`}>
                    {post.image_url ? (
                      <Image
                        src={getImageUrl(post.image_url) || '/images/placeholder.jpg'}
                        alt={post.title}
                        width={832}
                        height={832}
                        style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                      />
                    ) : (
                      <div className="placeholder-image" style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                    <li>{formatDate(post.created_at)}</li>
                  </ul>
                  <h3>
                    <Link href={`/blogs/${post.id}`}>{post.title}</Link>
                  </h3>
                </div>
              </div>
            </div>
          ))}

          {showPagination && (
            <div className="col-lg-12 col-md-12">
              <div className="pagination-area">
                <button
                  type="button"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={currentPage === 1 ? "disabled" : ""}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M13 19L7 12L13 5" stroke="#63667D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path opacity="0.5" d="M17 19L11 12L17 5" stroke="#63667D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "active" : ""}
                  >
                    {number}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={currentPage === totalPages ? "disabled" : ""}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11 19L17 12L11 5" stroke="#63667D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path opacity="0.5" d="M7 19L13 12L7 5" stroke="#63667D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogGrid;