import { createColumnHelper } from '@tanstack/react-table';

export const mockLogs = Array.from({ length: 1000 }, (_, i) => ({
  logEntryNumber: i + 1,
  classId: i % 10,
  eventId: i % 25,
  extendedEventId: i % 50,
  sourceId: i % 5,
  sourceName: `Source ${i % 5}`,
  dateAndTime: new Date(Date.now() - i * 1000 * 60).toISOString(),
  description: `Log description #${i + 1}`,
  extendedInfo: `Extended information #${i + 1}`,
}));

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
