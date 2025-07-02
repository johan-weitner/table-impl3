import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const getColumns = () => [
  columnHelper.accessor('logEntryNumber', { header: 'Log Entry Number' }),
  columnHelper.accessor('classId', { header: 'Class Id' }),
  columnHelper.accessor('eventId', { header: 'Event Id' }),
  columnHelper.accessor('extendedEventId', { header: 'Extended Event Id' }),
  columnHelper.accessor('sourceId', { header: 'Source Id' }),
  columnHelper.accessor('sourceName', { header: 'Source Name' }),
  columnHelper.accessor('dateAndTime', { header: 'Date And Time' }),
  columnHelper.accessor('description', { header: 'Description' }),
  columnHelper.accessor('extendedInfo', { header: 'Extended Info' }),
];
