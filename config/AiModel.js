// --------------------------------------------
// GROQ VERSION — fixed role mapping
// --------------------------------------------

import Groq from "groq-sdk";

// Initialize Groq Client
import { groqClient } from "@/lib/groq";

const genAI = groqClient;

// Generation configuration
const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  maxOutputTokens: 8192,
};

// --------------------------------------------
// Wrapper to mimic gemini.startChat()
// --------------------------------------------
function createGroqChatModel(modelName, history) {
  return {
    async sendMessage(prompt) {
      const groqMessages = [];

      // convert gemini-style history → groq format
      // KEY FIX: Convert "model" role to "assistant"
      history.forEach((h) => {
        if (!h.parts || !h.parts[0]) return;
        groqMessages.push({
          role: h.role === "model" ? "assistant" : h.role,
          content: h.parts[0].text,
        });
      });

      // append new user prompt
      groqMessages.push({
        role: "user",
        content: prompt,
      });

      // call Groq
      const response = await genAI.chat.completions.create({
        model: modelName,
        messages: groqMessages,
        temperature: generationConfig.temperature,
        top_p: generationConfig.topP,
        max_tokens: generationConfig.maxOutputTokens,
      });

      const text = response.choices[0].message.content;

      // return in gemini-like structure
      return {
        response: {
          text: () => text,
        },
      };
    },
  };
}

// --------------------------------------------
// Course Layout Model
// --------------------------------------------
export const GenerateCourseLayout_AI = createGroqChatModel(
  "llama-3.1-8b-instant",
  [
    {
      role: "user",
      parts: [
        {
          text:
            "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level:Basic, Duration: 1 hours, NoOf Chapters:5, in JSON format",
        },
      ],
    },
    {
      role: "model", // This will be converted to "assistant"
      parts: [
        {
          text: JSON.stringify({
            course: {
              name: "Python Programming for Beginners",
              description:
                "Learn the fundamentals of Python programming, from basic syntax to core concepts like variables, data types, loops, and functions.",
              chapters: [
                {
                  name: "Introduction to Python",
                  about:
                    "History, features, installing Python, first program.",
                  duration: "15 minutes",
                },
                {
                  name: "Variables and Data Types",
                  about:
                    "Learn about integers, floats, strings, booleans, and operations.",
                  duration: "20 minutes",
                },
                {
                  name: "Control Flow and Loops",
                  about:
                    "if/else, for loops, while loops, iteration patterns.",
                  duration: "25 minutes",
                },
                {
                  name: "Functions and Modules",
                  about:
                    "Creating functions, return values, using modules.",
                  duration: "20 minutes",
                },
                {
                  name: "Lists, Tuples, and Dictionaries",
                  about:
                    "Python collections and operations.",
                  duration: "20 minutes",
                },
              ],
              duration: "1 hour",
              category: "Programming",
              topic: "Python",
              level: "Basic",
              noOfChapters: 5,
            },
          }),
        },
      ],
    },
  ]
);

// --------------------------------------------
// Chapter Content Model
// --------------------------------------------
export const GenerateChapterContent_AI = createGroqChatModel(
  "llama-3.1-8b-instant",
  [
    {
      role: "user",
      parts: [
        {
          text:
            "Explain the concept in Detail on Topic: Python Basic Chapter: variables and Data types in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example (Code field in <precode> format) if applicable",
        },
      ],
    },
    {
      role: "model", // This will be converted to "assistant"
      parts: [
        {
          text: JSON.stringify({
            title: "Variables and Data Types in Python",
            sections: [
              {
                title: "What are Variables?",
                explanation: "Variables store values in memory.",
                codeExample:
                  "<precode>age = 25\nname = 'Alice'</precode>",
              },
              {
                title: "Naming Rules",
                explanation: "start with letter/underscore; case sensitive.",
                codeExample:
                  "<precode>user_name = 'John'</precode>",
              },
              {
                title: "Integers",
                explanation: "Whole numbers.",
                codeExample:
                  "<precode>value = 42</precode>",
              },
            ],
          }),
        },
      ],
    },
  ]
);

// --------------------------------------------
// Helper: generate course layout
// --------------------------------------------
export async function generateCourseLayout(userInput) {
  const prompt = `Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: '${userInput.category}', Topic: ${userInput.topic}, Level: ${userInput.level}, Duration: ${userInput.duration}, NoOf Chapters: ${userInput.noOfChapters}, in JSON format`;

  try {
    const result = await GenerateCourseLayout_AI.sendMessage(prompt);
    const text = result.response.text();

    let jsonOut;

    try {
      jsonOut = JSON.parse(text);
    } catch {
      const match = text.match(/```json\n?([\s\S]*?)\n?```/);
      if (!match) throw new Error("Failed to parse JSON response");
      jsonOut = JSON.parse(match[1]);
    }

    return { success: true, data: jsonOut };
  } catch (error) {
    console.error("Error generating course layout:", error);
    return { success: false, error: error.message };
  }
}

// --------------------------------------------
// Helper: generate chapter content
// --------------------------------------------
export async function generateChapterContent(topic, chapterName) {
  const prompt = `Explain the concept in Detail on Topic: ${topic} Chapter: ${chapterName} in JSON Format with list of array with field as title, explanation in detail, Code Example in <precode>`;

  try {
    const result = await GenerateChapterContent_AI.sendMessage(prompt);
    const text = result.response.text();

    let jsonOut;

    try {
      jsonOut = JSON.parse(text);
    } catch {
      const match = text.match(/```json\n?([\s\S]*?)\n?```/);
      if (!match) throw new Error("Failed to parse JSON response");
      jsonOut = JSON.parse(match[1]);
    }

    return { success: true, data: jsonOut };
  } catch (error) {
    console.error("Error generating chapter content:", error);
    return { success: false, error: error.message };
  }
}