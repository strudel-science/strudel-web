import { TableContainer, Table, TableContainerProps } from '@mui/material';
import React from 'react';

/**
 * Wrapper for MUI Table with custom styles
 */
export const InfoTable: React.FC<TableContainerProps> = ({ children, ...rest }) => {
  return (
    <TableContainer
      {...rest}
      sx={{
        // '& .MuiTableHead-root .MuiTableRow-root': {
        //   border: '2px dashed',
        //   borderColor: 'error.main',
        // },
        '& .MuiTableHead-root .MuiTableRow-root .MuiTableCell-root': {
          backgroundColor: 'neutral.main',
          borderBottom: 'none',
          fontWeight: 'bold',
        },
        '& .MuiTableCell-root': {
          padding: 2,
        },
        '& a, & a:visited': {
          color: 'primary.main'
        }
      }}
    >
      <Table>
        {children}
      </Table>
    </TableContainer>
  );
};