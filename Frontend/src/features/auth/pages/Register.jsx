import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const [error, setError] = React.useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await handleRegister({ username, email, password })
        if (result?.success) {
            navigate("/")
        } else {
            setError(result?.message || "Unable to register. Please check input and try again.")
        }
    }

    if (loading) {
        return (
            <div className="auth-wrapper">
                <div className="credentials-panel signup">
                    <h2 className="slide-element">Loading...</h2>
                    <div className="field-wrapper slide-element">
                        <div className="loading-spinner"></div>
                    </div>
                </div>
                <div className="welcome-section signup">
                    <h2 className="slide-element">REGISTERING</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="auth-wrapper">
            <div className="background-shape"></div>
            <div className="secondary-shape"></div>
            
            <div className="credentials-panel signup">
                <h2 className="slide-element">Register</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message slide-element">{error}</p>}
                    <div className="field-wrapper slide-element">
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            required 
                            autoComplete="off" />
                        <label>Username</label>
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="field-wrapper slide-element">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required 
                            autoComplete="chrome-off"
                            spellCheck="false" />
                        <label>Email</label>
                        <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="field-wrapper slide-element">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required 
                            autoComplete="new-password" />
                        <label>Password</label>
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <div className="field-wrapper slide-element">
                        <button className="submit-button" type="submit">Register</button>
                    </div>
                    <div className="switch-link slide-element">
                        <p>Already have an account? <br/> <Link to="/login" className="login-trigger">Login</Link></p>
                    </div>
                </form>
            </div>

            <div className="welcome-section signup">
                <h2 className="slide-element">WELCOME!</h2>
            </div>
        </div>
    )
}

export default Register
