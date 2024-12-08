import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { doc, deleteDoc, setDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SheetTrigger } from "@/components/ui/sheet";

import { Task, taskSchema } from "../data/schema";
import { useTaskStore } from "@/stores/task-store";
import { db } from "@/firebase/config";
import { Copy, Loader2, Pencil, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);
  const pushTask = useTaskStore((state) => state.pushTask);
  const setSelectedTaskToEdit = useTaskStore(
    (state) => state.setSelectedTaskToEdit
  );

  const { deleteTask } = useTaskStore();
  const [isloading, setIsloading] = useState<boolean>(false);

  async function handleDeleteTask(task: Task) {
    setIsloading(true);
    const id: string = task.id;
    await deleteDoc(doc(db, "tasks", id));
    deleteTask(task);
    toast.success("Deleted successfully.");
    setIsloading(false);
  }

  async function handleDuplicateTask(task: Task) {
    setIsloading(true);
    let newTask = task;
    const oldTitle = task.title;
    const newTitle = oldTitle + " - copy";
    const newId = `TASK-${uuidv4()}`;
    newTask["id"] = newId;
    newTask["title"] = newTitle;
    await setDoc(doc(db, "tasks", `${newId}`), newTask);
    pushTask(newTask);
    toast.success("Successfully copied.");
    setIsloading(false);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          {isloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <DotsHorizontalIcon className="h-4 w-4" />
          )}

          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <SheetTrigger
          className="w-full"
          onClick={() => setSelectedTaskToEdit(task)}
        >
          <DropdownMenuItem>
            Edit
            <Pencil className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        </SheetTrigger>

        <DropdownMenuItem
          onClick={() => {
            handleDuplicateTask(task);
          }}
        >
          Make a copy <Copy className="ml-auto h-4 w-4" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-200"
          onClick={() => {
            handleDeleteTask(task);
          }}
        >
          Delete
          <Trash2 className="ml-auto h-4 w-4 text-red-200" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
