const express = require("express")
const { authUser } = require("../middleware/auth.middleware");
const { generateInterviewReportController, getReportByIdController, getAllInterviewReportController } = require("../controller/interview.controller");
const { upload } = require("../middleware/file.middleware");
const interviewRouter = express.Router();

interviewRouter.post("/",authUser, upload.single("resume"), generateInterviewReportController)

interviewRouter.get("/report/:interviewId",authUser, getReportByIdController)

interviewRouter.get("/",authUser, getAllInterviewReportController)

module.exports = { interviewRouter }