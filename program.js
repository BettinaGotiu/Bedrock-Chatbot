import OpenAI from "openai";
import { input } from "@inquirer/prompts";
import ora from "ora";

// Initialize the AWS Bedrock client
const client = new OpenAI();

async function startChatUI() {
    console.clear();
    console.log("\x1b[36m%s\x1b[0m", "=================================================");
    console.log("\x1b[36m%s\x1b[0m", "   AWS BEDROCK GENERATIVE AI TERMINAL INTERFACE  ");
    console.log("\x1b[36m%s\x1b[0m", "=================================================");
    console.log("Type 'exit' or press Ctrl+C to close the application.\n");

    while (true) {
        // Render an interactive input prompt box
        const userInput = await input({ 
            message: "Enter your prompt:" 
        });

        // Exit handling
        if (userInput.toLowerCase().trim() === "exit") {
            console.log("\n\x1b[33m%s\x1b[0m", "Exiting session. Goodbye!");
            break;
        }

        if (!userInput.trim()) continue;

        // Fire up a beautiful command-line loading spinner 
        const spinner = ora("Bedrock is thinking...").start();

        try {
            const response = await client.responses.create({ 
                model: "openai.gpt-oss-120b", 
                input: [ 
                    { role: "user", content: userInput } 
                ] 
            });

            // Stop the spinner and display success status
            spinner.succeed("Response received:");
            
            // Format and output the text response
            console.log("\x1b[32m%s\x1b[0m", `\n${response.output_text}\n`);
            console.log("\x1b[90m%s\x1b[0m", "-------------------------------------------------");

        } catch (error) {
            spinner.fail("Error fetching response from Bedrock");
            console.error("\x1b[31m%s\x1b[0m", `Details: ${error.message}\n`);
        }
    }
}

// Start the UI
startChatUI();