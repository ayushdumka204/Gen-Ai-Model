const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterViewReportController(req, res) {
    try {
        const { selfDescription, jobDescription } = req.body

        if (!jobDescription || (!selfDescription && !req.file)) {
            return res.status(400).json({
                message: "Please provide job description and either a resume or self-description."
            })
        }

        let resumeText = ""

        if (req.file) {
            try {
                const parsed = await pdfParse(req.file.buffer)
                resumeText = parsed.text || ""
            } catch (err) {
                console.error('Error parsing resume:', err)
                return res.status(400).json({ message: 'Invalid PDF file.' })
            }
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })

        if (!interViewReportByAi || !interViewReportByAi.matchScore) {
            return res.status(500).json({ message: 'AI report generation failed.' })
        }

        const interviewReport = await interviewReportModel.create({
            user: null, // 🔥 FIX (no auth)
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        return res.status(201).json({
            success: true,
            message: "Interview report generated successfully.",
            interviewReport
        })

    } catch (error) {
        console.error('generateInterViewReportController error', error)
        return res.status(500).json({
            message: error.message || 'Internal server error'
        })
    }
}

/**
 * GET BY ID (no auth)
 */
async function getInterviewReportByIdController(req, res) {
    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewId)

    if (!interviewReport) {
        return res.status(404).json({ message: "Not found" })
    }

    res.json({ interviewReport })
}

/**
 * GET ALL (no auth)
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find().sort({ createdAt: -1 })

    res.json({ interviewReports })
}

/**
 * PDF
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({ message: "Not found" })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}

module.exports = {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
}