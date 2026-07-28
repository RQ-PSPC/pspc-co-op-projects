import { askAI } from "./AI.js"; // Import the askAI function from AI.js
import { getApiKey } from "./Environment.js"; // Import getApiKey from Environment.js
import express from "express";
import cors from "cors";
import apiRoutes from "./API.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", apiRoutes);


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

async function main() {
    try {
        const answer = await askAI("2 + 3 = 9??"); // Wait for the AI to answer the prompt and store the answer in answer
        console.log(answer); // Print the answer
    } catch (err) {
        console.error(err);
    }
}

//main();
