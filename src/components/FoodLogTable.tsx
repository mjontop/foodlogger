import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import { FoodEntry } from '../types';
import { getFoodEntries, deleteFoodEntry } from '../utils/storage';
import { ArrowUpDown, TrashIcon } from 'lucide-react';
import { getReadableDate } from '../utils/date-time';

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
    cell: (info) => getReadableDate(info.getValue()),
  }),
  // columnHelper.accessor('consequence', {
  //   header: 'Consequence',
  //   cell: ({ row }) => {
  //     const [value, setValue] = useState(row.getValue('consequence'));

  //     const handleChange = (e) => {
  //       setValue(e.target.value);
  //       // Update the consequence in the data source if needed
  //       row.original.consequence = e.target.value;
  //     };

  //     return (
  //       <input
  //         type="text"
  //         value={value}
  //         onChange={handleChange}
  //         className="border border-gray-300 rounded px-2 py-1"
  //       />
  //     );
  //   },
  // }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <TrashIcon
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this entry?')) {
            console.log(row.original.id)
            deleteFoodEntry(row.original.id); 
            window.location.reload(); // Reload to reflect changes
          }
        }}
        className="text-red-600 hover:text-red-800 cursor-pointer"
      >
        Delete
      </TrashIcon>
    ),
  }),
];

export function FoodLogTable() {
  const [data] = useState(getFoodEntries());

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

