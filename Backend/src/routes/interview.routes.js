const express = require("express")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 */
interviewRouter.post("/", upload.single("resume"), interviewController.generateInterViewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 */
interviewRouter.get("/report/:interviewId", interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview/
 */
interviewRouter.get("/", interviewController.getAllInterviewReportsController)

/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 */
interviewRouter.post("/resume/pdf/:interviewReportId", interviewController.generateResumePdfController)

module.exports = interviewRouter