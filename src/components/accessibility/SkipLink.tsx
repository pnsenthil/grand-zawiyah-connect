import { createSkipLink } from '@/utils/accessibility';
import { useEffect } from 'react';

interface SkipLinkProps {
  targetId: string;
  text?: string;
}

const SkipLink = ({ targetId, text = 'Skip to main content' }: SkipLinkProps) => {
  useEffect(() => {
    const skipLink = createSkipLink(targetId, text);
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    return () => {
      if (document.body.contains(skipLink)) {
        document.body.removeChild(skipLink);
      }
    };
  }, [targetId, text]);

  return null;
};

export default SkipLink;
