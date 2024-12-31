
const apikey = "AIzaSyBUvK_cIfU1GHYX1NW9fQFdG84j5wW3EeU";

// node --version # Should be >= 18
// npm install @google/generative-ai

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = "AIzaSyBUvK_cIfU1GHYX1NW9fQFdG84j5wW3EeU";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    // Start a new chat session with the specified configuration
    const chatSession = model.startChat({
      generationConfig,
      history: [], // Optional, you can add message history if need
    });
  
    try {
      // Send the prompt message to the model and await the response
      const result = await chatSession.sendMessage(prompt);
  
      // Log the result to inspect its structure and check how to access the response
      console.log(result); // Inspect the structure of 'result'
  
      // Now, access the response properly. Assuming 'result' has a 'response' property.
      if (result && result.response) {
        // Assuming 'result.response' holds the text or has a text method
        const responseText = result.response.text ? result.response.text() : result.response; // Correctly access response text
  
        console.log(responseText); // Log the response text
  
        return responseText; // Return the response text to the caller
      } else {
        throw new Error("Response not found in result");
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error generating AI response:", error);
      throw error; // Re-throw error for further handling
    }
  }
  
  
  export default run;