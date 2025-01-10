import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { UserNav } from "@/components/user-nav";
import { Task } from "@/data/schema";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { toast } from "sonner";
import { useTaskStore } from "@/stores/task-store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import EditTaskForm from "../forms/edit-task-form";
import { useEffect, useState } from "react";

export default function TasksPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const tasks = useTaskStore((state) => state.tasks);
  const pushTask = useTaskStore((state) => state.pushTask);
  const clear = useTaskStore((state) => state.clear);

  useEffect(() => {
    //Reference to the task collection
    const tasksRef = collection(db, "tasks");

    //Query agains the collection
    const taskQuery = query(
      tasksRef,
      where("useruid", "==", auth.currentUser?.uid)
    );
    const fetchData = async () => {
      try {
        setIsLoading(true);
        clear();
        const querySnapshot = await getDocs(taskQuery);

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          const task = {
            ...data,
            creationDate: data.creationDate?.toDate?.() || data.creationDate,
            deadline: data.deadline?.toDate?.() || data.deadline,
          };

          pushTask(task as Task);
        });

        setIsLoading(false);
      } catch (error) {
        toast.error("Something went wrong.");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  function handleSheetOpen(open: boolean): void {
    setIsOpen(open);
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleSheetOpen}>
        <div className="flex h-full flex-1 flex-col space-y-8 p-8 ">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <UserNav />
            </div>
          </div>
          {tasks && (
            <DataTable isLoading={isLoading} data={tasks!} columns={columns} />
          )}
        </div>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Task.</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently update your
              task.
            </SheetDescription>
          </SheetHeader>
          <EditTaskForm isDialogOpen={handleSheetOpen} />
        </SheetContent>
      </Sheet>
    </>
  );
}
