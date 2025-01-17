import { db } from '@/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export async function addTaskToFirestore(task) {
  await addDoc(collection(db, 'tasks'), task);
}
