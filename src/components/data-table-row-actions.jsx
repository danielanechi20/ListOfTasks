import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { SheetTrigger } from "../components/ui/sheet";

import { useTaskStore } from "../stores/task-store";
import { db } from "../firebase/config";
import { Copy, Loader2, Pencil, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useState } from "react";

export function DataTableRowActions({ row }) {
  const task = row.original;
  const pushTask = useTaskStore((state) => state.pushTask);
  const setSelectedTaskToEdit = useTaskStore(
    (state) => state.setSelectedTaskToEdit
  );

  const { deleteTask } = useTaskStore();
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteTask(task) {
    setIsLoading(true);
    const id = task.id;
    await deleteDoc(doc(db, "tasks", id));
    deleteTask(task);
    toast.success("Deleted successfully.");
    setIsLoading(false);
  }

  async function handleDuplicateTask(task) {
    setIsLoading(true);
    let newTask = { ...task };
    newTask.id = `TASK-${uuidv4()}`;
    newTask.title = `${task.title} - copy`;
    await setDoc(doc(db, "tasks", newTask.id), newTask);
    pushTask(newTask);
    toast.success("Successfully copied.");
    setIsLoading(false);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          {isLoading ? (
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
