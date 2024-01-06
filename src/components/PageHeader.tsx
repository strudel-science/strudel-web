import React, { PropsWithChildren } from 'react';
import { PageSection } from './PageSection';

/**
 * Full width light grey page section for the page title and headline.
 */
export const PageHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <PageSection
      containerWidth="md"
      sx={{
        backgroundColor: 'neutral.main',
        color: 'info.main'
      }}
    >
      {children}
    </PageSection>
  );
};