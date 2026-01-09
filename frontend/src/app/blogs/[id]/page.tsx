"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useBlog } from "@/hooks/useAdminData";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Layout/PageBanner";
import Sidebar from "@/components/Blog/Sidebar";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const BlogDetailsPage = () => {
  const params = useParams();
  const id = parseInt(params.id as string);
  const { language } = useLanguage();
  const { data: blog, loading } = useBlog(id, language);


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

  // Helper function to render content with basic HTML parsing
  const renderContent = (content?: string) => {
    if (!content) return <p>No content available.</p>;
    
    // Simple parsing of common HTML tags and line breaks
    const parts = content.split('\n').map((line, index) => {
      line = line.trim();
      if (!line) return null;
      
      // Convert simple markdown-like syntax to HTML
      let element: React.ReactNode;
      
      if (line.startsWith('# ')) {
        element = <h1 key={index}>{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        element = <h2 key={index}>{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        element = <h3 key={index}>{line.substring(4)}</h3>;
      } else if (line.startsWith('- ')) {
        element = <li key={index}>{line.substring(2)}</li>;
      } else if (line.startsWith('* ')) {
        element = <li key={index}>{line.substring(2)}</li>;
      } else {
        element = <p key={index}>{line}</p>;
      }
      
      return element;
    });
    
    return <>{parts.filter(Boolean)}</>;
  };

  return (
    <>
      <Navbar />

      <div className="blog-details-area ptb-140">
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-xl-8 col-md-12">

              {/* Blog Display */}
              {loading && (
                <div className="text-center py-5">
                  <p className="text-muted">Loading blog...</p>
                </div>
              )}

              {!loading && !blog && (
                <div className="text-center py-5">
                  <p className="text-muted">Blog not found.</p>
                </div>
              )}

              {!loading && blog && (
                <div className="blog-details-desc">
                  {/* Blog Header with Image */}
                  <div className="blog-details-header">
                    {blog.image_url ? (
                      <img
                        src={getImageUrl(blog.image_url) || '/images/placeholder.jpg'}
                        alt={blog.title}
                        style={{ objectFit: 'cover', width: '100%', height: 'auto', maxHeight: '500px' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#999' }}>No image available</span>
                      </div>
                    )}
                    <ul className="meta">
                      <li>{blog.category}</li>
                      <li>{formatDate(blog.created_at)}</li>
                    </ul>
                  </div>

                  {/* Blog Content */}
                  <div className="blog-details-content">
                    <h2>{blog.title}</h2>
                    
                    {/* Short Description/Lead */}
                    {blog.short_description && (
                      <p className="lead">{blog.short_description}</p>
                    )}

                    {/* Introduction Section */}
                    <h3>Introduction</h3>
                    {blog.content ? renderContent(blog.content) : <p>No content available.</p>}

                    {/* Content Divider with Images */}
                    <div className="row justify-content-center mt-4 mb-4">
                      <div className="col-lg-6 col-md-6">
                        {blog.image_url ? (
                          <img
                            src={getImageUrl(blog.image_url) || '/images/placeholder.jpg'}
                            alt={blog.title}
                            style={{ objectFit: 'cover', width: '100%', height: 'auto', maxHeight: '400px' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#999' }}>No image available</span>
                          </div>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                          <h4>Key Takeaways</h4>
                          <ul className="list">
                            <li>
                              <img
                                src="/images/check.svg"
                                alt="check"
                                style={{ width: '16px', height: '12px' }}
                              />
                              <span>Professional medical guidance</span>
                            </li>
                            <li>
                              <img
                                src="/images/check.svg"
                                alt="check"
                                style={{ width: '16px', height: '12px' }}
                              />
                              <span>Trusted healthcare expertise</span>
                            </li>
                            <li>
                              <img
                                src="/images/check.svg"
                                alt="check"
                                style={{ width: '16px', height: '12px' }}
                              />
                              <span>Comprehensive health solutions</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Additional sections can be added based on blog structure */}
                    <h3>Conclusion</h3>
                    <p>
                      This blog post provides valuable insights into the topic. For more information or to schedule a consultation, please contact us today.
                    </p>
                  </div>

                  {/* Article Footer with Tags and Share */}
                  <div className="article-footer">
                    <div className="row justify-content-center align-items-center">
                      <div className="col-lg-7 col-md-7">
                        <ul className="tags">
                          <li>
                            <span>Tags:</span>
                          </li>
                          <li>
                            <Link href={`/blogs?category=${blog.category}`}>{blog.category}</Link>
                          </li>
                        </ul>
                      </div>

                      <div className="col-lg-5 col-md-5">
                        <ul className="social">
                          <li>
                            <span>Share:</span>
                          </li>
                          <li>
                            <a 
                              href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="/images/icons/facebook.svg"
                                alt="facebook"
                                style={{ width: '25px', height: '25px' }}
                              />
                            </a>
                          </li>
                          <li>
                            <a 
                              href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? window.location.href : ''}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="/images/icons/linkedin.svg"
                                alt="linkedin"
                                style={{ width: '25px', height: '25px' }}
                              />
                            </a>
                          </li>
                          <li>
                            <a 
                              href={`https://instagram.com`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="/images/icons/instagram.svg"
                                alt="instagram"
                                style={{ width: '25px', height: '25px' }}
                              />
                            </a>
                          </li>
                          <li>
                            <a 
                              href={`https://x.com/intent/tweet?url=${typeof window !== 'undefined' ? window.location.href : ''}&text=${blog.title}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="/images/icons/x.svg"
                                alt="x"
                                style={{ width: '25px', height: '25px' }}
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsPage;
