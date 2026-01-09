/**
 * Custom Hooks for Admin Data
 * Reusable hooks for fetching data from backend
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Hero, Navbar, About, Service, Appointment, Contact, Feedback, Blog } from '@/lib/api';
import * as api from '@/lib/api';

interface UseDataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseDataReturn<T> extends UseDataState<T> {
  refetch: () => Promise<void>;
}

/**
 * Generic hook for fetching data with caching
 */
export function useData<T>(
  fetchFn: () => Promise<T>,
  dependency: any[] = []
): UseDataReturn<T> {
  const [state, setState] = useState<UseDataState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const refetch = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const result = await fetchFn();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  }, [fetchFn]);

  useEffect(() => {
    refetch();
  }, dependency);

  return { ...state, refetch };
}

/**
 * Hook for fetching hero section data
 */
export function useHero(language: string = 'az') {
  return useData<Hero>(() => api.getHero(language), [language]);
}

/**
 * Hook for fetching navbar data
 */
export function useNavbar() {
  return useData<Navbar>(() => api.getNavbar());
}

/**
 * Hook for fetching about data
 */
export function useAbout(language: string = 'az') {
  return useData<About>(() => api.getAbout(language), [language]);
}

/**
 * Hook for fetching all services
 */
export function useServices(language: string = 'az') {
  return useData<Service[]>(() => api.getServices(language), [language]);
}

/**
 * Hook for fetching a single service
 */
export function useService(id: number, language: string = 'az') {
  return useData<Service | null>(
    () => api.getService(id, language),
    [id, language]
  );
}

/**
 * Hook for fetching appointment configuration
 */
export function useAppointmentConfig(language: string = 'az') {
  return useData<Appointment>(() => api.getAppointmentConfig(language), [language]);
}

/**
 * Hook for fetching contact information
 */
export function useContactInfo(language: string = 'az') {
  return useData<Contact>(() => api.getContactInfo(language), [language]);
}

/**
 * Hook for fetching all feedbacks
 */
export function useFeedbacks() {
  return useData<Feedback[]>(() => api.getFeedbacks());
}

/**
 * Hook for fetching a single feedback
 */
export function useFeedback(id: number) {
  return useData<Feedback | null>(
    () => api.getFeedback(id),
    [id]
  );
}

/**
 * Hook for fetching all blogs
 */
export function useBlogs(language: string = 'az') {
  return useData<Blog[]>(() => api.getBlogs(language), [language]);
}

/**
 * Hook for fetching a single blog
 */
export function useBlog(id: number, language: string = 'az') {
  return useData<Blog | null>(
    () => api.getBlog(id, language),
    [id, language]
  );
}

/**
 * Hook for checking backend health
 */
export function useBackendHealth() {
  const [healthy, setHealthy] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    api.checkBackendHealth().then((isHealthy) => {
      setHealthy(isHealthy);
      setChecked(true);
    });
  }, []);

  return { healthy, checked };
}
