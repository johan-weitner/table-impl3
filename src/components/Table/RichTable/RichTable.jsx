import React, { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import PropTypes from 'prop-types'
import { getColumns } from '../helpers'
import { VirtualRichTable } from './VirtualRichTable'
import { StandardRichTable } from './StandardRichTable'
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

RichTable.propTypes = {
  data: PropTypes.array.isRequired,
  enableSorting: PropTypes.bool,
  enablePagination: PropTypes.bool,
  enableColumnVisibility: PropTypes.bool,
  enableColumnSizing: PropTypes.bool,
  enableVirtualization: PropTypes.bool,
};
