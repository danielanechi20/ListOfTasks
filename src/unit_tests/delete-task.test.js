import { useTaskStore } from '../stores/task-store';
import { act } from 'react'; 

describe("Task Store", () => {
  it("should delete a task", async () => {
    // Get the current store state
    const taskStore = useTaskStore.getState();

    // Create a new task
    const newTask = { id: 1, title: "Task to delete", completed: false };

   
    console.log("Tasks before push:", taskStore.tasks);
    
    
    taskStore.pushTask(newTask);  

   
    const updatedTasks = useTaskStore.getState().tasks; 

    
    console.log("Tasks after push:", updatedTasks);

    
    expect(updatedTasks).toContainEqual(newTask); 

   
    taskStore.deleteTask(newTask); 

   
    const finalTasks = useTaskStore.getState().tasks;  

   
    console.log("Tasks after delete:", finalTasks);

   
    expect(finalTasks).not.toContainEqual(newTask); 
  });
});