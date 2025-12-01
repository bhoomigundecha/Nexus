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
                title: "Introduction to Variables",
                explanation: "Variables in Python are containers for storing data values. Unlike other programming languages, Python has no command for declaring a variable. A variable is created the moment you first assign a value to it. Python is dynamically typed, meaning you don't need to declare the type of variable while declaring it.",
                codeExample:
                  "<precode>x = 5\nname = 'Python'\npi = 3.14\nis_valid = True</precode>",
              },
              {
                title: "Variable Naming Rules",
                explanation: "Python has specific rules for naming variables: 1) Variable names must start with a letter or underscore. 2) Variable names can only contain alphanumeric characters and underscores (A-z, 0-9, and _). 3) Variable names are case-sensitive (age, Age and AGE are three different variables). 4) Reserved keywords cannot be used as variable names.",
                codeExample:
                  "<precode># Valid variable names\nuser_name = 'John'\n_age = 25\nfirstName = 'Alice'\n\n# Invalid variable names\n# 2name = 'Bob'  # Cannot start with number\n# my-var = 10    # Cannot use hyphens\n# class = 'Math' # Cannot use reserved keywords</precode>",
              },
              {
                title: "Integer Data Type",
                explanation: "Integers are whole numbers, positive or negative, without decimals, of unlimited length. Python automatically handles large integers without overflow errors.",
                codeExample:
                  "<precode>age = 25\ntemperature = -10\nlarge_number = 9999999999999999999\nprint(type(age))  # Output: <class 'int'></precode>",
              },
              {
                title: "Float Data Type",
                explanation: "Float represents real numbers with decimal points. Floats can also be scientific numbers with an 'e' to indicate the power of 10.",
                codeExample:
                  "<precode>pi = 3.14159\ntemperature = 98.6\nscientific = 3.5e3  # 3500.0\nprint(type(pi))  # Output: <class 'float'></precode>",
              },
              {
                title: "String Data Type",
                explanation: "Strings are sequences of characters enclosed in single, double, or triple quotes. Strings are immutable in Python, meaning once created, they cannot be changed.",
                codeExample:
                  "<precode>name = 'Alice'\nmessage = \"Hello, World!\"\nmultiline = '''This is a\nmultiline string'''\nprint(type(name))  # Output: <class 'str'></precode>",
              },
              {
                title: "Boolean Data Type",
                explanation: "Booleans represent one of two values: True or False. They are often used in conditional statements and comparisons.",
                codeExample:
                  "<precode>is_active = True\nhas_permission = False\nresult = 5 > 3  # True\nprint(type(is_active))  # Output: <class 'bool'></precode>",
              },
              {
                title: "Type Conversion",
                explanation: "Python allows you to convert between different data types using built-in functions like int(), float(), str(), and bool(). This is useful when you need to perform operations on different types.",
                codeExample:
                  "<precode># String to Integer\nage_str = '25'\nage_int = int(age_str)\n\n# Integer to Float\nnum = 10\nnum_float = float(num)  # 10.0\n\n# Number to String\ncount = 100\ncount_str = str(count)  # '100'</precode>",
              },
              {
                title: "Best Practices",
                explanation: "1) Use descriptive variable names that indicate their purpose. 2) Follow Python naming conventions (snake_case for variables). 3) Avoid using single-character names except for counters. 4) Don't reassign variables to different types unnecessarily. 5) Use constants in UPPERCASE for values that shouldn't change.",
                codeExample:
                  "<precode># Good practices\nuser_age = 25\nMAX_CONNECTIONS = 100\ntotal_price = 99.99\n\n# Avoid\nx = 25  # Not descriptive\nUserAge = 30  # Not snake_case</precode>",
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
  const prompt = `Explain the concept in comprehensive detail on Topic: ${topic}, Chapter: ${chapterName}. 

Generate detailed, educational content similar to GeeksForGeeks tutorials in JSON format with the following structure:
- title: Chapter title
- sections: Array of detailed sections, each with:
  - title: Section heading
  - explanation: Comprehensive explanation (3-5 sentences minimum, covering concepts, use cases, and important details)
  - codeExample: Practical code example in <precode> format (if applicable)

Include 6-10 sections covering:
1. Introduction and overview
2. Core concepts with detailed explanations
3. Multiple code examples (basic to advanced)
4. Best practices and common patterns
5. Common pitfalls or mistakes to avoid
6. Real-world applications or use cases
7. Summary or key takeaways

Make explanations thorough and educational, similar to professional programming tutorials.`;

  try {
    const result = await GenerateChapterContent_AI.sendMessage(prompt);
    const text = result.response.text();

    let jsonOut;

    // Helper function to safely parse JSON with control character handling
    const safeParseJSON = (jsonString) => {
      // First, try direct parsing
      try {
        return JSON.parse(jsonString.trim());
      } catch (e) {
        // If that fails, try extracting from markdown code blocks
        let extracted = jsonString.trim();

        // Remove markdown code blocks
        const codeBlockMatch = extracted.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
        if (codeBlockMatch) {
          extracted = codeBlockMatch[1].trim();
        }

        // Try parsing the extracted content
        try {
          return JSON.parse(extracted);
        } catch (e2) {
          // Fix control characters in JSON string values
          // This function properly escapes control characters within quoted strings
          const fixControlCharacters = (str) => {
            let result = '';
            let inString = false;

            for (let i = 0; i < str.length; i++) {
              const char = str[i];
              const charCode = str.charCodeAt(i);

              // Check if this quote is escaped by counting preceding backslashes
              if (char === '"') {
                let backslashCount = 0;
                let j = i - 1;
                while (j >= 0 && str[j] === '\\') {
                  backslashCount++;
                  j--;
                }
                // Quote is escaped only if preceded by odd number of backslashes
                const isEscaped = backslashCount % 2 === 1;

                if (!isEscaped) {
                  inString = !inString;
                }
                result += char;
                continue;
              }

              // If we're inside a string, escape control characters
              if (inString) {
                // Check for actual control character bytes
                if (charCode === 10) { // \n (newline)
                  result += '\\n';
                } else if (charCode === 13) { // \r (carriage return)
                  result += '\\r';
                } else if (charCode === 9) { // \t (tab)
                  result += '\\t';
                } else if (charCode === 12) { // \f (form feed)
                  result += '\\f';
                } else if (charCode === 8) { // \b (backspace)
                  result += '\\b';
                } else {
                  result += char;
                }
              } else {
                result += char;
              }
            }

            return result;
          };

          let fixed = fixControlCharacters(extracted);

          try {
            return JSON.parse(fixed);
          } catch (e3) {
            // If all else fails, try to extract just the JSON object structure
            const jsonObjectMatch = extracted.match(/\{[\s\S]*\}/);
            if (jsonObjectMatch) {
              const fixedObject = fixControlCharacters(jsonObjectMatch[0]);
              try {
                return JSON.parse(fixedObject);
              } catch (e4) {
                throw new Error(`JSON parse failed: ${e.message}. Attempted fixes also failed.`);
              }
            }
            throw e3;
          }
        }
      }
    };

    try {
      jsonOut = safeParseJSON(text);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError.message);
      console.error("Response text (first 500 chars):", text.substring(0, 500));
      return {
        success: false,
        error: `Failed to parse JSON response: ${parseError.message}`
      };
    }

    return { success: true, data: jsonOut };
  } catch (error) {
    console.error("Error generating chapter content:", error);
    return { success: false, error: error.message };
  }
}