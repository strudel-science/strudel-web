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
        <em>STRUDEL is an effort of the Berkeley Lab Scientific Data <Link href="https://crd.lbl.gov/divisions/scidata/" target="_blank" rel="noreferrer">(SciData)</Link> Division <Link href="https://ux.lbl.gov" target="_blank" rel="noreferrer">UX team</Link></em>.
        <br />
        <br />
        <strong>Questions? Ideas? Looking to stay up to date?</strong>
        <ul>
          <li>Get in touch at <Link href="mailto:strudel@lbl.gov" target="_blank">strudel@lbl.gov</Link></li>
          <li>Join our mailing list by emailing <Link href="mailto:strudel-community+subscribe@lbl.gov" target="_blank">strudel-community+subscribe@lbl.gov</Link></li>
          <li>Visit us on <Link href='https://github.com/strudel-science/' target="_blank">GitHub</Link> and join the <Link href='https://github.com/orgs/strudel-science/discussions/' target='_blank'>Discussion</Link></li>
        </ul>
      </Container>
    </Box>
  )
};