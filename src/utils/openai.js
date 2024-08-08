import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_SECRET_KEY2,
  dangerouslyAllowBrowser: true,
});

export default openai;
