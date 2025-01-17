import { openDB } from 'idb';

const DB_NAME = 'tasksDB';
const STORE_NAME = 'tasks';

async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

export async function saveTaskToIndexedDB(task) {
  const db = await initDB();
  return db.put(STORE_NAME, task);
}

export async function getAllTasksFromIndexedDB() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function deleteTaskFromIndexedDB(id) {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
}

export async function clearIndexedDB() {
  const db = await initDB();
  return db.clear(STORE_NAME);
}
