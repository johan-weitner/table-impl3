import { mockLogs } from './mockLogs.js';

export const createTreeData = () => {
  // Take first 200 rows and nest every 5th as child demo
  const first200 = mockLogs.slice(0, 200);
  const treeData = [];
  
  for (let i = 0; i < first200.length; i++) {
    const row = { ...first200[i] };
    
    // Every 5th row becomes a parent with subRows
    if ((i + 1) % 5 === 0) {
      row.subRows = [];
      
      // Add 2-3 child rows to each parent
      const childCount = Math.floor(Math.random() * 2) + 2; // 2 or 3 children
      for (let j = 0; j < childCount; j++) {
        const childIndex = i + j + 1;
        if (childIndex < first200.length) {
          row.subRows.push({
            ...first200[childIndex],
            logEntryNumber: `${row.logEntryNumber}.${j + 1}`,
            description: `Child ${j + 1} of ${row.description}`,
          });
        }
      }
    }
    
    treeData.push(row);
  }
  
  return treeData;
};
