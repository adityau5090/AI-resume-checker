const express = require("express")
const { authUser } = require("../middleware/auth.middleware");
const { generateInterviewReportController } = require("../controller/interview.controller");
const interviewRouter = express.Router();

interviewRouter.post("/",authUser, generateInterviewReportController)

module.exports = { interviewRouter }