import React from 'react'
import { flexRender } from '@tanstack/react-table'
import clsx from 'clsx'
import styles from './RichTable.module.css'

/**
 * Standard (non-virtualized) version of the rich table component
 * @param {Object} props - Component props
 * @param {Object} props.table - TanStack table instance
 * @param {boolean} [props.enableSorting] - Enable column sorting functionality
 * @param {boolean} [props.enableColumnSizing] - Enable column resizing functionality
 * @returns {JSX.Element} The rendered table component
 */
export const StandardRichTable = ({ 
  table, 
  enableSorting, 
  enableColumnSizing 
}) => {
  return (
    <table className={styles.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th 
                key={header.id}
                className={clsx(
                  styles.th,
                  {
                    [styles.sortable]: enableSorting && header.column.getCanSort(),
                    [styles.resizable]: enableColumnSizing,
                  }
                )}
                style={{
                  width: enableColumnSizing ? header.getSize() : undefined,
                }}
                onClick={enableSorting ? header.column.getToggleSortingHandler() : undefined}
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                {enableSorting && ({
                  asc: ' 🔼',
                  desc: ' 🔽',
                }[header.column.getIsSorted()] ?? null)}
                {enableColumnSizing && (
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={styles.resizer}
                  />
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={styles.td}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
