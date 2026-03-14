// // const { GoogleGenerativeAI } = require('@google/generative-ai')
// const OpenAI = require("openai")
// const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema");

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// })

// const interviewReportSchema = z.object({
//   title: z.string().describe("The title of the job for which the interview report is generated ['Backend Engineer','Web developer','UI/UX Designer']"),
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candiate's profile matches the job describe"),

//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question asked in interview"),
//         intention: z.string().describe("The intention of interviwer behind this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     }).strict()).describe("Technical questions that can be asked in the interview along with their intention"),

//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The behavioral question asked in interview"),
//         intention: z.string().describe("The intention of interviwer behind this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     }).strict()).describe("Behavioral questions that can be asked in the interview along with their intention"),

//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candiate is lacking"),
//         severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap i.e. how important it is")
//     }).strict()).describe("Lists of skill gaps in the candiate's profile along with their severity"),

//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in praparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the praparation plan, e.g. data structure, system design, mock interview"),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the order of preparation plan, e.g. read a specific book")
//     }).strict()).describe("A day-wise preparation plan for candiate to follow in order to prepare for the interview effectively"),
// }).strict()



// async function generateInterviewReport({resume, selfDescription,jobDescription}){
    
//     const prompt = `
// You are an AI interview preparation assistant.

// Return ONLY a valid JSON object.

// STRICT RULES:
// - Follow the schema EXACTLY.

// Example format:

// {
//  "title": "Full Stack Developer",
//  "matchScore": 90,
//  "technicalQuestions": [
//    {
//      "question": "Example question",
//      "intention": "Why interviewer asks it",
//      "answer": "How candidate should answer"
//    }
//  ],
//  "behavioralQuestions": [
//    {
//      "question": "Example behavioral question",
//      "intention": "Why interviewer asks it",
//      "answer": "How candidate should answer"
//    }
//  ],
//  "skillGaps": [
//    {
//      "skill": "Testing",
//      "severity": "medium"
//    }
//  ],
//  "preparationPlan": [
//    {
//      "day": 1,
//      "focus": "React fundamentals",
//      "tasks": ["Review hooks", "Practice components"]
//    }
//  ]
// }

// Resume:
// ${resume}

// Self Description:
// ${selfDescription}

// Job Description:
// ${jobDescription}
// `;

//     const response = await client.responses.parse({
//       model: "gpt-5.2",

//       input: [{ role: "system", content: "You are an AI interview preparation assistant that returns structured JSON only."},
//               { role: "user", content: prompt}
//       ],
//       text: {
//       format: {
//         type: "json_schema",
//         name: "interview_report",
//         schema: zodToJsonSchema(interviewReportSchema, {
//           target: "openai"
//         })
//       }
//     }
//     });
    
//     console.log(response.output_parsed)
// //     if (typeof data.technicalQuestions?.[0] === "string") {
// //   throw new Error("AI returned invalid structure")
// // }
// //     return data
// } 




// module.exports = { generateInterviewReport  }

// // const { GoogleGenerativeAI } = require('@google/generative-ai'); // Correct package
// // const { z } = require("zod");
// // const { zodToJsonSchema } = require("zod-to-json-schema");

// // // Initialize the SDK correctly
// // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// // const interviewReportSchema = z.object({
// //     title: z.string(),
// //     matchScore: z.number(),
// //     technicalQuestions: z.array(z.object({
// //         question: z.string(),
// //         intention: z.string(),
// //         answer: z.string()
// //     })),
// //     behavioralQuestions: z.array(z.object({
// //         question: z.string(),
// //         intention: z.string(),
// //         answer: z.string()
// //     })),
// //     skillGaps: z.array(z.object({
// //         skill: z.string(),
// //         severity: z.enum(["low", "medium", "high"])
// //     })),
// //     preparationPlan: z.array(z.object({
// //         day: z.number(),
// //         focus: z.string(),
// //         tasks: z.array(z.string())
// //     })),
// // });

// // async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
// //     // Correct model name for currently available versions
// //     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// //     // CRITICAL: Clean the Zod schema for Gemini
// //     const jsonSchema = zodToJsonSchema(interviewReportSchema);
// //     delete jsonSchema.$schema;
// //     delete jsonSchema.definitions;

// //     const prompt = `
// //         Analyze the candidate's resume and self-description against the job description.
// //         Resume: ${resume}
// //         Self-Description: ${selfDescription}
// //         Job Description: ${jobDescription}
// //     `;

// //     // Correct API call structure
// //     const result = await model.generateContent({
// //         contents: [{ role: "user", parts: [{ text: prompt }] }],
// //         generationConfig: {
// //             temperature: 0.1,
// //             responseMimeType: "application/json",
// //             responseSchema: jsonSchema, // Gemini uses the cleaned schema here
// //         }
// //     });

// //     const data = JSON.parse(result.response.text());
    
// //     // Safety check
// //     if (data.technicalQuestions && typeof data.technicalQuestions[0] === "string") {
// //         throw new Error("AI returned flat string array instead of objects");
// //     }

// //     return data;
// // }

// // module.exports = { generateInterviewReport };















const OpenAI = require("openai");
const { z } = require("zod");
const { zodTextFormat } = require("openai/helpers/zod");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const interviewReportSchema = z.object({
  title: z.string(),
  matchScore: z.number(),
  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string()
    })
  ),
  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string()
    })
  ),
  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"])
    })
  ),
  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string())
    })
  )
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

  const response = await client.responses.parse({
    model: "gpt-5.2",

    input: [{ role: "system", content: "You are resume analyizer"},
          {role: "user", content: `
Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Generate a structured interview preparation report.`}
    ],

    text: {
      format: zodTextFormat(interviewReportSchema, "interview_report")
    }
  });

  const interview_report = response.output_parsed;
  console.log(interview_report)
  return interview_report
}

module.exports = { generateInterviewReport };