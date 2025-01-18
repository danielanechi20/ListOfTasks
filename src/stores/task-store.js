import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { setDoc, doc } from "firebase/firestore";
import { saveTaskToIndexedDB } from "../stores/indexedDB";
import { db } from "../firebase/config";

const shouldRepeatTask = (task) => {
  const today = new Date();
  const lastDate = new Date(task.lastExecuted || task.creationDate);

  if (task.recurrence === "daily") {
    return today.toDateString() !== lastDate.toDateString();
  }
  if (task.recurrence === "weekly") {
    const daysPassed = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
    return daysPassed >= 7;
  }
  return false;
};

export const useTaskStore = create((set) => ({
  tasks: [],
  selectedTaskToEdit: null,
  
  clear: () => {
    set(() => ({
      tasks: [],
    }));
  },

  pushTask: (task) => {
    set((state) => {
      if (Array.isArray(task)) {
        return { tasks: task };
      } else {
        const prevTasks = state.tasks;
        const isDuplicate = prevTasks.some((t) => t.id === task.id);
        const newTasks = isDuplicate ? [...prevTasks] : [task, ...prevTasks];
        return { tasks: newTasks };
      }
    });
  },

  setSelectedTaskToEdit: (task) => {
    set((state) => ({
      selectedTaskToEdit: task,
      tasks: state.tasks,
    }));
  },

  deleteTask: (task) => {
    set((state) => {
      const prevTasks = state.tasks.filter((t) => t.id !== task.id);
      return { tasks: prevTasks };
    });
  },

  updateTask: (task) => {
    set((state) => {
      const prevTasks = state.tasks.map((t) => (t.id === task.id ? task : t));
      return { tasks: prevTasks };
    });
  },

  reorderTasks: (reorderedTasks) => {
    set(() => ({
      tasks: reorderedTasks,
    }));
  },

  generateRecurringTasks: async () => {
    console.log("🔄 Running generateRecurringTasks...");
  
    const taskStore = useTaskStore.getState();
    const tasks = taskStore.tasks;
  
    console.log("📌 Current tasks in store:", tasks);
  
    const tasksToAdd = [];
  
    tasks.forEach((task) => {
      console.log(`🔍 Checking task: ${task.title} (Recurrence: ${task.recurrence || "None"})`);
  
      if (task.recurence === "daily" || task.recurence === "weekly") {
        console.log(`✅ Recurring task detected: ${task.title}`);
  
        const newTask = {
          ...task,
          id: `TASK-${uuidv4()}`,
          creationDate: new Date(),
          deadline: new Date(),
        };
  
        tasksToAdd.push(newTask);
      }
    });
  
    console.log("📌 New recurring tasks to add:", tasksToAdd);
  
    if (tasksToAdd.length > 0) {
      console.log("🚀 Adding tasks to Zustand store...");
      useTaskStore.setState((state) => ({
        tasks: [...tasksToAdd, ...state.tasks],
      }));
  
      if (navigator.onLine) {
        console.log("🌐 Online - Saving tasks to Firestore...");
        for (const task of tasksToAdd) {
          await setDoc(doc(db, "tasks", task.id), task);
        }
      } else {
        console.log("📡 Offline - Saving tasks to IndexedDB...");
        for (const task of tasksToAdd) {
          await saveTaskToIndexedDB(task);
        }
      }
  
      console.log("🎉 Recurring tasks successfully added!");
    } else {
      console.log("⚠️ No recurring tasks found.");
    }
  },
  
  
}));
