import { priorities, statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Heart } from "lucide-react";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()} // Selection logic stays here
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    size: 50,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const isFavorite = row.original.isFavorite;
      return (
        <div className="flex space-x-2">
          {isFavorite && <Heart className="h-5 w-5 fill-current text-red-600" />}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
    size: 200,
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
      if (!status) return null;
      return (
        <div
          className={`flex items-center p-2 rounded ${status.bgColor} ${status.textColor}`}
        >
          {status.icon && <status.icon className="mr-2 h-4 w-4" />}
          <span>{status.label}</span>
        </div>
      );
    },
    size: 150,
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || !Array.isArray(filterValue)) return true;
      return filterValue.includes(row.getValue(columnId));
    }, // ✅ Fix filtering for Status
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
      if (!priority) return null;
      return (
        <div className="flex items-center">
          {priority.icon && <priority.icon className="mr-2 h-4 w-4" />}
          <span>{priority.label}</span>
        </div>
      );
    },
    size: 150,
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || !Array.isArray(filterValue)) return true;
      return filterValue.includes(row.getValue(columnId));
    }, // ✅ Fix filtering for Priority
  },
  {
    accessorKey: "creationDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creation Date" />
    ),
    cell: ({ row }) => {
      const creationDate = row.getValue("creationDate");
      return (
        <div>{new Date(creationDate).toLocaleDateString() || "N/A"}</div>
      );
    },
    size: 150,
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deadline" />
    ),
    cell: ({ row }) => {
      const deadline = row.getValue("deadline");
      return (
        <div>{new Date(deadline).toLocaleDateString() || "N/A"}</div>
      );
    },
    size: 150,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    size: 100,
  },
];
