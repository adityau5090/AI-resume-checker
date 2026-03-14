const { interviewReportModel } = require("../models/interviewReport.model")
const pdfParse = require("pdf-parse")
const { generateInterviewReport } = require("../services/ai.service")

const generateInterviewReportController = async (req,res) => {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    // console.log("Resume Content : ", resumeContent.text)
    const { selfDescription, jobDescription } = req.body

    const interViewReportByAI = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription 
    })

    console.log("AI report : ",interViewReportByAI);

//     const parseArray = (arr) =>
//   arr.map((item) => {
//     if (typeof item === "string") {
//       try {
//         return JSON.parse(`{${item}}`)
//       } catch (err) {
//         console.log("Parse failed:", item)
//         return null
//       }
//     }
//     return item
//   })

// interViewReportByAI.technicalQuestions = parseArray(interViewReportByAI.technicalQuestions)
// interViewReportByAI.behavioralQuestions = parseArray(interViewReportByAI.behavioralQuestions)
// interViewReportByAI.skillGaps = parseArray(interViewReportByAI.skillGaps)
// interViewReportByAI.preparationPlan = parseArray(interViewReportByAI.preparationPlan)

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



const getReportByIdController = async (req,res) => {
    try {
        const { interviewId } = req.params
    console.log("Interview Id: ",interviewId)

    const interviewReport = await interviewReportModel.findById(interviewId)

    if(!interviewReport){
        console.error("Interview report not found")
        return res.status(401).json({
            message: "Report not found"
        })
    }

    res.status(201).json({
        message: "Interview report fetched successfully",
        data: interviewReport
    })
    } catch (error) {
        console.error("Error in finding report : ",error)
        return res.status(401).json({
            message: "Interview report finding problem",
            error: error
        })
    }
}

const getAllInterviewReportController = async (req,res) => {
    try {
        const user = req.user.userId

        const interviewReports = await interviewReportModel.find({ user }).sort({ createdAt: -1}).select("-resume -selfDescription -jobDescription -_v -updatedAt -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan") 

        if(!interviewReports){
        console.error("Interview reports not found")
        return res.status(401).json({
            message: "Reports not found"
        })
    }

    res.status(201).json({
        message: "Interview reports fetched successfully",
        data: interviewReports
    })

    } catch (error) {
        console.error("Error in finding interview report")
        return res.status(401).json({
            message: "Can't find all interview report"
        })
    }
}

module.exports = { 
    generateInterviewReportController,
    getReportByIdController,
    getAllInterviewReportController
}