import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskSchema } from "@/data/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { priorities, statuses } from "@/data/data";
import { Separator } from "../ui/separator";
import React, { useState, useEffect } from "react";
import { useTaskStore } from "@/stores/task-store";
import { Loader2 } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import FavoriteSwitch from "../ui/favorite-switch";
import { saveTaskToIndexedDB, getAllTasksFromIndexedDB, clearIndexedDB } from "@/stores/indexedDB";

const NewTaskForm = ({ isDialogOpen }) => {
  const useruid = auth.currentUser ? auth.currentUser.uid : null;
  const [isLoading, setIsLoading] = useState(false);
  const pushTask = useTaskStore((state) => state.pushTask);

  const newTaskForm = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      id: `TASK-${uuidv4()}`,
      title: "",
      priority: priorities[0].value,
      status: statuses[0].value,
      useruid: useruid,
      isFavorite: false,
      creationDate: new Date(),
      deadline: new Date(),
    },
  });

  // ✅ Sync Offline Tasks to Firestore When Online
  useEffect(() => {
    const syncTasks = async () => {
      if (navigator.onLine) {
        const offlineTasks = await getAllTasksFromIndexedDB();
        for (const task of offlineTasks) {
          await setDoc(doc(db, "tasks", task.id), task);
        }
        await clearIndexedDB();
        toast.success("Offline tasks have been synced to Firestore.");
      }
    };

    window.addEventListener("online", syncTasks);
    return () => {
      window.removeEventListener("online", syncTasks);
    };
  }, []);

  async function onSubmit(values) {
    if (!useruid) {
      toast.error("User not authenticated. Please log in.");
      return;
    }

    setIsLoading(true);
    try {
      if (navigator.onLine) {
        // 🔹 User is online -> Save to Firestore
        await setDoc(doc(db, "tasks", values.id), values);
        toast.success(`Task "${values.title}" saved online.`);
      } else {
        // 🔹 User is offline -> Save to IndexedDB
        await saveTaskToIndexedDB(values);
        toast.success(`Task "${values.title}" saved offline.`);
      }

      pushTask(values);
      isDialogOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...newTaskForm}>
      <form onSubmit={newTaskForm.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-2 items-end">
          <FormField
            name="title"
            control={newTaskForm.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Task title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Clean bathroom." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="isFavorite"
            control={newTaskForm.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex mb-3 items-center space-x-2">
                    <FavoriteSwitch
                      id="isFavorite"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2 w-full">
          {/* Status */}
          <FormField
            name="status"
            control={newTaskForm.control}
            render={({ field }) => (
              <FormItem className="border flex-1 rounded-sm p-2">
                <FormLabel>Status</FormLabel>
                <Separator />
                <FormControl>
                  <RadioGroup
                    defaultChecked
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    {statuses.map((status) => (
                      <FormItem key={status.value} className="flex items-end space-x-2">
                        <RadioGroupItem value={status.value} id={status.label} />
                        <FormLabel className="hover:cursor-pointer w-full" htmlFor={status.label}>
                          {status.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Priority */}
          <FormField
            name="priority"
            control={newTaskForm.control}
            render={({ field }) => (
              <FormItem className="border flex-1 rounded-sm p-2">
                <FormLabel>Priority Type</FormLabel>
                <Separator />
                <FormControl>
                  <RadioGroup
                    defaultChecked
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    {priorities.map((priority) => (
                      <FormItem key={priority.value} className="flex items-end space-x-2">
                        <RadioGroupItem value={priority.value} id={priority.label} />
                        <FormLabel className="hover:cursor-pointer w-full" htmlFor={priority.label}>
                          {priority.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Deadline */}
        <div>
          <FormField
            name="deadline"
            control={newTaskForm.control}
            render={({ field }) => (
              <FormItem className="border flex-1 rounded-sm p-2">
                <FormLabel>Deadline</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select deadline"
                    className="w-full border rounded p-2 text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-end">
          <Button onClick={() => isDialogOpen(false)} type="button" variant="secondary" disabled={isLoading}>
            Cancel
          </Button>
          <Button disabled={isLoading} variant="default" type="submit">
            {isLoading && <Loader2 className="animate-spin h-3 w-3" />} Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewTaskForm;
