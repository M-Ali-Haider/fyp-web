import fs from "fs";
import { configDotenv } from "dotenv";

// Load environment variables from .env
configDotenv();

const {
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID,
} = process.env;

// Create the content for the swEnv.js file, injecting environment variables
const content = `var swEnv = {
  NEXT_PUBLIC_FIREBASE_API_KEY: '${NEXT_PUBLIC_FIREBASE_API_KEY}', 
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: '${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: '${NEXT_PUBLIC_FIREBASE_PROJECT_ID}',
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: '${NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}',
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '${NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}',
  NEXT_PUBLIC_FIREBASE_APP_ID: '${NEXT_PUBLIC_FIREBASE_APP_ID}',
};
`;

// Write the swEnv.js file to the public directory
fs.writeFileSync("./public/swEnv.js", content, "utf8");

console.log("swEnv.js file has been created with environment variables.");
