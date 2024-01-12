import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import Seo from '../../components/Seo';

/**
 * Redirect to /design-system/code-library/overview because there is no top-level /design-system/code-library page
 */
const CodeLibraryPage: React.FC = () => {
  useEffect(() => {
    navigate('/design-system/code-library/overview');
  }, []);
  return null;
};

export const Head = () => <Seo title="Code Library" />

export default CodeLibraryPage