import { getApiKey } from "./Environment.js"; // Import getApiKey function from Envrionment.js

export async function askAI(prompt) {
    const apiKey = getApiKey(); // Get the API key

    const response = await fetch( // Wait for response with the following seetings
        "https://api.groq.com/openai/v1/chat/completions", // API endpont used to communicate with Groq's AI models
        {
            method: "POST", // POST request because data is being sent to the server
            headers: {
                Authorization: `Bearer ${apiKey}`, // Send the API key for authentication
                "Content-Type": "application/json", // Contains json data
            },
            body: JSON.stringify({ // Converts into a JSON strong
                model: "llama-3.3-70b-versatile", // Specify the AI model
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            }),
        }
    );

    const data = await response.json(); // Wait for the answer then convert the json into a JavaScript object

    return data.choices?.[0]?.message?.content; // Return the "message" part of the json
}