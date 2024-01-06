import * as React from 'react';
import { Box, Container, Stack } from '@mui/material';
import BaseLayout from './BaseLayout';
import { HeadProps } from 'gatsby';
import Seo from '../Seo';

const ContainerLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <BaseLayout>
      <Container component="article" maxWidth="lg">
        {children}
      </Container>
    </BaseLayout>
  )
};

export const Head:React.FC<HeadProps<any, any>> = ({ pageContext }) => {
  return (
    <Seo title={pageContext.frontmatter.title} />
  );
}

export default ContainerLayout