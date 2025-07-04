import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender
} from '@tanstack/react-table';
import { getColumns } from '../helpers';
import styles from './TreeTable.module.css';

/**
 * A hierarchical table component with expandable rows that demonstrates tree data structure
 * @param {Object} props - Component props
 * @param {Array<Object>} props.data - Array of objects containing hierarchical table data with optional subRows property
 * @returns {JSX.Element} The rendered tree table component
 */
export const TreeTable = ({ data }) => {
  console.log('TreeTable data:', data.slice(0, 2)); // Debug: check first 2 rows
  const [expanded, setExpanded] = useState({});
  
  const table = useReactTable({
    data,
    columns: [
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }) =>
          row.getCanExpand() ? (
            <button
              className={styles.expanderButton}
              onClick={row.getToggleExpandedHandler()}
            >
              {row.getIsExpanded() ? '−' : '+'}
            </button>
          ) : null,
      },
      ...getColumns(),
    ],
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: row => row.subRows,
  });

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className={styles.th}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => {
          console.log(`Row ${row.id}: canExpand=${row.getCanExpand()}, depth=${row.depth}, subRows=${row.original.subRows?.length || 0}`);
          return (
            <tr key={row.id} data-depth={row.depth}>
              {row.getVisibleCells().map((cell, index) => (
                <td 
                  key={cell.id} 
                  className={styles.td}
                  style={index === 1 ? { paddingLeft: `${row.depth * 20 + 8}px` } : undefined}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};


