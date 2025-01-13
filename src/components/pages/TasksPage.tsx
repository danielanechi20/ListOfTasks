import { useState, useEffect } from "react";
import DataTable from "@/components/data-table"; // Correct import for DataTable
import { UserNav } from "@/components/user-nav";
import { Task } from "@/data/schema"; // Correct import for Task type
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
import ExportButton from "../ui/exportButton"; // Import Export Button correctly
import { columns } from "@/components/columns"; // Correctly import columns

export default function TasksPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  const tasks = useTaskStore((state) => state.tasks);
  const pushTask = useTaskStore((state) => state.pushTask);
  const clear = useTaskStore((state) => state.clear);

  const handleSelectTask = (taskId: string) => {
    setSelectedTasks((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(taskId)) {
        newSelected.delete(taskId);
      } else {
        newSelected.add(taskId);
      }
      console.log("Currently selected tasks:", Array.from(newSelected));
      return newSelected;
    });
  };
  
  

  useEffect(() => {
    const tasksRef = collection(db, "tasks");
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

  const selectedTasksData = tasks.filter((task) => selectedTasks.has(task.id));
  console.log("Tasks to export:", selectedTasksData);
  

    const [isOpen, setIsOpen] = useState<boolean>(false);
  function handleSheetOpen(open: boolean): void {
    setIsOpen(open);
  }
  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleSheetOpen}>
        <div className="flex h-full flex-1 flex-col space-y-8 p-8">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <UserNav />
            </div>
          </div>
          {tasks && (
            <>
              <DataTable
                columns={columns}
                data={tasks}
                isLoading={isLoading}
                selectedTasks={selectedTasks}
                onSelectTask={handleSelectTask}
              />
              {console.log("Selected tasks for export:", selectedTasksData)}
              <ExportButton tasks={selectedTasksData} />
            </>
          )}
        </div>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Task</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently update your task.
            </SheetDescription>
          </SheetHeader>
          <EditTaskForm isDialogOpen={handleSheetOpen} />
        </SheetContent>
      </Sheet>
    </>
  );
}
