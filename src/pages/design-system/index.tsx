import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import Seo from '../../components/Seo';

/**
 * Redirect to /design-system/overview because there is no top-level /design-system page
 */
const DesignSystemPage: React.FC = () => {
  useEffect(() => {
    navigate('/design-system/overview');
  }, []);
  return null;
};

export const Head = () => <Seo title="Design System" />

export default DesignSystemPage