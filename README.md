# AWS Bedrock Chatbot Laboratory Project

A minimal full-stack Node.js laboratory project demonstrating runtime integration with Cloud-Based Generative AI systems via AWS Bedrock using decoupled session profile handling.

---

## 🛠️ Project Scope
* **Context:** Master's Curriculum Laboratory Presentation.
* **Objective:** Build a functional multi-session text inference tool communicating directly with cloud foundation models.
* **Architecture:** Node.js Express Backend & Neo-Brutalist HTML Frontend using the official `openai` SDK mapped to custom AWS Mantle gateway destinations.

---

## 🔑 Quick Start: Credential Generation

Follow these steps to generate your access token directly within the AWS cloud ecosystem without manual IAM configuration:

1. **Sign in** to the AWS Management Console.
2. Navigate to the **Amazon Bedrock Console**.
3. In the left-hand sidebar menu panel, click on **API keys**.
4. Click the **Generate API Key** button.
5. Select your preference (Short-term or Long-term) based on your lab runtime timeframe constraints.
6. Click **Generate** and instantly copy the token string string beginning with `bedrock-api-key-...`.

---

## ⚙️ Setting Up the Config

Paste your generated token directly into the `config.json` file located in the root directory of your project folder. Ensure your base path target aligns precisely with your deployed endpoint:

```json
{
  "activeSession": "default-bedrock",
  "sessions": {
    "default-bedrock": {
      "apiKey": "PASTE_YOUR_COPIED_BEDROCK_API_KEY_HERE",
      "baseURL": "[https://bedrock-mantle.us-east-1.api.aws/v1](https://bedrock-mantle.us-east-1.api.aws/v1)"
    }
  }
}