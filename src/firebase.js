import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { environment } from "./environments/environment"; // <--- Import the config here

// Initialize Firebase using the data from environment.js
const app = initializeApp(environment.firebase);

// Initialize and export the database instance
export const db = getDatabase(app);
