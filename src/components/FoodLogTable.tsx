import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { FoodEntry } from '../types';
import { getFoodEntries } from '../utils/storage';
import { ArrowUpDown } from 'lucide-react';

const columnHelper = createColumnHelper<FoodEntry>();

const columns = [
  columnHelper.accessor('foodName', {
    header: 'Food Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('quantity', {
    header: 'Quantity',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('dateTime', {
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting()}
          className="flex items-center space-x-1"
        >
          <span>Date & Time</span>
          <ArrowUpDown className="w-4 h-4" />
        </button>
      );
    },
    cell: (info) => format(parseISO(info.getValue()), 'MMM d, yyyy HH:mm'),
  }),
];

export function FoodLogTable() {
  const [data] = React.useState(getFoodEntries());

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No food entries yet. Start by adding some!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
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
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}