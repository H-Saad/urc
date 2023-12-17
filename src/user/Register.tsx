import React, {useRef, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Alert} from "@mui/material";
import {CustomError} from "../model/CustomError";
import {registerUser} from "./registerApi";
import Callback from "pusher-js/types/src/core/events/callback";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';


function Register() {

    const [error, setError] = useState({} as CustomError);
    const refPassword = useRef<HTMLInputElement>(null) ;
    const refPasswordConf = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const refFrom = useRef<HTMLFormElement>(null);
    const nav = useNavigate();


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        registerUser({user_id: -1, email : data.get('email') as string, username:  data.get('username') as string, password: data.get('password') as string},
            (result: Callback) => {
                console.log(result);
                nav("/login")
            },
            (loginError: CustomError) => {
                console.error(loginError);
                setError(loginError);
            });
    };

    const handleSubmitError = () => {

        if (refPassword.current?.value !== refPasswordConf.current?.value) {
            setErrorMessage('Les mots de passes ne sont pas les memes!') ;
        } else {
            setErrorMessage('');
            console.log('Password:', refPassword.current?.value);
        }
    };


    return (
        <>
        <Navbar></Navbar>
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Inscription
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}  ref={refFrom}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Nom d'utilisateur"
                        name="username"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        inputRef={refPassword}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmpassword"
                        label="Confirmation de mot de passe"
                        type="password"
                        id="confirmpassword"
                        onInput={handleSubmitError}
                        inputRef={refPasswordConf}
                        />
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2, backgroundColor: '#4CAF50', color: 'white', '&:hover': {
                            backgroundColor: '#45a049'
                        } }}
                    >
                        S inscrire
                    </Button>
                </Box>

            </Box>
            { error.message &&
                <Alert severity="error">{error.message}</Alert>
            }
        </Container>
        </>
    );
}

export default Register;
