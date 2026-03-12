const { GoogleGenAI } = require('@google/genai')
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

const interviewReportSchema = z.object({

    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candiate's profile matches the job describe"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question asked in interview"),
        intention: z.string().describe("The intention of interviwer behind this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question asked in interview"),
        intention: z.string().describe("The intention of interviwer behind this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candiate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap i.e. how important it is")
    })).describe("Lists of skill gaps in the candiate's profile along with their severity"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in praparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the praparation plan, e.g. data structure, system design, mock interview"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the order of preparation plan, e.g. read a specific book")
    })).describe("A day-wise preparation plan for candiate to follow in order to prepare for the interview effectively"),

    title: z.string().describe("The title of the job for which the interview report is generated")
})

async function generateInterviewReport({resume, selfDescription,jobDescription}){
    
    const prompt = `
You are an AI interview preparation assistant.

IMPORTANT:
Return ONLY a valid JSON object.

Structure must be EXACTLY:

{
 "matchScore": number,
 "technicalQuestions": [
   {
     "question": string,
     "intention": string,
     "answer": string
   }
 ],
 "behavioralQuestions": [
   {
     "question": string,
     "intention": string,
     "answer": string
   }
 ],
 "skillGaps": [
   {
     "skill": string,
     "severity": "low" | "medium" | "high"
   }
 ],
 "preparationPlan": [
   {
     "day": string,
     "focus": string,
     "tasks": string[]
   }
 ]
}

Do NOT return strings.
Do NOT explain anything.
Return only JSON.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    })

    console.log("AI response :", JSON.parse(response.text))
    return JSON.parse(response.text)
} 

module.exports = { generateInterviewReport  }