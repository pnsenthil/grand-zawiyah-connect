// SEO Utilities for Grand Zawiyah
// This provides utilities for managing SEO meta tags and social cards

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  twitterCreator?: string;
  robots?: string;
  viewport?: string;
}

export const defaultSEO: SEOData = {
  title: 'Grand Zawiyah - Islamic Education & Community Platform',
  description: 'Join the Grand Zawiyah community for Islamic education, spiritual growth, and charitable giving. Preserving the legacy of Shaykh Hassan Cisse (RA) through Sadaqah Jariyah.',
  keywords: [
    'Islamic education',
    'Muslim community',
    'Sadaqah Jariyah',
    'Islamic charity',
    'Spiritual growth',
    'Shaykh Hassan Cisse',
    'Tariqa',
    'Islamic learning',
    'Community service',
    'Religious education'
  ],
  author: 'Grand Zawiyah',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@GrandZawiyah',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1'
};

export const pageSEO: Record<string, SEOData> = {
  home: {
    title: 'Grand Zawiyah - Islamic Education & Community Platform',
    description: 'Join the Grand Zawiyah community for Islamic education, spiritual growth, and charitable giving. Preserving the legacy of Shaykh Hassan Cisse (RA) through Sadaqah Jariyah.',
    ogTitle: 'Grand Zawiyah - Islamic Education & Community Platform',
    ogDescription: 'Join our community for Islamic education, spiritual growth, and charitable giving.',
    ogImage: '/images/og-home.jpg',
    ogUrl: 'https://grandzawiyah.org',
  },
  donate: {
    title: 'Donate to Grand Zawiyah - Support Islamic Education & Community',
    description: 'Make a meaningful donation to support Islamic education, community building, and charitable initiatives. Your Sadaqah Jariyah creates lasting impact.',
    keywords: [
      'Islamic charity',
      'Sadaqah Jariyah',
      'Donate to Islamic education',
      'Muslim charity',
      'Religious donation',
      'Community support'
    ],
    ogTitle: 'Donate to Grand Zawiyah - Support Islamic Education',
    ogDescription: 'Make a meaningful donation to support Islamic education and community building.',
    ogImage: '/images/og-donate.jpg',
    ogUrl: 'https://grandzawiyah.org/donate',
  },
  lessons: {
    title: 'Islamic Lessons & Education - Grand Zawiyah',
    description: 'Access comprehensive Islamic education including Quran study, Hadith, Islamic history, and spiritual development. Learn from authentic sources and qualified instructors.',
    keywords: [
      'Islamic lessons',
      'Quran study',
      'Hadith',
      'Islamic history',
      'Spiritual development',
      'Islamic education online',
      'Religious learning'
    ],
    ogTitle: 'Islamic Lessons & Education - Grand Zawiyah',
    ogDescription: 'Access comprehensive Islamic education and spiritual development courses.',
    ogImage: '/images/og-lessons.jpg',
    ogUrl: 'https://grandzawiyah.org/lessons',
  },
  events: {
    title: 'Community Events - Grand Zawiyah',
    description: 'Join our community events including Friday prayers, Islamic workshops, community gatherings, and special celebrations. Connect with fellow Muslims and grow together.',
    keywords: [
      'Islamic events',
      'Community gatherings',
      'Friday prayers',
      'Islamic workshops',
      'Muslim community',
      'Religious events'
    ],
    ogTitle: 'Community Events - Grand Zawiyah',
    ogDescription: 'Join our community events and connect with fellow Muslims.',
    ogImage: '/images/og-events.jpg',
    ogUrl: 'https://grandzawiyah.org/events',
  },
  dashboard: {
    title: 'Dashboard - Grand Zawiyah',
    description: 'Access your personal dashboard to track donations, view learning progress, and manage your Grand Zawiyah account.',
    robots: 'noindex, nofollow',
    ogTitle: 'Dashboard - Grand Zawiyah',
    ogDescription: 'Your personal Grand Zawiyah dashboard.',
  },
  auth: {
    title: 'Sign In - Grand Zawiyah',
    description: 'Sign in to your Grand Zawiyah account to access exclusive content, track your donations, and connect with the community.',
    robots: 'noindex, nofollow',
    ogTitle: 'Sign In - Grand Zawiyah',
    ogDescription: 'Sign in to your Grand Zawiyah account.',
  },
  premium: {
    title: 'Premium Content - Grand Zawiyah',
    description: 'Access exclusive premium Islamic content including advanced lessons, special lectures, and member-only resources.',
    keywords: [
      'Premium Islamic content',
      'Exclusive lessons',
      'Member resources',
      'Advanced Islamic education',
      'Special lectures'
    ],
    ogTitle: 'Premium Content - Grand Zawiyah',
    ogDescription: 'Access exclusive premium Islamic content and resources.',
    ogImage: '/images/og-premium.jpg',
    ogUrl: 'https://grandzawiyah.org/premium',
  },
  roundup: {
    title: 'Round-Up Donations - Grand Zawiyah',
    description: 'Set up automatic round-up donations to support Grand Zawiyah. Turn your everyday purchases into Sadaqah Jariyah.',
    keywords: [
      'Round-up donations',
      'Automatic giving',
      'Sadaqah Jariyah',
      'Micro-donations',
      'Islamic charity'
    ],
    ogTitle: 'Round-Up Donations - Grand Zawiyah',
    ogDescription: 'Turn your everyday purchases into Sadaqah Jariyah with round-up donations.',
    ogImage: '/images/og-roundup.jpg',
    ogUrl: 'https://grandzawiyah.org/roundup',
  }
};

