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
