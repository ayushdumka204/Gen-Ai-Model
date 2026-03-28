const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterViewReportController(req, res) {
    try {
        console.log("BODY:", req.body)       // 🔥 DEBUG
        console.log("FILE:", req.file)       // 🔥 DEBUG

        let { selfDescription, jobDescription } = req.body

        // 🔥 trim safe (important)
        jobDescription = jobDescription?.trim()
        selfDescription = selfDescription?.trim()

        // 🔥 VALIDATION FIX (safe)
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
                const parsed = await pdfParse(req.file.buffer)
                resumeText = parsed.text || ""
            } catch (err) {
                console.error('PDF parse error:', err)
                return res.status(400).json({
                    message: 'Invalid PDF file ❌'
                })
            }
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })

        if (!interViewReportByAi || !interViewReportByAi.matchScore) {
            return res.status(500).json({
                message: 'AI generation failed ❌'
            })
        }

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