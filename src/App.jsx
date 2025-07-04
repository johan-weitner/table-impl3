import { ThinTable, RichTable, TreeTable } from './components/Table';
import { mockLogs, createTreeData } from './components/Table/helpers';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>TanStack Table Demo</h1>
      <p>Demonstrating three different table implementations:</p>
      
      <details open>
        <summary>
          <h2>Thin Table</h2>
          <p>Simple table with minimal features - auto-generates columns from data</p>
        </summary>
        <div className="table-container">
          <ThinTable data={mockLogs.slice(0, 20)} />
        </div>
      </details>

      <details>
        <summary>
          <h2>Rich Table</h2>
          <p>Feature-rich table with sorting, pagination, and virtualization</p>
        </summary>
        <div className="table-container">
          <RichTable 
            data={mockLogs} 
            enableSorting 
            enablePagination 
            enableVirtualization
          />
        </div>
      </details>

      <details>
        <summary>
          <h2>Tree Table</h2>
          <p>Hierarchical table with expandable rows</p>
        </summary>
        <div className="table-container">
          <TreeTable data={createTreeData()} />
        </div>
      </details>
    </div>
  )
}

export default App
