import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import Seo from '../components/Seo';

/**
 * Redirect to /about/background because there is no top-level /about page
 */
const AboutPage: React.FC = () => {
  useEffect(() => {
    navigate('/about/background');
  }, []);
  return null;
};

export const Head = () => <Seo title="About" />

export default AboutPage