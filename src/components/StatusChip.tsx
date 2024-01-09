import React, { ReactElement } from 'react';
import { Chip, ChipOwnProps } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CachedIcon from '@mui/icons-material/Cached';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

type Status = 'released' | 'in progress' | 'draft' | 'planned';

interface StatusChipProps {
  status: Status
}

/**
 * Custom Chip component for displaying predefined statuses.
 * Simply supply one of the status values to the `status` prop
 * and the chip will display the label, color, and icon for that status.
 */
export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const statusProps = statusPropsByStatus[status]
  return (
    <Chip
      label={statusProps.label}
      icon={statusProps.icon}
      color={statusProps.color}
    />
  );
};

type StatusMap = {
  [S in Status]: {
    label: ChipOwnProps['label'];
    icon: ChipOwnProps['icon'];
    color: ChipOwnProps['color'];
  } 
};

const statusPropsByStatus: StatusMap = {
  'released': {
    label: 'Released',
    icon: <CheckCircleIcon />,
    color: 'success'
  },
  'in progress': {
    label: 'In progress',
    icon: <CachedIcon />,
    color: 'secondary'
  },
  'draft': {
    label: 'Draft',
    icon: <CheckCircleOutlineIcon />,
    color: 'warning'
  },
  'planned': {
    label: 'Planned',
    icon: <AccessTimeIcon />,
    color: 'default'
  }
}