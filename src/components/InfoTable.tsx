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
        '& .MuiTableHead-root .MuiTableRow-root': {
          border: '1px dotted',
          borderColor: 'error.main',
        },
        '& .MuiTableHead-root .MuiTableRow-root .MuiTableCell-root': {
          fontWeight: 'bold',
        },
        '& .MuiTableCell-root': {
          borderBottom: 'none',
          padding: 1,
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