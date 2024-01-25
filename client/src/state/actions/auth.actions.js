import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
    headers: {

    }
})

export const authLogin = createAsyncThunk(
    'auth/login',
    async ({ formData, toast, navigate },{rejectWithValue}) => {
        try {
            const {data} = await instance.post('/auth/login')
        } catch (error) {
            return rejectWithValue(null);
        }
    }
)

export const authSignup = createAsyncThunk(
    'auth/signup',
    async ({ formData, toast, navigate },{rejectWithValue}) => {
        try {
            const { data } = await instance.post('/auth/signup', formData)

            console.log({data})

            toast.success('Account created successfully.')
            navigate('/', { replace: true })
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