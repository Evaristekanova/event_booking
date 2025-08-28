import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  type SortingState,
  type PaginationState,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuChevronsRight, LuChevronsLeft } from "react-icons/lu";

import Button from "@/app/components/shared/Button";
import Input from "@/app/components/Input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
}

export default function Table<TData, TValue>({
  data,
  columns,
  searchKey = "",
  searchPlaceholder,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const initialUrlSearchParams = useSearchParams();
  const [searchParams, setSearchParams] = useState<URLSearchParams>(
    initialUrlSearchParams
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Math.max(Number(searchParams.get("page") ?? "1") - 1, 0),
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      columnFilters,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex: false,
  });

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", (pagination.pageIndex + 1).toString());
      return newParams;
    });
  }, [pagination.pageIndex, setSearchParams]);

  return (
    <div className="">
      {searchKey && (
        <div>
          <Input
            type="text"
            placeholder={searchPlaceholder ?? "Search..."}
            className="mb-4"
            value={
              (table.getColumn(`${searchKey}`)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn(`${searchKey}`)
                ?.setFilterValue(event.target.value)
            }
          />
        </div>
      )}
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 capitalize tracking-wider"
                >
                  {flexRender(
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
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div className="flex items-center justify-between gap-1 space-x-2 py-4">
          <div className="flex items-center gap-2">
            <span>Show:</span>
            <select
              className="border rounded px-2 py-1 focus:outline-none"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <p>
              items{" "}
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{" "}
              of {table.getFilteredRowModel().rows.length}
            </p>

            <Button
              className={`${
                !table.getCanPreviousPage()
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } py-2 px-1 rounded-sm bg-gray-400 `}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <LuChevronsLeft />
            </Button>

            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={`${
                !table.getCanPreviousPage()
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } py-2 px-1 rounded-sm bg-gray-400 `}
            >
              <FaChevronLeft size={16} />
            </Button>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={`${
                !table.getCanNextPage()
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } py-2 px-1 rounded-sm bg-gray-400  `}
            >
              <FaChevronRight size={16} />
            </Button>

            <Button
              className={`${
                !table.getCanNextPage()
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } py-2 px-1 rounded-sm bg-gray-400  `}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <LuChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
