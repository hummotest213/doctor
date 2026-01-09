'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { verifyCredentials, setAuthToken, isAuthenticated } from '@/lib/auth';
import './login.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/admin-portal');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (verifyCredentials(username, password)) {
      setAuthToken();
      router.push('/admin-portal');
    } else {
      setError('İstifadəçi adı və ya şifrə yanlışdır');
      setPassword('');
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>İdarəetmə Paneli</h1>
          <p>Giriş edin</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">İstifadəçi Adı</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="İstifadəçi adını daxil edin"
              disabled={isLoading}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Şifrə</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrəni daxil edin"
              disabled={isLoading}
              autoComplete="current-password"
              required
            />
          </div>



          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Yüklənir...' : 'Giriş'}
          </button>
        </form>
      </div>
    </div>
  );
}



