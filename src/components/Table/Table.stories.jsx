import { ThinTable, RichTable, TreeTable } from './index';
import { mockLogs, createTreeData } from './helpers';

export default {
  title: 'Components/Tables',
  component: ThinTable,
};

export const Thin = () => <ThinTable data={mockLogs.slice(0, 20)} />;

export const RichDefault = () => (
  <RichTable data={mockLogs} enableSorting enablePagination />
);

export const RichVirtualised = () => (
  <RichTable
    data={mockLogs}
    enableSorting
    enablePagination
    enableVirtualization
  />
);

export const Tree = () => <TreeTable data={createTreeData()} />;
