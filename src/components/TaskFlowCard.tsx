import React, { PropsWithChildren } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

interface TaskFlowCardProps {
  title: string;
  subtitle: string;
  description?: string;
}

/**
 * 
 */
export const TaskFlowCard: React.FC<TaskFlowCardProps> = ({
  title,
  subtitle,
  description
}) => {
  return (
    <Link
      to="/design-system/task-flows/"
      style={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'error.main',
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '8px',
          zIndex: 2,
        }}
      />
      <Stack
        direction="row"
        spacing={4}
        sx={{
          padding: 1,
          paddingLeft: 2,
          border: '2px dotted',
          borderColor: 'error.main',
        }}
      >
        <StaticImage
          alt="STRUDEL team member photo"
          src="../../content/images/wallpaper.jpg"
          height={125}
          width={125}
        />
        <Stack>
          <Typography fontWeight="bold">
            {title}
          </Typography>
          <Typography>
            {subtitle}
          </Typography>
        </Stack>
        {description && (
          <Typography>
            {description}
          </Typography>
        )}
      </Stack>
    </Link>
  );
};