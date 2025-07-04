import React, { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { getColumns } from '../helpers'
import { VirtualRichTable } from './VirtualRichTable'
import { StandardRichTable } from './StandardRichTable'
import styles from './RichTable.module.css'

/**
 * A feature-rich table component with optional sorting, pagination, column visibility, sizing, and virtualization
 * @param {Object} props - Component props
 * @param {Array<Object>} props.data - Array of objects containing the table data
 * @param {boolean} [props.enableSorting=false] - Enable column sorting functionality
 * @param {boolean} [props.enablePagination=false] - Enable table pagination
 * @param {boolean} [props.enableColumnVisibility=false] - Enable column show/hide functionality
 * @param {boolean} [props.enableColumnSizing=false] - Enable column resizing functionality
 * @param {boolean} [props.enableVirtualization=false] - Enable row virtualization for large datasets
 * @returns {JSX.Element} The rendered table component
 */
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

  return (
    <div>
      {enableVirtualization ? (
        <VirtualRichTable 
          table={table}
          enableSorting={enableSorting}
          enableColumnSizing={enableColumnSizing}
        />
      ) : (
        <StandardRichTable 
          table={table}
          enableSorting={enableSorting}
          enableColumnSizing={enableColumnSizing}
        />
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
