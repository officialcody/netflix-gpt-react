import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(
  process.env.REACT_APP_GOOGLE_GEMINI_API_KEY
);

export default genAI;
