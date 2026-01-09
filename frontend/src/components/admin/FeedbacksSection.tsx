'use client';

import React, { useState, useEffect } from 'react';

interface Feedback {
  id?: number;
  name: string | null;
  location: string | null;
  text: string | null;
}

interface FeedbacksSectionProps {
  language: string;
  showAlert: (message: string, type: 'success' | 'error') => void;
}

const FeedbacksSection: React.FC<FeedbacksSectionProps> = ({ language, showAlert }) => {
  const API_URL = 'https://server.ginekoloqayten.online/api';

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentFeedbackId, setCurrentFeedbackId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Feedback>({
    name: null,
    location: null,
    text: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadFeedbacks(language);
  }, [language]);

  const loadFeedbacks = async (lang?: string) => {
    try {
      setIsLoading(true);
      const fetchLang = lang || language;
      console.log(`Loading feedbacks for language: ${fetchLang}`);
      
      const response = await fetch(`${API_URL}/feedbacks?lang=${fetchLang}`);
      if (!response.ok) throw new Error('Failed to load feedbacks');
      
      const data = await response.json();
      console.log('Loaded feedbacks:', data);
      
      setFeedbacks(Array.isArray(data) ? data : []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading feedbacks:', error);
      setIsLoading(false);
      showAlert('Rəyləri yükləmək mümkün olmadı', 'error');
    }
  };

  const openFeedbackModal = (feedbackId?: number) => {
    if (feedbackId) {
      setCurrentFeedbackId(feedbackId);
      const feedback = feedbacks.find(f => f.id === feedbackId);
      if (feedback) {
        setFormData({
          name: feedback.name,
          location: feedback.location,
          text: feedback.text,
        });
      }
    } else {
      setCurrentFeedbackId(null);
      setFormData({
        name: null,
        location: null,
        text: null,
      });
    }
    setShowModal(true);
  };

  const closeFeedbackModal = () => {
    setShowModal(false);
    setCurrentFeedbackId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveFeedback = async () => {
    if (!formData.name || formData.name.trim() === '' || !formData.location || formData.location.trim() === '' || !formData.text || formData.text.trim() === '') {
      showAlert('Lütfən bütün lazimi sahələri doldurun', 'error');
      return;
    }

    try {
      const url = currentFeedbackId
        ? `${API_URL}/feedbacks/${currentFeedbackId}`
        : `${API_URL}/feedbacks`;
      const method = currentFeedbackId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, ...formData }),
      });

      if (!response.ok) throw new Error('Failed to save feedback');

      showAlert(
        currentFeedbackId
          ? `Rəy ${language.toUpperCase()} dildə yeniləndi!`
          : `Rəy ${language.toUpperCase()} dildə əlavə edildi!`,
        'success'
      );
      closeFeedbackModal();
      
      // Reload feedbacks with proper language parameter
      await loadFeedbacks(language);
    } catch (error) {
      console.error('Error saving feedback:', error);
      showAlert('Rəyi yadda saxlamaq mümkün olmadı', 'error');
    }
  };

  const handleDeleteFeedback = async (feedbackId: number) => {
    if (!confirm('Bu rəyi silmək istədiyinizə əminsiniz?')) return;

    try {
      const response = await fetch(`${API_URL}/feedbacks/${feedbackId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete feedback');

      showAlert('Rəy silindi!', 'success');
      
      // Reload feedbacks with proper language parameter
      await loadFeedbacks(language);
    } catch (error) {
      console.error('Error deleting feedback:', error);
      showAlert('Rəyi silmək mümkün olmadı', 'error');
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">Xəstə Rəylərinin İdarə Edilməsi</h2>

      <button className="btn btn-primary" onClick={() => openFeedbackModal()}>
        + Yeni Rəy Əlavə Et
      </button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Ad</th>
              <th>Məkan</th>
              <th>Rəy</th>
              <th>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(feedback => (
              <tr key={feedback.id}>
                <td>{feedback.name}</td>
                <td>{feedback.location}</td>
                <td>{feedback.text ? feedback.text.substring(0, 50) : 'N/A'}...</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-primary"
                      onClick={() => openFeedbackModal(feedback.id)}
                    >
                      Redaktə Et
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => feedback.id && handleDeleteFeedback(feedback.id)}
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

      {/* Feedback Modal */}
      {showModal && (
        <div className="modal-overlay show">
          <div className="modal-content">
            <button className="close-modal" onClick={closeFeedbackModal}>&times;</button>
            <h3>{currentFeedbackId ? 'Rəyi Redaktə Et' : 'Rəy Əlavə Et'}</h3>

            <div className="form-group">
              <label>Xəstənin Adı</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                placeholder="Xəstənin adı"
              />
            </div>

            <div className="form-group">
              <label>Məkan</label>
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleInputChange}
                placeholder="Məkan"
              />
            </div>

            <div className="form-group">
              <label>Rəy Mətni</label>
              <textarea
                name="text"
                value={formData.text || ''}
                onChange={handleInputChange}
                placeholder="Rəy mətni"
              />
            </div>

            <div className="btn-group">
              <button className="btn btn-success" onClick={handleSaveFeedback}>
                Rəyi Yadda Saxla
              </button>
              <button className="btn btn-secondary" onClick={closeFeedbackModal}>
                Ləğv et
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbacksSection;
