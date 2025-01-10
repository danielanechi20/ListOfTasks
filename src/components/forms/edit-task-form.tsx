import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Task, taskSchema } from "@/data/schema";

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
import React, { useState } from "react";
import { useTaskStore } from "@/stores/task-store";
import { Loader2 } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { toast } from "sonner";
import FavoriteSwitch from "../ui/favorite-switch";

interface EditTaskFormProps {
  isDialogOpen: (isOpen: boolean) => void;
}
const EditTaskForm: React.FC<EditTaskFormProps> = ({ isDialogOpen }) => {
  const selectedTaskToEdit = useTaskStore((state) => state.selectedTaskToEdit);
  const updateTask = useTaskStore((state) => state.updateTask);
  const [isLoading, setIsLoadind] = useState<boolean>(false);
  const EditTaskForm = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      id: selectedTaskToEdit?.id,
      title: selectedTaskToEdit?.title,
      priority: selectedTaskToEdit?.priority,
      status: selectedTaskToEdit?.status,
      useruid: auth.currentUser?.uid,
      isFavorite: selectedTaskToEdit?.isFavorite,
      creationDate: new Date(),
      deadline: new Date(), // Default deadline is today
    },
  });

  async function onSubmit(values: Task) {
    setIsLoadind(true);

    updateTask(values);
    await updateDoc(doc(db, "tasks", `${values.id}`), values);
    toast.success(`${values.id} Has been updated successfully.`);
    setIsLoadind(false);
    isDialogOpen(false);
  }
  return (
    <Form {...EditTaskForm}>
      <form
        onSubmit={EditTaskForm.handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <div className="flex gap-2 items-end">
          <FormField
            name="title"
            control={EditTaskForm.control}
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
          <FormField
            name="isFavorite"
            control={EditTaskForm.control}
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
        <div className="flex gap-2  w-full">
          <FormField
             name="status"
             control={EditTaskForm.control}
             render={({ field }) => (
              <FormItem className="border flex-1 rounded-sm p-2">
                <FormLabel>Status</FormLabel>
                  <Separator />
                    <FormControl>
                       <RadioGroup
                          defaultChecked={true}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          >
                         {statuses.map((status) => (
                               <FormItem
                                 key={status.value}
                                 className="flex items-end space-x-2"
                               >
                                 <RadioGroupItem
                                   value={status.value}
                                   id={status.label}
                                 />
         
                                 <FormLabel
                                   className="hover:cursor-pointer w-full"
                                   htmlFor={status.label}
                                 >
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
          <FormField
            name="priority"
            control={EditTaskForm.control}
            render={({ field }) => (
              <FormItem className="border flex-1 rounded-sm p-2">
                <FormLabel>Priority</FormLabel>
                <Separator />
                <FormControl>
                  <RadioGroup
                    defaultChecked={true}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    {priorities.map((priority) => (
                      <FormItem
                        key={priority.value}
                        className="flex items-end space-x-2"
                      >
                        <RadioGroupItem
                          value={priority.value}
                          id={priority.label}
                        />

                        <FormLabel
                          className="hover:cursor-pointer w-full"
                          htmlFor={priority.label}
                        >
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
        <div>
                  <FormField
                    name="deadline"
                    control={EditTaskForm.control}
                    render={({ field }) => (
                      <FormItem className="border flex-1 rounded-sm p-2">
                        <FormLabel>Deadline</FormLabel>
                        <FormControl>
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date as Date)} 
                            dateFormat="yyyy-MM-dd" // Formatul afisat
                            placeholderText="Select deadline"
                            className="w-full border rounded p-2 text-black" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
        <div className=" flex gap-2 justify-end">
          <Button
            onClick={() => isDialogOpen(false)}
            type="button"
            variant={"secondary"}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} variant={"default"} type="submit">
            {isLoading && <Loader2 className="animate-spin h-3 w-3" />} Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditTaskForm;
