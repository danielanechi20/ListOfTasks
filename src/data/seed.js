import { db } from "@/firebase/config";

import tasks from "./tasks.json";

import { doc, setDoc } from "firebase/firestore";

// Function to seed data to Firestore
async function seedDataToFirestore() {
  try {
    // Loop through tasks and add them to Firestore
    for (const task of tasks) {
      // await db.collection("tasks").doc(task.id).set(task);

      // Add a new document in collection "taskss"
      await setDoc(doc(db, "tasks", `${task.id}`), task);
      console.log(`Task ${task.id} seeded successfully.`);
    }
    console.log("All tasks seeded to Firestore successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

// Call the function to seed data to Firestore
export default seedDataToFirestore;
