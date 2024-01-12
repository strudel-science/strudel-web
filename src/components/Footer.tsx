import * as React from 'react';
import { Box, Breakpoint, Container, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import GitHubIcon from '@mui/icons-material/GitHub';
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
        backgroundColor:'secondary.main'
      }}
    >
      <Container
        maxWidth={containerWidth}
        sx={{
          paddingTop: 8,
          paddingBottom: 8,
          '& a': {
            color: 'primary.main'
          },
          '& a:visited': {
            color: 'purple'
          }
        }}
      >        
        <Stack spacing={1}>
          <Typography component="h6" fontWeight="bold">Questions? Ideas? Looking to stay up to date?</Typography>
          <Stack direction="row" spacing={1}>
            <SendIcon />
            <Typography>
              Get in touch at <Link href="mailto:strudel@lbl.gov" target="_blank">strudel@lbl.gov</Link>
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <MarkAsUnreadIcon />
            <Typography>
              Join our mailing list by emailing <Link href="mailto:strudel-community+subscribe@lbl.gov" target="_blank">strudel-community+subscribe@lbl.gov</Link>
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <GitHubIcon />
            <Typography>
              Visit us on <Link href='https://github.com/strudel-science/' target="_blank">GitHub</Link> and join the <Link href='https://github.com/orgs/strudel-science/discussions/' target='_blank'>Discussion</Link>
            </Typography>
          </Stack>
        </Stack>
        <br />
        <em>STRUDEL is an effort of the Berkeley Lab Scientific Data <Link href="https://crd.lbl.gov/divisions/scidata/" target="_blank" rel="noreferrer">(SciData)</Link> Division <Link href="https://ux.lbl.gov" target="_blank" rel="noreferrer">UX team</Link></em>.
        <br />
        <em>The project is generously funded by the Alfred P. Sloan Foundation, Liz Vu & Josh Greenberg Program Officers, initial grant <Link href="https://sloan.org/grant-detail/10074" target="_blank" rel="noreferrer">#10074</Link></em>
        
      </Container>
    </Box>
  )
};