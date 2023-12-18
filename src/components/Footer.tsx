import * as React from 'react';
import { Box, Breakpoint, Container } from '@mui/material';
import { Link } from '@mui/material';

interface FooterProps {
  containerWidth?: false | Breakpoint
}

export const Footer: React.FC<FooterProps> = ({
  containerWidth = 'lg'
}) => {
  return (
    <Box
      sx={{
        borderTop: '1px solid',
        borderTopColor: 'neutral.main',
      }}
    >
      <Container
        maxWidth={containerWidth}
        sx={{
          paddingTop: 8,
          paddingBottom: 8
        }}
      >
        STRUDEL is an effort of the Berkeley Lab Scientific Data <Link href="https://crd.lbl.gov/divisions/scidata/" target="_blank">(SciData)</Link> Division <Link href="https://ux.lbl.gov" target="_blank">UX team</Link>.
        <br />
        Questions? Ideas? Get in touch at <Link href="mailto:strudel@lbl.gov" target="_blank">strudel - at - lbl - dot - gov</Link>
        <br />
        Looking to stay up to date? Join our mailing list by emailing <Link href="mailto:strudel-community+subscribe@lbl.gov" target="_blank">strudel-community+subscribe@lbl.gov</Link> or on <Link href='https://github.com/strudel-science/' target="_blank">GitHub</Link>.
      </Container>
    </Box>
  )
};