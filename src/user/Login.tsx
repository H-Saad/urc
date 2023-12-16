import React, {useState} from "react";
import {loginUser} from "./loginApi";
import {Session} from "../model/common";
import {CustomError} from "../model/CustomError";
import {Alert, Box, Button, Container, TextField, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';

export function Login() {

    const nav = useNavigate();
    const [error, setError] = useState({} as CustomError);
    const [session, setSession] = useState({} as Session);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        loginUser({user_id: -1, username:  data.get('login') as string, password: data.get('password') as string},
            (result: Session) => {
                setSession(result);
                form.reset();
                setError(new CustomError(""));
                nav("/room");
            }, (loginError: CustomError) => {
                setError(loginError);
                setSession({} as Session);
            });
    };

    const handleRegister = () =>{
        nav("/register");
    }

    return (
        <>
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
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Login"
                            name="login"
                            autoComplete="login"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2, backgroundColor: '#4CAF50', color: 'white', '&:hover': {
                                backgroundColor: '#45a049'
                            } }}
                        >
                            Sign In
                        </Button>
                        <Button
                            fullWidth
                            sx={{ mt: 1, mb: 2, backgroundColor: '#4CAF50', color: 'white', '&:hover': {
                                backgroundColor: '#45a049'
                            } }}
                            onClick={handleRegister}
                        >
                            Create Account
                        </Button>
                    </Box>
                </Box>
                {session.token && (
                    <Alert severity="success">Username : {session.username} , Token : {session.token}</Alert>
                )}
                {error.message && <Alert severity="error">{error.message}</Alert>}
            </Container>
        </>
    );
}




