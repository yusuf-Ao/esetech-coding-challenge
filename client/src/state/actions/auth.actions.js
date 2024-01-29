import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../config";



export const authLogin = createAsyncThunk(
    'auth/login',
    async ({ formData, toast, navigate },{rejectWithValue}) => {
       try {
            localStorage.removeItem('esetech-user');
            const { data } = await API.post('/auth/login', formData)

            const profile = await API.get('/auth/user',{ headers: { 'Authorization': `Bearer ${data.data.bearerAccessToken}` } })

            const USER = {
                accessToken: data.data.bearerAccessToken,
                profile: profile.data.data
            }

            await localStorage.setItem('esetech-user', JSON.stringify(USER))
            toast.success('Login successful')
            navigate('/', { replace: true })

            return USER
        } catch (error) {
            console.log(error)
            if (error.response.data.reason !== null) {
                toast.error(error.response.data.reason)
                return rejectWithValue(null)
            }
            toast.error('An error occured during login')
            return rejectWithValue(null)
        }
    }
)

export const authSignup = createAsyncThunk(
    'auth/signup',
    async ({ formData, toast, navigate },{rejectWithValue}) => {
        try {
            const { data } = await API.post('/auth/signup', formData)

            console.log({data})

            toast.success('Account created successfully.')
            navigate('/login', { replace: true })
        } catch (error) {
            if (error.response.data.reason !== null) {
                toast.error(error.response.data.message)
                return rejectWithValue(null)
            }
            toast.error('An error occured during signup')
            return rejectWithValue(null)
        }
    }
)

export const authSignout = createAsyncThunk(
    'auth/signout',
    async ({ toast, navigate },{rejectWithValue}) => {
        try {
            localStorage.removeItem('esetech-user');
            toast.success('Signout success!.')
            navigate('/', { replace: true })
            window.location.href = '/'

        } catch (error) {
            toast.error('An error occured during signout')
            return rejectWithValue(null)
        }
    }
)