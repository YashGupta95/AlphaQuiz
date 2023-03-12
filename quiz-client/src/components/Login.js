import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import useForm from '../hooks/useForm'
import useStateContext from '../hooks/useStateContext'
import Center from './Center'

const getFreshModel = () => ({
    name: '',
    email: ''
})

export default function Login() {

    const {context, setContext, resetContext} = useStateContext();
    const navigate = useNavigate();
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    // need to reset the context if the user navigates back to Login screen
    useEffect(() => {
        resetContext()
    }, [])

    const login = e => {
        e.preventDefault();
        if(validate())
            createAPIEndpoint(ENDPOINTS.participant)
            .post(values)
            .then(res => {
                setContext({ participantId: res.data.participantId })
                navigate('/quiz')
            })
            .catch(err => console.log(err))

    }

    const validate = () => {
        let validationErrors = {}
        validationErrors.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email ID is not valid."
        validationErrors.name = values.name != "" ? "" : "Name field is required."
        setErrors(validationErrors);

        return Object.values(validationErrors).every(err => err == "") //if all the strings in validationError object are empty strings, then return true
    }

    return (
        <Center>
            <Card sx={{ width: 400 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant='h3' sx={{ my: 3 }}>AlphaQuiz</Typography>
                    <Box sx={
                    {
                        '& .MuiTextField-root':{
                            margin: 1,
                            width: '90%'
                        }
                    }
                    }>
                        <form noValidate autoComplete='off' onSubmit = {login}> 
                            <TextField
                            label = 'Email'
                            name = 'email'
                            value = {values.email}
                            onChange = {handleInputChange}
                            variant = 'outlined'
                            { ...(errors.email && {error: true, helperText:errors.email}) } //if errors.email value is not empty, set an error flag to true & assign error message to helperText
                            />
                            <TextField
                            label = 'Name'
                            name = 'name'
                            value = {values.name}
                            onChange = {handleInputChange}
                            variant = 'outlined'
                            { ...(errors.name && {error: true, helperText:errors.name}) }
                            />
                            <Button
                            type = 'submit'
                            variant = 'contained'
                            size = 'large'
                            sx={{ width: '90%' }}>Start</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    )
}
