import React from 'react'

const SimpleHome = () => {
  return (
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
        Welcome to Dashboard!
      </h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>
        Login/Register successful. Resume upload feature ready.
      </p>
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        background: 'rgba(255,255,255,0.1)',
        padding: '2rem',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Next: Upload PDF Resume</h2>
        <p>Backend API live. All original styling reverted.</p>
      </div>
    </div>
  )
}

export default SimpleHome

