import React, { PropsWithChildren } from 'react';
import { PageSection } from './PageSection';
import { Breakpoint } from '@mui/material';

interface HeroProps extends PropsWithChildren {
  /** Optionally wrap the inner content in its own container and give it a max width. */
  containerWidth?: false | Breakpoint | undefined;
}

/**
 * Full width purple page section for area towards the top of a page.
 */
export const Hero: React.FC<HeroProps> = ({
  containerWidth = 'md',
  children 
}) => {
  return (
    <PageSection
      containerWidth={containerWidth}
      sx={{
        backgroundColor: 'info.main',
        color: 'white',
        fontSize: '1.15em',
      }}
    >
      {children}
    </PageSection>
  );
};