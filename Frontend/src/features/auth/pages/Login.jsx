import {useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await handleLogin({ email, password })
        if (result?.success) {
            navigate('/')
        } else {
            setError(result?.message || "Invalid email/password or network error")
        }
    }

    if (loading) {
        return (
            <div className="auth-wrapper">
                <div className="credentials-panel">
                    <h2 className="slide-element">Loading...</h2>
                    <div className="field-wrapper slide-element">
                        <div className="loading-spinner"></div>
                    </div>
                </div>
                <div className="welcome-section">
                    <h2 className="slide-element">PLEASE WAIT</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="auth-wrapper">

            <div className="background-shape"></div>
            <div className="secondary-shape"></div>
            
            <div className="credentials-panel">
                <h2 className="slide-element">Login</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message slide-element">{error}</p>}
                    <div className="field-wrapper slide-element">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required 
                            autoComplete="off" />
                        <label>Email</label>
                        <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="field-wrapper slide-element">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required 
                            autoComplete="off" />
                        <label>Password</label>
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <div className="field-wrapper slide-element">
                        <button className="submit-button" type="submit">
                            Login
                        </button>
                    </div>
                    <div className="switch-link slide-element">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>

            <div className="welcome-section">
                <h2 className="slide-element">WELCOME BACK!</h2>
            </div>
        </div>
    )
}

export default Login
