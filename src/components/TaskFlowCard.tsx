import React, { PropsWithChildren } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { useTaskFlow } from '../hooks/useTaskFlow';

interface TaskFlowCardProps {
  /** Name of a task flow as specified in strudel-config.json */
  name: string;
  /** Optionally display the full task flow description in the card */
  showDescription?: boolean;
}

/**
 * Generate a Task Flow card by supplying the name of the task flow.
 * The tagline, title, description, image, and link will be generated 
 * automatically based on the data in the task flow's markdown frontmatter.
 */
export const TaskFlowCard: React.FC<TaskFlowCardProps> = ({ 
  name,
  showDescription = false
}) => {
  const taskFlow = useTaskFlow(name);

  if (taskFlow) {
    return (
      <TaskFlowCardBase
        title={taskFlow.name}
        tagline={taskFlow?.tagline}
        description={showDescription ? taskFlow.intent : undefined}
        path={taskFlow?.path}
      />
    );
  } else {
    console.log(`No task flow found named "${name}"`)
  }
}

interface TaskFlowCardBaseProps {
  title: string;
  tagline?: string;
  description?: string;
  path?: string;
}

/**
 * Base component for the Task Flow cards.
 * Renders the given title, tagline, description, and image in a card view.
 */
export const TaskFlowCardBase: React.FC<TaskFlowCardBaseProps> = ({
  title,
  tagline,
  description,
  path = '#'
}) => {
  return (
    <Link
      to={path}
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
          alignItems: 'center',
          border: '2px dotted',
          borderColor: 'error.main',
          padding: 1,
          paddingLeft: 2,
          transition: '0.25s',
          '&:hover': {
            backgroundColor: 'neutral.main'
          }
        }}
      >
        <Box
          sx={{
            flexShrink: 0
          }}
        >
          <StaticImage
            alt="STRUDEL team member photo"
            src="../../content/images/wallpaper.jpg"
            height={110}
            width={110}
          />
        </Box>
        <Stack>
          <Typography 
            variant="h6" 
            component="p" 
            fontWeight="bold"
          >
            {title}
          </Typography>
          <Typography>
            {tagline}
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