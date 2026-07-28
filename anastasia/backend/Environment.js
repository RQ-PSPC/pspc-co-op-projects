// EnvLoader.js

import dotenv from "dotenv"; // Imports the dotenv library which gets the environment variables from the .env file

dotenv.config(); // Reads the .env file, stores the variables in process.env

export function getEnvValue(key) {
    return process.env[key] || null; // Returns the value of the environment variable if it exists, otherwise null
}

export function getApiKey() {
    return getEnvValue("AI_API_KEY"); // Calls getEnvValue() to get the value associated with AI_API_KEY in the /env file
}