import axios from "axios" 
const api = axios.create({
  baseURL: "https://gen-ai-model.onrender.com", 
  withCredentials: true
})

/**
 * @description Upload resume only to create interview session
 */
export const uploadResume = async (resumeFile) => {
    const formData = new FormData()
    formData.append("resume", resumeFile)

    try {
        const response = await api.post("/api/interview/resume", formData)
        return response.data
    } catch (err) {
        console.error("UploadResume API error", err)
        const message = err?.response?.data?.message || err?.message || "Failed to upload resume"
        throw new Error(message)
    }
}

/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */
export const getAllInterviewReports = async () => {
  try {
    const response = await api.get('/api/interview')
    return response.data
  } catch (err) {
    console.error("GetReports API error", err)
    throw err
  }
}

export const getInterviewReportById = async (interviewId) => {
  try {
    const response = await api.get(`/api/interview/report/${interviewId}`)
    return response.data
  } catch (err) {
    console.error("GetReportById API error", err)
    throw err
  }
}

export const generateResumePdf = async ({ interviewReportId }) => {
  try {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, {}, {
      responseType: 'arraybuffer'
    })
    return response.data
  } catch (err) {
    console.error("GenerateResumePdf API error", err)
    throw err
  }
}

export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile
}) => {

  const formData = new FormData()

  // 🔥 ensure empty values na jaye
  if (jobDescription) {
    formData.append("jobDescription", jobDescription)
  }

  if (selfDescription) {
    formData.append("selfDescription", selfDescription)
  }

  if (resumeFile) {
    formData.append("resume", resumeFile)
  }

  try {
    const response = await api.post("/api/interview", formData)

    return response.data

  } catch (err) {
    console.error("GenerateReport API error", err)

    throw new Error(
      err?.response?.data?.message || "Failed to generate report"
    )
  }
}
