import React, { useState, useCallback } from 'react'
import { useInterview } from '../hooks/useInterview'
import { generateInterviewReport } from '../services/interview.api'
import '../style/home.scss'
import './Interview'

const Home = () => {
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
const [error, setError] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const { reports: interviews = [], getReports: refetch } = useInterview()

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile)
    }
  }, [])

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const onDragLeave = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
  }, [])

const handleGenerate = async () => {
    if (!file || !jobDescription) {
      setError('Please fill job description and select resume.')
      return
    }
    setUploading(true)
    setError(null)
    try {
    await generateInterviewReport({ 
      jobDescription: jobDescription.trim(),
      selfDescription: jobDescription.trim(),
      resumeFile: file 
    })
      refetch()
      setFile(null)
      setJobDescription('')
      alert('Interview report generated! Check reports.')
    } catch (err) {
      setError(err.message)
    }
    setUploading(false)
  }

  return (
    <div className="container">
      <h1 className="page-title">Geni AI Dashboard</h1>
      
      {error && <div className="error-message">{error}</div>}

      <div className="grid">
        <div className="card">
          <h2>Generate Interview Report</h2>
            <div className="form-group">
              <textarea 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
                rows="3"
                className="form-control"
              />
            </div>

          <div 
            className={`dropzone ${dragging ? 'drag-over' : ''}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <i className="icon fa-solid fa-cloud-arrow-up"></i>
            <div className="drop-text">
              {file ? file.name : 'Drop PDF resume here'}
            </div>
            <div className="drop-subtext">
              or click to browse
            </div>
            <input 
              type="file" 
              accept=".pdf" 
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
            <button 
            className="btn primary w-full" 
            onClick={handleGenerate}
            disabled={!file || !jobDescription || uploading}
          >
            {uploading ? <div className="loading"></div> : <i className="fa-solid fa-magic"></i>}
            {uploading ? 'Generating...' : 'Generate Interview Plan'}
          </button>
        </div>

        {interviews.length === 0 ? (
          <div className="panel">
            <i className="fa-solid fa-file-circle-check" style={{fontSize: '4rem', color: '#8b949e', marginBottom: '1rem'}}></i>
            <h3>No Reports Yet</h3>
            <p>Upload your resume to generate personalized interview reports.</p>
          </div>
        ) : (
          <div className="card">
            <h3>Recent Reports</h3>
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {interviews.slice(0, 5).map((interview) => (
                  <tr key={interview._id}>
                    <td>{new Date(interview.createdAt).toLocaleDateString()}</td>
                    <td><span className={`status ${interview.status}`}>{interview.status}</span></td>
                    <td>
                      <a href={`/interview/${interview._id}`} className="btn secondary">
                        <i className="fa-solid fa-eye"></i> View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{interviews.length}</span>
          <span className="stat-label">Reports</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">0</span>
          <span className="stat-label">Active</span>
        </div>
      </div>
    </div>
  )
}

export default Home

