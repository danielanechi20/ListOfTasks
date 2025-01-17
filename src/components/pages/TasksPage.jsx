import { useState, useEffect } from "react";
import DataTable from "../data-table"; 
import { UserNav } from "../user-nav";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { toast } from "sonner";
import { useTaskStore } from "../../stores/task-store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import EditTaskForm from "../forms/edit-task-form";
import ExportButton from "../ui/exportButton"; 
import { columns } from "../columns"; 
import { getAllTasksFromIndexedDB, clearIndexedDB } from '@/stores/indexedDB';
import { addTaskToFirestore } from '@/firebase/task';

export default function TasksPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState(new Set());

  const tasks = useTaskStore((state) => state.tasks);
  const pushTask = useTaskStore((state) => state.pushTask);
  const clear = useTaskStore((state) => state.clear);

  const handleSelectTask = (taskId) => {
    setSelectedTasks((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(taskId)) {
        newSelected.delete(taskId);
      } else {
        newSelected.add(taskId);
      }
      console.log("Currently selected tasks:", Array.from(newSelected));
      return new Set(newSelected); 
    });
  };

  // 🔹 Function to fetch tasks from Firestore
  const fetchTasksFromFirestore = async () => {
    if (!auth.currentUser) return;

    const tasksRef = collection(db, "tasks");
    const taskQuery = query(tasksRef, where("useruid", "==", auth.currentUser.uid));

    try {
      setIsLoading(true);
      clear(); // Clear old tasks
      const querySnapshot = await getDocs(taskQuery);
      const fetchedTasks = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedTasks.push({
          ...data,
          creationDate: data.creationDate?.toDate?.() || new Date(),
          deadline: data.deadline?.toDate?.() || new Date(),
        });
      });

      pushTask(fetchedTasks);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Something went wrong.");
      setIsLoading(false);
    }
  };

  // 🔹 Sync offline tasks when user goes online
  useEffect(() => {
    const syncTasks = async () => {
      if (navigator.onLine) {
        const offlineTasks = await getAllTasksFromIndexedDB();
        for (const task of offlineTasks) {
          await addTaskToFirestore(task);
        }
        await clearIndexedDB();
        fetchTasksFromFirestore(); // Reload tasks from Firestore after sync
      }
    };

    window.addEventListener('online', syncTasks);
    return () => {
      window.removeEventListener('online', syncTasks);
    };
  }, []);

  // 🔹 Fetch Firestore tasks on first load
  useEffect(() => {
    fetchTasksFromFirestore();
  }, [auth.currentUser]);

  const selectedTasksData = tasks.filter((task) => selectedTasks.has(task.id));

  const [isOpen, setIsOpen] = useState(false);
  function handleSheetOpen(open) {
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
          {tasks.length > 0 ? (
            <>
              <DataTable
                columns={columns}
                data={tasks}
                isLoading={isLoading}
                selectedTasks={selectedTasks}
                onSelectTask={handleSelectTask}
              />
              {selectedTasksData.length > 0 && <ExportButton tasks={selectedTasksData} />}
            </>
          ) : (
            <p className="text-center text-muted-foreground">No tasks found.</p>
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
