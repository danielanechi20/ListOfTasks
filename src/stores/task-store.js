import { create } from "zustand";

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
}));
