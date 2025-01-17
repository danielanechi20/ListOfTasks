import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { PlusIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import NewTaskForm from "./forms/new-task-form";

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isOpen, setIsOpen] = useState(false);

  function handleDialogOpen(open) {
    setIsOpen(open);
  }

  return (
    <div className="flex items-center justify-between">
      {/* Left Side - Filters & Search */}
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() ?? "").toString()} // Ensure it's a string
          onChange={(event) => {
            const value = event.target.value || ""; // Handle empty string
            table.getColumn("title")?.setFilterValue(value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />

          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          )}

          {table.getColumn("priority") && (
            <DataTableFacetedFilter
              column={table.getColumn("priority")}
              title="Priority"
              options={priorities}
            />
          )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Right Side - View Options & Add Task */}
      <DataTableViewOptions table={table} />

      <Dialog onOpenChange={handleDialogOpen} open={isOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            className="h-8 ml-2 px-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <PlusIcon className="h-4 w-4 font-bold mr-1" />
            New Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new task</DialogTitle>
          </DialogHeader>
          <NewTaskForm isDialogOpen={handleDialogOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
