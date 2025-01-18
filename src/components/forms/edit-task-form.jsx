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
import { priorities, statuses, recurences } from "@/data/data";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useTaskStore } from "@/stores/task-store";
import { Loader2 } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { toast } from "sonner";

const EditTaskForm = ({ isDialogOpen }) => {
  const selectedTaskToEdit = useTaskStore((state) => state.selectedTaskToEdit);
  const updateTask = useTaskStore((state) => state.updateTask);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      id: selectedTaskToEdit?.id,
      title: selectedTaskToEdit?.title,
      priority: selectedTaskToEdit?.priority,
      status: selectedTaskToEdit?.status,
      useruid: auth.currentUser?.uid,
      isFavorite: selectedTaskToEdit?.isFavorite,
      creationDate: new Date(),
      deadline: new Date(), 
      recurence: recurences[0].value,
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);

    updateTask(values);
    await updateDoc(doc(db, "tasks", `${values.id}`), values);
    toast.success(`${values.id} has been updated successfully.`);
    setIsLoading(false);
    isDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-2 items-end">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Task title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Buy Milk." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2 w-full">
          {/* Status */}
          <FormField
            name="status"
            control={form.control}
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
            control={form.control}
            render={({ field }) => (
              <FormItem className="border flex-1 rounded-sm p-2">
                <FormLabel>Priority</FormLabel>
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
            control={form.control}
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

        <div>
                  <FormField
                    name="recurence"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="border flex-1 rounded-sm p-2">
                        <FormLabel>Recurrence</FormLabel>
                        <Separator />
                        <FormControl>
                          <RadioGroup
                            className="flex space-x-4"
                            defaultChecked
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            {recurences.map((recurence) => (
                              <FormItem key={recurence.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={recurence.value} id={recurence.label} />
                                <FormLabel className="hover:cursor-pointer" htmlFor={recurence.label}>
                                  {recurence.label}
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

        {/* Buttons */}
        <div className="flex gap-2 justify-end">
          <Button onClick={() => isDialogOpen(false)} type="button" variant="secondary" disabled={isLoading}>
            Cancel
          </Button>
          <Button disabled={isLoading} variant="default" type="submit">
            {isLoading && <Loader2 className="animate-spin h-3 w-3" />} Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditTaskForm;
