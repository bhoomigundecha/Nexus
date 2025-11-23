import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function run() {
  const chat = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: "Generate a JSON course layout for React.js"
      }
    ]
  });


  console.log(chat.choices[0].message.content);
}

run();
