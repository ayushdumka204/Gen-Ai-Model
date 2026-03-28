import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            if (!data || !data.user) {
                throw new Error("Login failed: no user returned")
            }
            setUser(data.user)
            return { success: true }
        } catch (err) {
            console.error("handleLogin failed", err)
            return { success: false, message: err?.message || "Unable to login." }
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            if (!data || !data.user) {
                throw new Error("Register failed: no user returned")
            }
            setUser(data.user)
            return { success: true }
        } catch (err) {
            console.error("handleRegister failed", err)
            return { success: false, message: err?.message || "Unable to register." }
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } catch (err) {
            console.error("handleLogout failed", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                if (data?.user) {
                    setUser(data.user)
                }
            } catch (err) {
                console.error("getMe failed", err)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}