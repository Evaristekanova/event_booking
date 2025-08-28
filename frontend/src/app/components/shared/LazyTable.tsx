"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

interface LazyTableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: unknown, item: T) => React.ReactNode;
  }[];
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  pageSize?: number;
  className?: string;
  emptyMessage?: string;
  loadingMessage?: string;
}

const LazyTable = <T extends Record<string, unknown>>({
  data,
  columns,
  onLoadMore,
  hasMore,
  isLoading,
  className = "",
  emptyMessage = "No data available",
  loadingMessage = "Loading...",
}: LazyTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const [filteredData, setFilteredData] = useState<T[]>(data);

  // Sort data when sortConfig changes
  useEffect(() => {
    if (!sortConfig.key) {
      setFilteredData(data);
      return;
    }

    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortConfig.key!];
      const bVal = b[sortConfig.key!];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });

    setFilteredData(sorted);
  }, [data, sortConfig]);

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleLoadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      onLoadMore();
    }
  }, [hasMore, isLoading, onLoadMore]);

  const { ref: loadMoreRef } = useInfiniteScroll(handleLoadMore, {
    threshold: 0.1,
    rootMargin: "100px",
    enabled: hasMore && !isLoading,
  });

  const renderCell = (item: T, column: (typeof columns)[0]) => {
    const value = item[column.key];

    if (column.render) {
      return column.render(value, item);
    }

    if (value === null || value === undefined) {
      return <span className="text-gray-400">-</span>;
    }

    if (typeof value === "boolean") {
      return (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Yes" : "No"}
        </span>
      );
    }

    if (typeof value === "string" && value.length > 50) {
      return (
        <div className="max-w-xs">
          <span className="line-clamp-2">{value}</span>
        </div>
      );
    }

    return <span>{String(value)}</span>;
  };

  if (data.length === 0 && !isLoading) {
    return <div className="text-center py-8 text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable
                      ? "cursor-pointer hover:bg-gray-100 select-none"
                      : ""
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && sortConfig.key === column.key && (
                      <span className="text-purple-600">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {renderCell(item, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More Trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="py-4 text-center">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
              <span className="text-sm text-gray-600">{loadingMessage}</span>
            </div>
          ) : (
            <div className="h-4" /> // Invisible trigger for intersection observer
          )}
        </div>
      )}

      {/* End of Data */}
      {!hasMore && data.length > 0 && (
        <div className="py-4 text-center text-sm text-gray-500">
          No more data to load
        </div>
      )}
    </div>
  );
};

export default LazyTable;
