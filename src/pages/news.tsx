import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import Seo from '../components/Seo';

/**
 * Redirect to /news/overview because there is no top-level /news page
 */
const NewsPage: React.FC = () => {
  useEffect(() => {
    navigate('/engage/news/overview');
  }, []);
  return null;
};

export const Head = () => <Seo title="News" />

export default NewsPage