const express = require("express")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()

// 🔥 DEBUG (optional)
console.log("Controller:", interviewController.generateInterViewReportController)
console.log("Upload:", upload)

// ROUTES
interviewRouter.post(
  "/",
  upload.single("resume"),
  interviewController.generateInterViewReportController
)

interviewRouter.get(
  "/report/:interviewId",
  interviewController.getInterviewReportByIdController
)

interviewRouter.get(
  "/",
  interviewController.getAllInterviewReportsController
)

interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  interviewController.generateResumePdfController
)

module.exports = interviewRouter