import React from 'react'
import { flexRender } from '@tanstack/react-table'
import PropTypes from 'prop-types'
import styles from './RichTable.module.css'

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
                style={{
                  width: enableColumnSizing ? header.getSize() : undefined,
                  position: 'relative',
                  cursor: enableSorting && header.column.getCanSort() ? 'pointer' : 'default',
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
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

StandardRichTable.propTypes = {
  table: PropTypes.object.isRequired,
  enableSorting: PropTypes.bool,
  enableColumnSizing: PropTypes.bool,
}
