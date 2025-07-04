import { useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import styles from './ThinTable.module.css'

/**
 * A simple table component with minimal features that auto-generates columns from data
 * @param {Object} props - Component props
 * @param {Array<Object>} props.data - Array of objects containing the table data
 * @returns {JSX.Element} The rendered table component
 */
export const ThinTable = ({ data }) => {
  // Automatically generate columns from the first data row if data exists
  const columns = useMemo(() => {
    if (!data || data.length === 0) return []
    
    const firstRow = data[0]
    return Object.keys(firstRow).map((key) => ({
      accessorKey: key,
      header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
    }))
  }, [data])

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Basic options with no pagination or sorting
    enableSorting: false,
    enableFilters: false,
    enableColumnFilters: false,
    enableGlobalFilter: false,
    enablePagination: false,
  })

  if (!data || data.length === 0) {
    return (
      <div className={styles.emptyState}>
        No data to display
      </div>
    )
  }

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className={styles.headerRow}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className={styles.th}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={styles.tbody}>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className={styles.row}>
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
