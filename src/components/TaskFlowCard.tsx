import React, { PropsWithChildren, ReactNode } from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { Link } from 'gatsby';
import { useTaskFlow } from '../hooks/useTaskFlow';
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks';
import { getImageFromFileNode } from '../utils/utils';
import { GatsbyImage } from 'gatsby-plugin-image';

interface TaskFlowCardProps {
  /** Name of a task flow as specified in strudel-config.json */
  name: string;
  /** Optionally display the full task flow description in the card */
  showDescription?: boolean;
  /** Optionally display the task flow tags in the card */
  showTags?: boolean;
}

/**
 * Generate a Task Flow card by supplying the name of the task flow.
 * The tagline, title, description, image, and link will be generated 
 * automatically based on the data in the task flow's markdown frontmatter.
 */
export const TaskFlowCard: React.FC<TaskFlowCardProps> = ({ 
  name,
  showDescription = false,
  showTags = false
}) => {
  const taskFlow = useTaskFlow(name);

  if (taskFlow) {
    return (
      <TaskFlowCardBase
        title={taskFlow.name}
        //tagline={taskFlow?.tagline}
        description={showDescription ? taskFlow.intent : undefined}
        path={taskFlow?.path}
        tags={showTags ? taskFlow?.tags : undefined}
        thumbnail={typeof taskFlow.iconImage !== 'string' ? taskFlow.iconImage : undefined}
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
  tags?: string[];
  /** 
   * This must be a FileNode returned from GraphQL for an image field.
   * This is so its gatsbyImageData can be transformed to support <GatsbyImage>
   */
  thumbnail?: FileNode;
  thumbnailComponent?: ReactNode;
}

/**
 * Base component for the Task Flow cards.
 * Renders the given title, tagline, description, and image in a card view.
 */
export const TaskFlowCardBase: React.FC<TaskFlowCardBaseProps> = ({
  title,
  tagline,
  description,
  path = '#',
  tags,
  thumbnail,
  thumbnailComponent
}) => {
  const thumbnailImg = getImageFromFileNode(thumbnail);
  return (
    <Link
      to={path}
      style={{
        color: 'inherit',
        display: 'block',
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
        spacing={3}
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
            flexShrink: 0,
            height: 110,
            width: 110,
          }}
        >
          {!thumbnailImg && thumbnailComponent}
          {thumbnailImg && (
            <GatsbyImage
              image={thumbnailImg} 
              alt="Test"
            />
          )}
        </Box>
        <Stack spacing={1}>
          <Typography 
            variant="h6" 
            component="p" 
            fontWeight="bold"
          >
            {title}
          </Typography>
          <Typography>
            {description || tagline}
          </Typography>
          {tags && (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {tags.map((tag, i) => (
                <Chip 
                  key={`${tag}-${i}`}
                  label={tag}
                  variant="outlined"
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Link>
  );
};