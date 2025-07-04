import React from 'react';
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
  const table = useReactTable({
    data,
    columns: [
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }) =>
          row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: {
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none'
                }
              }}
            >
              {row.getIsExpanded() ? '−' : '+'}
            </button>
          ) : null,
      },
      ...getColumns(),
    ],
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} style={{ padding: "8px" }}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <React.Fragment key={row.id}>
            <tr>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={{ padding: "8px" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            {row.getIsExpanded() &&
              row.subRows.map(subRow => (
                <tr key={subRow.id}>
                  {subRow.getVisibleCells().map(cell => (
                    <td key={cell.id} style={{ padding: "8px" }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};