export const updatePageSEO = (seoData: SEOData): void => {
  // Update document title
  document.title = seoData.title;

  // Update meta description
  updateMetaTag('description', seoData.description);

  // Update meta keywords
  if (seoData.keywords) {
    updateMetaTag('keywords', seoData.keywords.join(', '));
  }

  // Update meta author
  if (seoData.author) {
    updateMetaTag('author', seoData.author);
  }

  // Update canonical URL
  if (seoData.canonical) {
    updateCanonicalLink(seoData.canonical);
  }

  // Update robots meta
  if (seoData.robots) {
    updateMetaTag('robots', seoData.robots);
  }

  // Update viewport meta
  if (seoData.viewport) {
    updateMetaTag('viewport', seoData.viewport);
  }

  // Update Open Graph tags
  if (seoData.ogTitle) {
    updateMetaTag('og:title', seoData.ogTitle, 'property');
  }
  if (seoData.ogDescription) {
    updateMetaTag('og:description', seoData.ogDescription, 'property');
  }
  if (seoData.ogImage) {
    updateMetaTag('og:image', seoData.ogImage, 'property');
  }
  if (seoData.ogUrl) {
    updateMetaTag('og:url', seoData.ogUrl, 'property');
  }
  if (seoData.ogType) {
    updateMetaTag('og:type', seoData.ogType, 'property');
  }

  // Update Twitter Card tags
  if (seoData.twitterCard) {
    updateMetaTag('twitter:card', seoData.twitterCard);
  }
  if (seoData.twitterTitle) {
    updateMetaTag('twitter:title', seoData.twitterTitle);
  }
  if (seoData.twitterDescription) {
    updateMetaTag('twitter:description', seoData.twitterDescription);
  }
  if (seoData.twitterImage) {
    updateMetaTag('twitter:image', seoData.twitterImage);
  }
  if (seoData.twitterSite) {
    updateMetaTag('twitter:site', seoData.twitterSite);
  }
  if (seoData.twitterCreator) {
    updateMetaTag('twitter:creator', seoData.twitterCreator);
  }
};

const updateMetaTag = (name: string, content: string, attribute: string = 'name'): void => {
  let metaTag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attribute, name);
    document.head.appendChild(metaTag);
  }
  
  metaTag.setAttribute('content', content);
};

const updateCanonicalLink = (url: string): void => {
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  
  canonicalLink.setAttribute('href', url);
};

export const generateStructuredData = (page: string, data?: any) => {
  const baseUrl = 'https://grandzawiyah.org';
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Grand Zawiyah',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description: 'Islamic education and community platform preserving the legacy of Shaykh Hassan Cisse (RA)',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New York',
      addressRegion: 'NY',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-234-567-8900',
      contactType: 'customer service',
      email: 'info@grandzawiyah.org'
    },
    sameAs: [
      'https://facebook.com/grandzawiyah',
      'https://twitter.com/grandzawiyah',
      'https://instagram.com/grandzawiyah',
      'https://youtube.com/grandzawiyah'
    ]
  };

  // Add page-specific structured data
  switch (page) {
    case 'donate':
      return {
        ...structuredData,
        '@type': 'WebPage',
        name: 'Donate to Grand Zawiyah',
        description: 'Make a meaningful donation to support Islamic education and community building',
        mainEntity: {
          '@type': 'DonationAction',
          name: 'Donate to Grand Zawiyah',
          description: 'Support Islamic education and community initiatives',
          recipient: {
            '@type': 'Organization',
            name: 'Grand Zawiyah'
          }
        }
      };
    
    case 'lessons':
      return {
        ...structuredData,
        '@type': 'EducationalOrganization',
        name: 'Grand Zawiyah Islamic Education',
        description: 'Comprehensive Islamic education including Quran study, Hadith, and spiritual development',
        educationalCredentialAwarded: 'Islamic Education Certificate',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Islamic Education Courses',
          itemListElement: [
            {
              '@type': 'Course',
              name: 'Quran Study',
              description: 'Comprehensive Quran study and recitation'
            },
            {
              '@type': 'Course',
              name: 'Hadith Studies',
              description: 'Study of authentic Hadith collections'
            },
            {
              '@type': 'Course',
              name: 'Islamic History',
              description: 'History of Islam and Muslim civilizations'
            }
          ]
        }
      };
    
    case 'events':
      return {
        ...structuredData,
        '@type': 'Event',
        name: 'Grand Zawiyah Community Events',
        description: 'Join our community events including Friday prayers, workshops, and gatherings',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Grand Zawiyah',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'New York',
            addressRegion: 'NY',
            addressCountry: 'US'
          }
        }
      };
    
    default:
      return structuredData;
  }
};

export const injectStructuredData = (structuredData: any): void => {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
};

export const generateSitemap = (): string => {
  const baseUrl = 'https://grandzawiyah.org';
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/donate', priority: '0.9', changefreq: 'weekly' },
    { url: '/lessons', priority: '0.8', changefreq: 'weekly' },
    { url: '/events', priority: '0.8', changefreq: 'weekly' },
    { url: '/premium', priority: '0.7', changefreq: 'monthly' },
    { url: '/roundup', priority: '0.7', changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://grandzawiyah.org/sitemap.xml

# Disallow private areas
Disallow: /dashboard
Disallow: /auth
Disallow: /api/
Disallow: /admin/

# Allow important pages
Allow: /donate
Allow: /lessons
Allow: /events
Allow: /premium
Allow: /roundup`;
};
