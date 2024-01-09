import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import Seo from '../components/Seo';

/**
 * Redirect to /planning-framework/overview because there is no top-level /planning-framework page
 */
const PlanningFrameworkPage: React.FC = () => {
  useEffect(() => {
    navigate('/planning-framework/overview');
  }, []);
  return null;
};

export const Head = () => <Seo title="Planning Framework" />

export default PlanningFrameworkPage