import { mockLogs } from './mockLogs.js';

export const createTreeData = () => {
  // Take first 50 rows and create a simpler hierarchical structure
  const first50 = mockLogs.slice(0, 50);
  const treeData = [];
  
  for (let i = 0; i < first50.length; i += 5) {
    // Every 5th row becomes a parent
    const parentRow = { ...first50[i] };
    parentRow.subRows = [];
    
    // Add the next 2-3 rows as children if they exist
    for (let j = 1; j <= 3 && (i + j) < first50.length; j++) {
      const childRow = { 
        ...first50[i + j],
        logEntryNumber: `${parentRow.logEntryNumber}.${j}`,
        description: `Child ${j} of ${parentRow.description}`,
      };
      parentRow.subRows.push(childRow);
    }
    
    treeData.push(parentRow);
  }
  
  return treeData;
};
