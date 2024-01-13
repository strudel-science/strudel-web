import React, { PropsWithChildren } from 'react';
import { PageSection, PageSectionProps } from './PageSection';
import { Breakpoint } from '@mui/material';

interface HeroProps extends PropsWithChildren {
  /** Optionally wrap the inner content in its own container and give it a max width. */
  containerWidth?: false | Breakpoint | undefined;
}

/**
 * Full width purple page section for area towards the top of a page.
 */
export const Hero: React.FC<PageSectionProps> = ({
  containerWidth = 'md',
  sideRibbon,
  sx,
  children 
}) => {
  return (
    <PageSection
      containerWidth={containerWidth}
      sideRibbon={sideRibbon}
      sx={{
        backgroundColor: 'info.main',
        color: 'white',
        fontSize: '1.15em',
        ...sx
      }}
    >
      {children}
    </PageSection>
  );
};