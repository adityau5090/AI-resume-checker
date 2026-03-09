const { GoogleGenAI } = require('@google/genai')
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

async function invokeGeminiAI(){
    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:"Hello tell me about Taj Mahal ?"
    })  

    console.log(response.text)
}

const interviewReportSchema = z.object({
    matchScore: z.number().description("A score between 0 and 100 indicating how well the candiate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().description("The technical question asked in interview"),
        intention: z.string().description("The intention of interviwer behind this question"),
        answer: z.string().description("How to answer this question, what points to cover, what approach to take etc.")
    })).description("Technical questions that can be asked in the interview along with their intention"),
    behavioralQuestion: z.array(z.object({
        question: z.string().description("The behavioral question asked in interview"),
        intention: z.string().description("The intention of interviwer behind this question"),
        answer: z.string().description("How to answer this question, what points to cover, what approach to take etc.")
    })).description("Behavioral questions that can be asked in the interview along with their intention"),
    skillgaps: z.array(z.object({
        skill: z.string().description("The skill which the candiate is lacking"),
        severity: z.enum(["low", "medium", "high"]).description("The severity of this skill gap i.e. how important it is")
    })).description("Lists of skill gaps in the candiate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().description("The day number in praparation plan, starting from 1"),
        focus: z.string().description("The main focus of this day in the praparation plan, e.g. data structure, system design, mock interview"),
        tasks: z.string().description("List of tasks to be done on this day to follow the order of preparation plan, e.g. read a specific book")
    })).description("A day-wise preparation plan for candiate to follow in order to prepare for the interview effectively")
})

async function generateInterviewReport({resume, selfDescription,jobDescription}){
    
} 

module.exports = { invokeGeminiAI }