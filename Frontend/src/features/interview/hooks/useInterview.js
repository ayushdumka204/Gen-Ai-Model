import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { useParams } from "react-router"
import { InterviewContext } from "../interview.context"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loadingState, setLoadingState, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoadingState({ isLoading: true, message: "Generating your interview strategy..." })
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            if (!response || !response.interviewReport) {
                throw new Error("No interview report returned from server")
            }
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoadingState({ isLoading: false, message: '' })
        }
    }

    const getReportById = async (interviewId) => {
        setLoadingState({ isLoading: true, message: "Loading your interview report..." })
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            if (!response || !response.interviewReport) {
                throw new Error("Interview report not found")
            }
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.log(error)
            setReport(null)
            return null
        } finally {
            setLoadingState({ isLoading: false, message: '' })
        }
    }

    const getReports = async () => {
        setLoadingState({ isLoading: true, message: "Loading your interview plans..." })
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response?.interviewReports || [])
            return response?.interviewReports || []
        } catch (error) {
            console.log(error)
            setReports([])
            return []
        } finally {
            setLoadingState({ isLoading: false, message: '' })
        }
    }

    const getResumePdf = async (interviewReportId) => {
        setLoadingState({ isLoading: true, message: "Downloading your AI generated resume..." })
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            // Clean up: remove the link and revoke the object URL to prevent memory leaks
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoadingState({ isLoading: false, message: '' })
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ interviewId ])

    return { loadingState, report, reports, generateReport, getReportById, getReports, getResumePdf }

}
