import * as React from 'react';
import { Box, Breakpoint, Container, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@mui/material';
import { StaticImage } from 'gatsby-plugin-image';

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
        backgroundColor:'neutral.main',
        marginTop: 4,
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
              Get in touch at 
            </Typography>
            <StaticImage
                  alt="strudel at lbl dot gov"
                  loading="eager"
                  placeholder="none"
                  src="../../content/images/strudel-email-id.svg"
                  style={{ maxWidth: '200px', height: 'auto' }}
                  imgStyle={{ objectFit: 'contain' }}
                />
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
        <em>STRUDEL is an open source project housed at the Berkeley Institute for Data Science <Link href="https://bids.berkeley.edu/" target="_blank" rel="noreferrer">(BIDS)</Link> at the University of California, Berkeley. The project is generously funded by the Alfred P. Sloan Foundation, Liz Vu & Josh Greenberg Program Officers, grants <Link href="https://sloan.org/grant-detail/g-2022-19360" target="_blank" rel="noreferrer">G-2022-19360</Link>, <Link href="https://sloan.org/grant-detail/g-2023-21098" target="_blank" rel="noreferrer">G-2023-21098</Link>, and <Link href="https://sloan.org/grant-detail/g-2024-22557" target="_blank" rel="noreferrer">G-2024-22557</Link>. STRUDEL partners include members of the Lawrence Berkeley National Lab Scientific Data <Link href="https://scidata.lbl.gov/" target="_blank" rel="noreferrer">(SciData)</Link> Division <Link href="https://ux.lbl.gov" target="_blank" rel="noreferrer">UX team</Link></em>, <Link href="https://superbloom.design/" target="_blank" rel="noreferrer">Superbloom Design</Link>, <Link href="https://carpentries.org/" target="_blank" rel="noreferrer">The Carpentries</Link>, and <Link href="https://2i2c.org/" target="_blank" rel="noreferrer">2i2c</Link>.
      </Container>
    </Box>
  )
};
