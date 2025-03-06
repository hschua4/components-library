"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { capitalizeFirstLetter } from "@/util/string";

type FilterOptions = { value: string; label: string };
export type Filter = Record<string, FilterOptions[]>;

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters?: Filter;
  searchColumn: string;
  placeholder: string;
}

export function DataTableToolbar<TData>({
  table,
  filters,
  searchColumn,
  placeholder,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder}
          value={
            (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {filters &&
          Object.keys(filters).map((key) => (
            <DataTableFacetedFilter
              key={key}
              column={table.getColumn(key)}
              title={capitalizeFirstLetter(key)}
              options={filters[key]}
            />
          ))}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
