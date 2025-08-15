import { login, register, getUserProfile } from '../services/authService'
import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const navigate = useNavigate()

    // Manejar el LogIn
    const [user, setUser] = useState(null) //datos usuario logueado
    const [logIn, setLogIn] = useState({ email: '', password: '' })

    const handleChangeLogIn = async (e) => {
        setLogIn({ ...logIn, [e.target.name]: e.target.value })
    }

    // Autenticacion de usuario
    const auth = async (email, password) => {
        setLoading(true)
        try {
            const resData = await login({ email, password })
            const { token } = resData

            if (token) {
                localStorage.setItem('token', token) // token en el localStorage
                setToken(token)

                const userRes = await getUserProfile(token) // obtener datos del usuario
                setUser(userRes)
                navigate('/profile')
                console.log("user logueado:", userRes)
                console.log("token guardado:", token)
                return true // autenticación exitosa
            }
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: "Error",
                text: "Credenciales incorrectas, intenta nuevamente",
                icon: "error",
            })
            setLoading(false)
            return false
        } finally {
            setLoading(false)
        }
    }

    // submit login
    const handleSubmitLogIn = async (e) => {
        e.preventDefault()

        const success = await auth(logIn.email, logIn.password)

        if (success) {
            Swal.fire({
                title: "Ingreso exitoso",
                text: "Tu ingreso ha sido exitoso",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            })
            setLogIn({ email: '', password: '' })
            navigate('/profile')
        }
    }

    // perfil de usuario
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
            const fetchUser = async () => {
                try {
                    const resData = await getUserProfile(token)
                    setUser(resData)
                } catch (error) {
                    console.error('Error al obtener usuario:', error)
                    localStorage.removeItem('token')
                    setUser(null)
                }
            };

            fetchUser()
        }
    }, [token])

    // Manjear LogOut
    const handleLogOut = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        navigate('/')
        Swal.fire({
            title: "Sesión cerrada",
            text: "Cerraste sesión exisotamente",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        })
        console.log('Logout exitoso')
    }

    // Manejar el Register
    const [dataRegister, setDataRegister] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const userRegister = async (email, name, password) => {
        try {
            const resData = await register({ email, name, password })
            const { token } = resData
            localStorage.setItem('token', token)
            setToken(token)
            console.log("registrado", resData)
            Swal.fire({
                title: `¡Te has registrado con éxito!`,
                text: "Bienvenid@!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            })
        } catch (error) {
            console.error('Error en el registro:', error)
            setError('Error al registrar el usuario')
        }
    }

    const handleSubmitRegister = async (e) => {
        e.preventDefault()

        if (!dataRegister.email || !dataRegister.password || !dataRegister.name) {
            Swal.fire({
                title: "Oh oh!",
                text: "Debes ingresar tu nombre, email y contraseña, intenta nuevamente!",
                icon: "warning",
            })
            return
        }

        if (dataRegister.password !== dataRegister.confirmPassword) {
            Swal.fire({
                title: "Contraseñas no coinciden",
                text: "La confirmación no coincide con la contraseña.",
                icon: "warning",
            })
            return
        }

        try {
            await userRegister(dataRegister.email, dataRegister.name, dataRegister.password)
            setDataRegister({ name: '', email: '', password: '', confirmPassword: '' })
            navigate('/profile')
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al registrar tu cuenta. Intenta nuevamente.",
                icon: "error",
            })
        }
    }

    const handleChangeRegister = (e) => {
        setDataRegister({ ...dataRegister, [e.target.name]: e.target.value })
    }

    const stateGlobalUser = {
        user,
        logIn,
        error,
        handleChangeLogIn,
        handleSubmitLogIn,
        dataRegister,
        handleChangeRegister,
        handleSubmitRegister,
        handleLogOut,
        token,
        loading
    }

    return (
        <UserContext.Provider value={stateGlobalUser}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider