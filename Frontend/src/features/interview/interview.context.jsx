/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const InterviewContext = createContext()

export const InterviewProvider = ({ children }) => {
    const [loadingState, setLoadingState] = useState({ isLoading: false, message: '' })
    const [report, setReport] = useState(null)
    const [reports, setReports] = useState([])

    return (
        <InterviewContext.Provider value={{ loadingState, setLoadingState, report, setReport, reports, setReports }}>
            {children}
        </InterviewContext.Provider>
    )
}