import React, { PropsWithChildren } from 'react';
import { PageSection, PageSectionProps } from './PageSection';


/**
 * Full width light grey page section for the page title and headline.
 */
export const PageHeader: React.FC<PageSectionProps> = ({ children, sx, ...rest }) => {
  return (
    <PageSection
      {...rest}
      sx={{
        backgroundColor: 'neutral.main',
        color: 'info.main',
        ...sx
      }}
    >
      {children}
    </PageSection>
  );
};