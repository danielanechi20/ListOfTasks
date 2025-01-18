import { useTaskStore } from '../stores/task-store';
import { act } from 'react';

describe("Task Store", () => {
    it("should update a task", async () => {
      // Get the current store state
      const taskStore = useTaskStore.getState();
  
      // Create a new task
      const newTask = { id: 1, title: "Task to update", completed: false };
  
      // Log the tasks in the store before adding the task
      console.log("Tasks before push:", taskStore.tasks);
  
      // Add the task to the store
      taskStore.pushTask(newTask);  
      // Use getState() to get the updated tasks after the push
      const updatedTasks = useTaskStore.getState().tasks; 
  
      // Log the tasks in the store after adding the task
      console.log("Tasks after push:", updatedTasks);
  
      // Ensure the task was added (check after update)
      expect(updatedTasks).toContainEqual(newTask); 
  
      // Now, update the task
      const updatedTask = { ...newTask, title: "Updated Task title", completed: true }; 
      taskStore.updateTask(updatedTask);  

      // Get the final tasks array after the update
      const finalTasks = useTaskStore.getState().tasks;  
      // Log the tasks in the store after updating
      console.log("Tasks after update:", finalTasks);
  
      // Ensure the task was updated
      expect(finalTasks).toContainEqual(updatedTask);  
      expect(finalTasks).not.toContainEqual(newTask);  
    });
  });