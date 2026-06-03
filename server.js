import express from "express";
import OpenAI from "openai";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Read config.json straight into memory
const configPath = path.join(__dirname, "config.json");
const configFile = JSON.parse(fs.readFileSync(configPath, "utf8"));

// 2. Extract active session configurations dynamically
const activeSessionName = configFile.activeSession;
const sessionCredentials = configFile.sessions[activeSessionName];

// 3. Initialize the client using the clean, direct configuration data
const client = new OpenAI({
    apiKey: sessionCredentials.apiKey,
    baseURL: sessionCredentials.baseURL
});

console.log(`📡 Preconfigured chatbot client running session: "${activeSessionName}"`);
console.log(`🔗 Routed endpoint destination: ${sessionCredentials.baseURL}`);

// Middleware and Static UI serving
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API Chat Endpoint
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message || message.trim() === "") {
        return res.status(400).json({ error: "Message content cannot be empty." });
    }

    try {
        // Send request to AWS Bedrock via the OpenAI client
        const response = await client.responses.create({ 
            model: "openai.gpt-oss-120b", 
            input: [ { role: "user", content: message } ] 
        });

        // Send back the output text response to the HTML frontend
        res.json({ text: response.output_text });
    } catch (error) {
        console.error("AWS Bedrock execution error:", error.message);
        res.status(500).json({ 
            error: "Failed to communicate with AWS Bedrock.", 
            details: error.message 
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`\n=================================================`);
    console.log(`  🚀 Chatbot App Running: http://localhost:${PORT}`);
    console.log(`=================================================\n`);
});