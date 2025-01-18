import { useTaskStore } from '../stores/task-store';
import { act } from 'react'; 

describe('Task Store', () => {
  let taskStore;

  beforeEach(() => {
    taskStore = useTaskStore.getState(); 
    taskStore.clear(); 
  });

  it('should create a new task', async () => {
    const newTask = { id: 1, title: 'New Task', completed: false };

    
    await act(async () => {
      taskStore.pushTask(newTask);
    });

  
    taskStore = useTaskStore.getState();

    
    console.log('Tasks after push:', taskStore.tasks);

    
    expect(taskStore.tasks).toContainEqual(newTask);
  });
});
