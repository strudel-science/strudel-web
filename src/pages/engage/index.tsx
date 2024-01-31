import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import Seo from '../../components/Seo';

/**
 * Redirect to /engage/contribute because there is no top-level /engage page
 */
const EngagePage: React.FC = () => {
  useEffect(() => {
    navigate('/engage/contribute');
  }, []);
  return null;
};

export const Head = () => <Seo title="Engage" />

export default EngagePage