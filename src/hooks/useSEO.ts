// SEO Hook for Grand Zawiyah
// This provides React hooks for managing SEO meta tags

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updatePageSEO, injectStructuredData, generateStructuredData, pageSEO, defaultSEO } from '@/utils/seo';

export const useSEO = (customSEO?: Partial<typeof defaultSEO>) => {
  const location = useLocation();

  useEffect(() => {
    // Get page-specific SEO data
    const path = location.pathname;
    const pageKey = getPageKeyFromPath(path);
    const pageData = pageSEO[pageKey] || defaultSEO;
    
    // Merge with custom SEO data
    const seoData = { ...pageData, ...customSEO };
    
    // Update page SEO
    updatePageSEO(seoData);
    
    // Inject structured data
    const structuredData = generateStructuredData(pageKey, seoData);
    injectStructuredData(structuredData);
  }, [location.pathname, customSEO]);
};

export const usePageSEO = (pageKey: string, customSEO?: Partial<typeof defaultSEO>) => {
  useEffect(() => {
    const pageData = pageSEO[pageKey] || defaultSEO;
    const seoData = { ...pageData, ...customSEO };
    
    updatePageSEO(seoData);
    
    const structuredData = generateStructuredData(pageKey, seoData);
    injectStructuredData(structuredData);
  }, [pageKey, customSEO]);
};

const getPageKeyFromPath = (path: string): string => {
  // Remove leading slash and get first segment
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  // Map paths to page keys
  const pathMap: Record<string, string> = {
    '': 'home',
    'donate': 'donate',
    'lessons': 'lessons',
    'events': 'events',
    'dashboard': 'dashboard',
    'auth': 'auth',
    'premium': 'premium',
    'roundup': 'roundup',
  };
  
  return pathMap[firstSegment] || 'home';
};

// Hook for dynamic SEO updates
export const useDynamicSEO = (seoData: typeof defaultSEO) => {
  useEffect(() => {
    updatePageSEO(seoData);
    
    const structuredData = generateStructuredData('dynamic', seoData);
    injectStructuredData(structuredData);
  }, [seoData]);
};

// Hook for campaign-specific SEO
export const useCampaignSEO = (campaign: {
  name: string;
  description: string;
  image?: string;
  url?: string;
}) => {
  useEffect(() => {
    const campaignSEO = {
      title: `${campaign.name} - Grand Zawiyah`,
      description: campaign.description,
      ogTitle: `${campaign.name} - Grand Zawiyah`,
      ogDescription: campaign.description,
      ogImage: campaign.image || '/images/og-campaign.jpg',
      ogUrl: campaign.url || window.location.href,
      keywords: [
        'Islamic charity',
        'Sadaqah Jariyah',
        campaign.name,
        'Grand Zawiyah',
        'Islamic education'
      ]
    };
    
    updatePageSEO(campaignSEO);
    
    const structuredData = generateStructuredData('campaign', campaign);
    injectStructuredData(structuredData);
  }, [campaign]);
};

// Hook for event-specific SEO
export const useEventSEO = (event: {
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
}) => {
  useEffect(() => {
    const eventSEO = {
      title: `${event.title} - Grand Zawiyah Events`,
      description: event.description,
      ogTitle: `${event.title} - Grand Zawiyah Events`,
      ogDescription: event.description,
      ogImage: event.image || '/images/og-event.jpg',
      ogType: 'event',
      keywords: [
        'Islamic events',
        'Community events',
        event.title,
        'Grand Zawiyah',
        'Muslim community'
      ]
    };
    
    updatePageSEO(eventSEO);
    
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: event.title,
      description: event.description,
      startDate: event.date,
      location: {
        '@type': 'Place',
        name: event.location
      },
      organizer: {
        '@type': 'Organization',
        name: 'Grand Zawiyah'
      }
    };
    
    injectStructuredData(structuredData);
  }, [event]);
};

// Hook for lesson-specific SEO
export const useLessonSEO = (lesson: {
  title: string;
  description: string;
  instructor: string;
  duration: number;
  difficulty: string;
  image?: string;
}) => {
  useEffect(() => {
    const lessonSEO = {
      title: `${lesson.title} - Grand Zawiyah Lessons`,
      description: lesson.description,
      ogTitle: `${lesson.title} - Grand Zawiyah Lessons`,
      ogDescription: lesson.description,
      ogImage: lesson.image || '/images/og-lesson.jpg',
      keywords: [
        'Islamic lessons',
        'Islamic education',
        lesson.title,
        lesson.instructor,
        'Grand Zawiyah',
        lesson.difficulty
      ]
    };
    
    updatePageSEO(lessonSEO);
    
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: lesson.title,
      description: lesson.description,
      provider: {
        '@type': 'Organization',
        name: 'Grand Zawiyah'
      },
      instructor: {
        '@type': 'Person',
        name: lesson.instructor
      },
      timeRequired: `PT${lesson.duration}M`,
      educationalLevel: lesson.difficulty
    };
    
    injectStructuredData(structuredData);
  }, [lesson]);
};
