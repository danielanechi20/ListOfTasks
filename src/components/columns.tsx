import { ColumnDef } from "@tanstack/react-table";

import { priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Heart } from "lucide-react";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const isFavorite = row.original.isFavorite;

      return (
        <div className="flex space-x-2">
          {isFavorite && (
            <Heart className="h-5 w-5 fill-current text-red-600" />
          )}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className={`flex items-center p-2 rounded ${status.bgColor} ${status.textColor}`}>
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "creationDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creation Date" />
    ),
    cell: ({ row }) => {
      const creationDate = row.getValue("creationDate") as string; 
      const formattedDate = creationDate
        ? new Date(creationDate).toLocaleDateString()
        : "N/A"; // Handle invalid or missing date
      return <div>{formattedDate}</div>;
    },
    enableSorting: true,
    filterFn: (row, id, value) => {
      const creationDate = row.getValue(id) as string; 
      const formattedDate = creationDate
        ? new Date(creationDate).toLocaleDateString()
        : null;
      return formattedDate === value;
    },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deadline" />
    ),
    cell: ({ row }) => {
      const deadline = row.getValue("deadline") as string; // Explicit cast
      const formattedDate = deadline
        ? new Date(deadline).toLocaleDateString()
        : "N/A"; // Handle invalid or missing date
      return <div>{formattedDate}</div>;
    },
    enableSorting: true,
    filterFn: (row, id, value) => {
      const deadline = row.getValue(id) as string; // Explicit cast
      const formattedDate = deadline
        ? new Date(deadline).toLocaleDateString()
        : null;
      return formattedDate === value;
    },
  },  
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
