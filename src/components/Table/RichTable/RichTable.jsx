import React, { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import PropTypes from 'prop-types'
import { getColumns } from '../../../table/columns'
import styles from './RichTable.module.css'

export const RichTable = ({ 
  data, 
  enableSorting = false, 
  enablePagination = false, 
  enableColumnVisibility = false,
  enableColumnSizing = false,
  enableVirtualization = false
}) => {
  const [sorting, setSorting] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnSizing, setColumnSizing] = useState({})

  const table = useReactTable({
    data,
    columns: getColumns(),
    state: {
      ...(enableSorting && { sorting }),
      ...(enableColumnVisibility && { columnVisibility }),
      ...(enableColumnSizing && { columnSizing }),
    },
    onSortingChange: enableSorting ? setSorting : undefined,
    onColumnVisibilityChange: enableColumnVisibility ? setColumnVisibility : undefined,
    onColumnSizingChange: enableColumnSizing ? setColumnSizing : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    columnResizeMode: enableColumnSizing ? 'onChange' : undefined,
  });

  const parentRef = React.useRef();

  const virtualizer = enableVirtualization ? useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  }) : null;
  
  const virtualRows = virtualizer ? virtualizer.getVirtualItems() : [];

  return (
    <div>
      {enableVirtualization ? (
        <div ref={parentRef} className={styles.virtualContainer}>
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
              {virtualRows.map((virtualRow) => {
                const row = table.getRowModel().rows[virtualRow.index];
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
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
      )}

      {enablePagination && (
        <div className={styles.paginationControls}>
          <button 
            onClick={() => table.previousPage()} 
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button 
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

RichTable.propTypes = {
  data: PropTypes.array.isRequired,
  enableSorting: PropTypes.bool,
  enablePagination: PropTypes.bool,
  enableColumnVisibility: PropTypes.bool,
  enableColumnSizing: PropTypes.bool,
  enableVirtualization: PropTypes.bool,
};
