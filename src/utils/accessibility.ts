// Accessibility Utilities for Grand Zawiyah
// This provides utilities for improving accessibility

// Color contrast utilities
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;
    
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const isAccessibleContrast = (color1: string, color2: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
  const ratio = getContrastRatio(color1, color2);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
};

// Focus management utilities
export const trapFocus = (element: HTMLElement): (() => void) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  firstElement?.focus();

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

export const focusFirstElement = (element: HTMLElement): void => {
  const focusableElement = element.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as HTMLElement;
  
  focusableElement?.focus();
};

// ARIA utilities
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

export const setAriaExpanded = (element: HTMLElement, expanded: boolean): void => {
  element.setAttribute('aria-expanded', expanded.toString());
};

export const setAriaSelected = (element: HTMLElement, selected: boolean): void => {
  element.setAttribute('aria-selected', selected.toString());
};

export const setAriaChecked = (element: HTMLElement, checked: boolean): void => {
  element.setAttribute('aria-checked', checked.toString());
};

// Screen reader utilities
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Keyboard navigation utilities
export const handleArrowKeys = (
  event: KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
  orientation: 'horizontal' | 'vertical' = 'horizontal'
): number => {
  const { key } = event;
  const isHorizontal = orientation === 'horizontal';
  
  if ((isHorizontal && key === 'ArrowLeft') || (!isHorizontal && key === 'ArrowUp')) {
    event.preventDefault();
    return currentIndex > 0 ? currentIndex - 1 : items.length - 1;
  }
  
  if ((isHorizontal && key === 'ArrowRight') || (!isHorizontal && key === 'ArrowDown')) {
    event.preventDefault();
    return currentIndex < items.length - 1 ? currentIndex + 1 : 0;
  }
  
  if (key === 'Home') {
    event.preventDefault();
    return 0;
  }
  
  if (key === 'End') {
    event.preventDefault();
    return items.length - 1;
  }
  
  return currentIndex;
};

// Form accessibility utilities
export const validateFormAccessibility = (form: HTMLFormElement): string[] => {
  const errors: string[] = [];
  
  // Check for required fields without labels
  const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  requiredInputs.forEach(input => {
    const label = form.querySelector(`label[for="${input.id}"]`);
    if (!label && !input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
      errors.push(`Required input ${input.id} is missing a label`);
    }
  });
  
  // Check for form validation messages
  const inputsWithErrors = form.querySelectorAll('input[aria-invalid="true"], select[aria-invalid="true"], textarea[aria-invalid="true"]');
  inputsWithErrors.forEach(input => {
    const errorMessage = form.querySelector(`#${input.getAttribute('aria-describedby')}`);
    if (!errorMessage) {
      errors.push(`Input ${input.id} has aria-invalid="true" but no error message`);
    }
  });
  
  return errors;
};

// Skip link utilities
export const createSkipLink = (targetId: string, text: string = 'Skip to main content'): HTMLElement => {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
    border-radius: 4px;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  return skipLink;
};

// High contrast mode detection
export const isHighContrastMode = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

// Reduced motion detection
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Color scheme detection
export const getPreferredColorScheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Accessibility testing utilities
export const runAccessibilityAudit = (element: HTMLElement): {
  errors: string[];
  warnings: string[];
  suggestions: string[];
} => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];
  
  // Check for missing alt text on images
  const images = element.querySelectorAll('img');
  images.forEach(img => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      errors.push(`Image ${img.src} is missing alt text`);
    }
  });
  
  // Check for missing form labels
  const inputs = element.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    const id = input.id;
    if (id) {
      const label = element.querySelector(`label[for="${id}"]`);
      if (!label && !input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
        errors.push(`Form control ${id} is missing a label`);
      }
    }
  });
  
  // Check for proper heading hierarchy
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  headings.forEach(heading => {
    const level = parseInt(heading.tagName.charAt(1));
    if (level > previousLevel + 1) {
      warnings.push(`Heading ${heading.tagName} skips levels (previous was h${previousLevel})`);
    }
    previousLevel = level;
  });
  
  // Check for sufficient color contrast
  const textElements = element.querySelectorAll('p, span, div, a, button');
  textElements.forEach(el => {
    const styles = window.getComputedStyle(el);
    const color = styles.color;
    const backgroundColor = styles.backgroundColor;
    
    if (color && backgroundColor && color !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
      if (!isAccessibleContrast(color, backgroundColor)) {
        warnings.push(`Insufficient color contrast for element ${el.tagName}`);
      }
    }
  });
  
  // Check for keyboard accessibility
  const interactiveElements = element.querySelectorAll('button, a, input, select, textarea, [tabindex]');
  interactiveElements.forEach(el => {
    if (el.getAttribute('tabindex') === '-1' && !el.getAttribute('aria-hidden')) {
      suggestions.push(`Element ${el.tagName} is not keyboard accessible`);
    }
  });
  
  return { errors, warnings, suggestions };
};

// Export all utilities
export const a11y = {
  getContrastRatio,
  isAccessibleContrast,
  trapFocus,
  focusFirstElement,
  generateId,
  setAriaExpanded,
  setAriaSelected,
  setAriaChecked,
  announceToScreenReader,
  handleArrowKeys,
  validateFormAccessibility,
  createSkipLink,
  isHighContrastMode,
  prefersReducedMotion,
  getPreferredColorScheme,
  runAccessibilityAudit,
};
