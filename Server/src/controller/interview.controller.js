const { interviewReportModel } = require("../models/interviewReport.model")
const pdfParse = require("pdf-parse")
const { generateInterviewReport } = require("../services/ai.service")

const generateInterviewReportController = async (req,res) => {
    const resumeFile =  req.file

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    // console.log("Resume Content : ", resumeContent.text)
    const { selfDescription, jobDescription } = req.body

    const interViewReportByAI = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription 
    })

    console.log("AI report : ",interViewReportByAI);

    const parseArray = (arr) => arr.map(item => {
    if (typeof item === "string") {
        return JSON.parse(item)
    }
    return item
})

interViewReportByAI.technicalQuestions = parseArray(interViewReportByAI.technicalQuestions)
interViewReportByAI.behavioralQuestions = parseArray(interViewReportByAI.behavioralQuestions)
interViewReportByAI.skillGaps = parseArray(interViewReportByAI.skillGaps)
interViewReportByAI.preparationPlan = parseArray(interViewReportByAI.preparationPlan)

    const interviewReport = await interviewReportModel.create({
        user: req.user.userId,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAI
    })

    res.status(201).json({
        message: "Interview report generated successfully",
        data: interviewReport 
    })

} 

module.exports = { generateInterviewReportController }