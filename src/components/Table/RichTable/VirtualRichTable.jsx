import React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { flexRender } from '@tanstack/react-table'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import styles from './RichTable.module.css'

export const VirtualRichTable = ({ 
  table, 
  enableSorting, 
  enableColumnSizing 
}) => {
  const parentRef = React.useRef()

  const virtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  })
  
  const virtualRows = virtualizer.getVirtualItems()

  return (
    <div ref={parentRef} className={styles.virtualContainer}>
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
          {virtualRows.map((virtualRow) => {
            const row = table.getRowModel().rows[virtualRow.index];
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.td}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

VirtualRichTable.propTypes = {
  table: PropTypes.object.isRequired,
  enableSorting: PropTypes.bool,
  enableColumnSizing: PropTypes.bool,
}
