// Breadcrumbs Component for Grand Zawiyah
// Provides navigation breadcrumbs for better user orientation

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items, 
  className,
  showHome = true 
}) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from current path if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Add home if enabled
    if (showHome) {
      breadcrumbs.push({
        label: 'Home',
        href: '/',
        isActive: location.pathname === '/'
      });
    }

    // Generate breadcrumbs from path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Convert segment to readable label
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath,
        isActive: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) {
    return null; // Don't show breadcrumbs for single items
  }

  return (
    <nav 
      className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/60" />
            )}
            
            {item.href ? (
              <Link
                to={item.href}
                className={cn(
                  'hover:text-foreground transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-1 py-0.5',
                  item.isActive && 'text-foreground font-medium'
                )}
                aria-current={item.isActive ? 'page' : undefined}
              >
                {index === 0 && showHome && (
                  <Home className="h-4 w-4 inline mr-1" />
                )}
                {item.label}
              </Link>
            ) : (
              <span 
                className={cn(
                  'text-foreground',
                  item.isActive && 'font-medium'
                )}
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Custom breadcrumb configurations for specific pages
export const getBreadcrumbsForPage = (pathname: string): BreadcrumbItem[] => {
  const breadcrumbs: Record<string, BreadcrumbItem[]> = {
    '/dashboard': [
      { label: 'Home', href: '/' },
      { label: 'Dashboard', isActive: true }
    ],
    '/dashboard/profile': [
      { label: 'Home', href: '/' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Profile', isActive: true }
    ],
    '/lessons': [
      { label: 'Home', href: '/' },
      { label: 'Islamic Lessons', isActive: true }
    ],
    '/donate': [
      { label: 'Home', href: '/' },
      { label: 'Donate', isActive: true }
    ],
    '/donate/roundup': [
      { label: 'Home', href: '/' },
      { label: 'Donate', href: '/donate' },
      { label: 'Round-Up', isActive: true }
    ],
    '/premium': [
      { label: 'Home', href: '/' },
      { label: 'Premium Content', isActive: true }
    ],
    '/events': [
      { label: 'Home', href: '/' },
      { label: 'Community Events', isActive: true }
    ],
    '/auth': [
      { label: 'Home', href: '/' },
      { label: 'Sign In', isActive: true }
    ],
    '/stripe-demo': [
      { label: 'Home', href: '/' },
      { label: 'Payment Demo', isActive: true }
    ]
  };

  return breadcrumbs[pathname] || [];
};

// Hook for using breadcrumbs in components
export const useBreadcrumbs = (customItems?: BreadcrumbItem[]) => {
  const location = useLocation();
  const defaultItems = getBreadcrumbsForPage(location.pathname);
  
  return customItems || defaultItems;
};

export default Breadcrumbs;
