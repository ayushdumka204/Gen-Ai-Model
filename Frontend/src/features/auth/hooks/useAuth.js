import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    // 🔥 LOGIN (direct working)
    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true)

            const res = await login({ email, password })

            // 🔥 directly set user (no checks)
            setUser(res.user)

            return { success: true }

        } catch (err) {
            console.log("Login error:", err)

            return { success: false }
        } finally {
            setLoading(false)
        }
    }

    // 🔥 REGISTER (direct working)
    const handleRegister = async ({ username, email, password }) => {
        try {
            setLoading(true)

            const res = await register({ username, email, password })

            setUser(res.user)

            return { success: true }

        } catch (err) {
            console.log("Register error:", err)

            return { success: false }
        } finally {
            setLoading(false)
        }
    }

    // 🔥 LOGOUT
    const handleLogout = async () => {
        try {
            setLoading(true)

            await logout()

            setUser(null)

        } catch (err) {
            console.log("Logout error:", err)
        } finally {
            setLoading(false)
        }
    }

    // ❌ NO getMe
    // ❌ NO useEffect
    // ❌ NO AUTO CALL

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    }
}