import { ThinTable } from './ThinTable/ThinTable';
import { RichTable } from './RichTable/RichTable';
import { TreeTable } from './TreeTable/TreeTable';
import { mockLogs } from '../data/mockLogs';

export default {
  title: 'Tables',
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

export const Tree = () => <TreeTable data={mockLogs.slice(0, 100)} />;
