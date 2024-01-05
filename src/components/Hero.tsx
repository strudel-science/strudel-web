import React, { PropsWithChildren } from 'react';
import { PageSection } from './PageSection';

/**
 * Full width purple page section for area towards the top of a page.
 */
export const Hero: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <PageSection
      containerWidth="md"
      sx={{
        backgroundColor: 'info.main',
        color: 'white',
        textAlign: 'center',
      }}
    >
      {children}
    </PageSection>
  );
};