'use client';

import React, { useState, useEffect } from 'react';

interface Blog {
  id?: number;
  title: string | null;
  category: string | null;
  short_description: string | null;
  content: string | null;
  image_url?: string | null;
}

interface BlogsSectionProps {
  language: string;
  showAlert: (message: string, type: 'success' | 'error') => void;
}

const BlogsSection: React.FC<BlogsSectionProps> = ({ language, showAlert }) => {
  const getApiUrl = () => {
    let url = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    if (!url.endsWith('/api')) {
      url = url.endsWith('/') ? url + 'api' : url + '/api';
    }
    return url;
  };
  const API_URL = getApiUrl();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Blog>({
    title: null,
    category: null,
    short_description: null,
    content: null,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadBlogs(language);
  }, [language]);

  const loadBlogs = async (lang?: string) => {
    try {
      setIsLoading(true);
      const fetchLang = lang || language;
      console.log(`Loading blogs for language: ${fetchLang}`);
      
      const response = await fetch(`${API_URL}/blogs?lang=${fetchLang}`);
      if (!response.ok) throw new Error('Failed to load blogs');
      
      const data = await response.json();
      console.log('Loaded blogs:', data);
      
      setBlogs(Array.isArray(data) ? data : []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading blogs:', error);
      setIsLoading(false);
      showAlert('Blogları yükləmək mümkün olmadı', 'error');
    }
  };

  const openBlogModal = (blogId?: number) => {
    if (blogId) {
      setCurrentBlogId(blogId);
      const blog = blogs.find(b => b.id === blogId);
      if (blog) {
        setFormData({
          title: blog.title,
          category: blog.category,
          short_description: blog.short_description,
          content: blog.content,
          image_url: blog.image_url,
        });
      }
    } else {
      setCurrentBlogId(null);
      setFormData({
        title: null,
        category: null,
        short_description: null,
        content: null,
      });
    }
    setImageFile(null);
    setCurrentStep(1);
    setShowModal(true);
  };

  const closeBlogModal = () => {
    setShowModal(false);
    setCurrentBlogId(null);
    setCurrentStep(1);
    setImageFile(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (!formData.title || formData.title.trim() === '' || !formData.category || formData.category.trim() === '' || !formData.short_description || formData.short_description.trim() === '') {
      showAlert('Lütfən bütün lazimi sahələri doldurun', 'error');
      return;
    }
    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSaveBlog = async () => {
    if (!formData.title || formData.title.trim() === '' || !formData.category || formData.category.trim() === '' || !formData.short_description || formData.short_description.trim() === '') {
      showAlert('Lütfən bütün lazimi sahələri doldurun', 'error');
      return;
    }

    try {
      const formDataToSend = new FormData();
      if (formData.title && formData.title.trim() !== '') {
        formDataToSend.append('title', formData.title.trim());
      }
      if (formData.category && formData.category.trim() !== '') {
        formDataToSend.append('category', formData.category.trim());
      }
      if (formData.short_description && formData.short_description.trim() !== '') {
        formDataToSend.append('short_description', formData.short_description.trim());
      }
      if (formData.content && formData.content.trim() !== '') {
        formDataToSend.append('content', formData.content.trim());
      }
      formDataToSend.append('language_code', language);

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const url = currentBlogId ? `${API_URL}/blogs/${currentBlogId}` : `${API_URL}/blogs`;
      const method = currentBlogId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to save blog');

      showAlert(currentBlogId ? 'Blog yeniləndi!' : 'Blog əlavə edildi!', 'success');
      closeBlogModal();
      
      // Reload blogs with proper language parameter
      await loadBlogs(language);
    } catch (error) {
      console.error('Error saving blog:', error);
      showAlert('Blogu yadda saxlamaq mümkün olmadı', 'error');
    }
  };

  const handleDeleteBlog = async (blogId: number) => {
    if (!confirm('Bu blogu silmək istədiyinizə əminsiniz?')) return;

    try {
      const response = await fetch(`${API_URL}/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete blog');

      showAlert('Blog silindi!', 'success');
      
      // Reload blogs with proper language parameter
      await loadBlogs(language);
    } catch (error) {
      console.error('Error deleting blog:', error);
      showAlert('Blogu silmək mümkün olmadı', 'error');
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">Blogların İdarə Edilməsi</h2>

      <button className="btn btn-primary" onClick={() => openBlogModal()}>
        + Yeni Blog Əlavə Et
      </button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Başlıq</th>
              <th>Kateqoriya</th>
              <th>Təsvir</th>
              <th>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.short_description ? blog.short_description.substring(0, 50) : 'N/A'}...</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-primary"
                      onClick={() => openBlogModal(blog.id)}
                    >
                      Redaktə et
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => blog.id && handleDeleteBlog(blog.id)}
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Blog Modal */}
      {showModal && (
        <div className="modal-overlay show">
          <div className="modal-content">
            <button className="close-modal" onClick={closeBlogModal}>&times;</button>
            <h3>{currentBlogId ? 'Blogu Redaktə et' : 'Blog Əlavə Et'}</h3>

            <div className="step-indicator">
              Addım {currentStep}: {currentStep === 1 ? 'Ümumi Məlumat' : 'Məzmun Detalları'}
            </div>

            {currentStep === 1 && (
              <>
                <div className="form-group">
                  <label>Başlıq</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    placeholder="Blog başlığı"
                  />
                </div>

                <div className="form-group">
                  <label>Kateqoriya</label>
                  <select
                    name="category"
                    value={formData.category || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Kateqoriya seçin</option>
                    <option value="Health">Sağlamlıq</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Parenting">Valideynlik</option>
                    <option value="Medical">Tibbi</option>
                    <option value="Lifestyle">Həyat Tərzi</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Qısa Təsvir</label>
                  <textarea
                    name="short_description"
                    value={formData.short_description || ''}
                    onChange={handleInputChange}
                    placeholder="Blog haqqında qısa məlumat"
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label>Şəkil Yüklə</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                  {formData.image_url && (
                    <p className="image-hint">Cari şəkil: {formData.image_url}</p>
                  )}
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="form-group">
                  <label>Məzmun (Ətraflı)</label>
                  <textarea
                    name="content"
                    value={formData.content || ''}
                    onChange={handleInputChange}
                    placeholder="Blog məzmununu yazın. Paragrafları boş sətirlə ayrın."
                    rows={6}
                  />
                </div>
              </>
            )}

            <div className="btn-group">
              {currentStep === 2 && (
                <button className="btn btn-secondary" onClick={handlePrevStep}>
                  Geri
                </button>
              )}
              {currentStep === 1 && (
                <button className="btn btn-primary" onClick={handleNextStep}>
                  Sonraki
                </button>
              )}
              {currentStep === 2 && (
                <button className="btn btn-success" onClick={handleSaveBlog}>
                  Blogu Yadda Saxla
                </button>
              )}
              <button className="btn btn-secondary" onClick={closeBlogModal}>
                Ləğv et
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsSection;
