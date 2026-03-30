const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

/**
 * 🔥 CREATE INTERVIEW REPORT
 */
async function generateInterViewReportController(req, res) {
    try {
        console.log("BODY:", req.body)
        console.log("FILE:", req.file)

        let { selfDescription, jobDescription } = req.body

        jobDescription = jobDescription?.trim()
        selfDescription = selfDescription?.trim()

        // ✅ VALIDATION
        if (!jobDescription) {
            return res.status(400).json({
                message: "Job description is required ❗"
            })
        }

        if (!selfDescription && !req.file) {
            return res.status(400).json({
                message: "Provide either resume or self description ❗"
            })
        }

            let resumeText = ""

            if (req.file) {
                try {
                    // ❌ REMOVE pdfParse
                    // const parsed = await pdfParse(req.file.buffer)
                    // resumeText = parsed.text || ""

                    // ✅ TEMP FIX
                    resumeText = "Resume uploaded successfully"

                } catch (err) {
                    console.error('PDF parse error:', err)
                    return res.status(400).json({
                        message: 'Invalid PDF file ❌'
                    })
                }
            }

        // ✅ AI CALL
        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })

        if (!interViewReportByAi || !interViewReportByAi.matchScore) {
            return res.status(500).json({
                message: "AI generation failed ❌"
            })
        }

        // ✅ SAVE DB
        const interviewReport = await interviewReportModel.create({
            user: null,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        return res.status(201).json({
            success: true,
            message: "Interview report generated successfully ✅",
            interviewReport
        })

    } catch (error) {
        console.error("ERROR:", error)
        return res.status(500).json({
            message: error.message || "Internal server error"
        })
    }
}

/**
 * 🔥 GET REPORT BY ID
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params

        const interviewReport = await interviewReportModel.findById(interviewId)

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found"
            })
        }

        return res.status(200).json({
            success: true,
            interviewReport
        })

        } catch (error) {
        console.error("🔥 ERROR FULL:", error)
        console.error("🔥 STACK:", error.stack)

        return res.status(500).json({
            message: error.message || "Internal server error"
        })
    }
}

/**
 * 🔥 GET ALL REPORTS
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find()
            .sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            interviewReports
        })

    } catch (error) {
        console.error("getAllInterviewReportsController error:", error)

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

/**
 * 🔥 GENERATE PDF
 */
async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params

        const interviewReport = await interviewReportModel.findById(interviewReportId)

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found"
            })
        }

        const { resume, jobDescription, selfDescription } = interviewReport

        const pdfBuffer = await generateResumePdf({
            resume,
            jobDescription,
            selfDescription
        })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        })

        res.send(pdfBuffer)

    } catch (error) {
        console.error("generateResumePdfController error:", error)

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

/**
 * 🔥 EXPORT ALL
 */
module.exports = {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
}