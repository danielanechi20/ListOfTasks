import { Task } from "@/data/schema";
import { create } from "zustand";

type TaskStore = {
  tasks: Task[];
  selectedTaskToEdit: Task | null;
  pushTask: (task: Task) => void;
  setSelectedTaskToEdit: (task: Task) => void;
  deleteTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  clear: () => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  selectedTaskToEdit: null,
  clear: () => {
    set((_) => ({
      tasks: [],
    }));
  },

  pushTask: (task) => {
    set((state) => {
      const prevTasks = state.tasks;
      const isDuplicate = prevTasks.some((t) => t.id === task.id);
      const newTasks = isDuplicate ? [...prevTasks] : [task, ...prevTasks];
      return {
        tasks: newTasks,
      };
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
      const prevTasks = state.tasks;
      function deleteTaskById(id: string): Task[] {
        const index = prevTasks.findIndex((task) => task.id === id);
        if (index !== -1) {
          prevTasks.splice(index, 1);
        }
        return prevTasks;
      }
      const idOfTheTaskToBeDeleted = task.id;
      return {
        tasks: [...deleteTaskById(idOfTheTaskToBeDeleted)],
      };
    });
  },
  updateTask: (task) => {
    set((state) => {
      const prevTasks = state.tasks;
      function replaceTask(task: Task): Task[] {
        const index = prevTasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
          prevTasks[index] = task;
        }
        return prevTasks;
      }
      return {
        tasks: [...replaceTask(task)],
      };
    });
  },
}));
